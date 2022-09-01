/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

import bcrypt from "bcrypt";

async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("admins");

  fastify.get(
    "/admin",
    {
      onRequest: [fastify.adminAuthenticate],
    },
    async (req, res) => {
      try {
        const admins = await collection
          .find(
            {},
            {
              projection: { password: 0 },
            }
          )
          .toArray();
        res.status(200).send({
          data: admins,
        });
      } catch (error) {
        res.status(500).send({ status: 500, message: error });
      }
    }
  );

  fastify.post("/admin/register", async (request, reply) => {
    try {
      const { name, phone, password } = request.body;

      const admin = await collection.findOne({ phone });
      if (admin)
        reply
          .status(400)
          .send({ status: 400, message: "You already registered." });

      if (name && phone && password) {
        const salt = await bcrypt.genSalt(10);
        const saltPassword = await bcrypt.hash(password, salt);

        let admin = await collection.insertOne({
          ...request.body,
          password: saltPassword,
          role: 1,
          is_approved: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        return { name: admin.name, phone: admin.phone };
      } else {
        reply
          .status(400)
          .send({ status: 400, message: "Not Valid Information" });
      }
    } catch (err) {
      reply.status(400).send({ status: 400, message: err?.message });
    }
  });

  fastify.post("/admin/login", async (req, res) => {
    try {
      const { phone, password } = req.body;

      const admin = await collection.findOne({ phone });
      if (admin && !admin.is_approved) {
        return res
          .status(400)
          .send({ status: 400, message: "Please contact with admin to login" });
      }
      if (!admin)
        return res
          .status(400)
          .send({ status: 400, message: "Invalid phone or password." });

      const validPassword = await bcrypt.compare(password, admin.password);

      if (!validPassword)
        return res
          .status(400)
          .send({ status: 400, message: "Invalid phone or password." });

      const token = fastify.jwt.sign({
        _id: admin._id,
        phone: admin.phone,
        role: admin.role,
        name: admin.name,
      });

      res
        .header("x-auth-token", token)
        .status(200)
        .send({
          data: {
            _id: admin._id,
            phone: admin.phone,
            role: admin.role,
            name: admin.name,
            is_approved: admin.is_approved,
          },
          token,
        });
    } catch (err) {
      reply.send({ message: err?.message });
    }
  });

  fastify.post("/admin/recover/password", async (req, res) => {
    try {
      const { phone, password } = req.body;
      const admin = await collection.findOne({ phone });
      if (!admin)
        return res.status(400).send({ message: "Phone Number not found" });

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      await collection.findOneAndUpdate(
        { _id: admin._id },
        { $set: { password: newPassword, updatedAt: new Date().toISOString() } }
      );
      res.status(200).send({ status: 200, phone });
    } catch (err) {
      res.status(400).send({ status: 400, message: err?.message });
    }
  });

  fastify.patch(
    "/admin/password/change",
    {
      onRequest: [fastify.adminAuthenticate],
    },
    async (req, res) => {
      try {
        const phone = req.user.phone;
        const { password, confirm, current } = req.body;

        if (password !== confirm) {
          res.status(400).send({
            status: 400,
            message: "New password and confirm password are not same",
          });
        }

        let admin = await collection.findOne({ phone });
        if (!admin)
          return res
            .status(404)
            .send({ status: 404, message: "admin not found" });

        const isCurrent = await bcrypt.compare(current, admin.password);

        if (!isCurrent) {
          res
            .status(400)
            .send({
              status: 400,
              message: "Providing Current password is wrong",
            });
        }

        const isSame = await bcrypt.compare(password, admin.password);

        if (isSame) {
          res
            .status(400)
            .send({
              status: 400,
              message: "Old password and new password same",
            });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(password, salt);

          await collection.findOneAndUpdate(
            { _id: admin._id },
            { $set: { password: newPassword, updatedAt: new Date().toISOString() } }
          );
          res.status(200).send({ message: "Password Successfully Changed" });
        }
      } catch (err) {
        res.status(400).send({ status: 400, message: err?.message });
      }
    }
  );
}

export default routes;
