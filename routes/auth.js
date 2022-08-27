/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

import nodemailer from "nodemailer";

async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("candidates");

  fastify.post("/signup", async (request, reply) => {
    const { name, email, googleId } = request.body;
    if (!email) {
      reply.send("Invalid email");
    }

    const result = await collection.findOne({ email });
    if (!result) {
      const count = await collection.count();
      await collection.insertOne({
        socialName: name || null,
        email: email,
        id: count + 1,
        generalInfo: null,
        address: null,
        education: null,
        family: null,
        personal: null,
        marriage: null,
        other: null,
        lifePartner: null,
        authority: null,
        contact: null,
        isVerify: googleId ? true : false,
        isDelete: false,
        isDisable: false,
        isPublish: false,
        isMarried: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const candidate = await collection.findOne({ email });
      const token = fastify.jwt.sign({
        email: candidate.email,
        id: candidate.id,
      });
      reply.send({
        token: token,
        email: candidate.email,
        id: candidate.id,
        data: null,
      });
    }
    const token = fastify.jwt.sign({
      email: result.email,
      id: result.id,
    });
    reply.send({
      token: token,
      email: result.email,
      id: result.id,
      data: result,
    });
  });

  fastify.post("/login", async (request, reply) => {
    const { email } = request.body;
    if (!email) {
      reply.send("Please give email");
    }

    const result = await collection.findOne({ email });
    if (!result) {
      reply.status(400).send({statusCode: 400});
    }
    const token = fastify.jwt.sign({
      email: result.email,
      id: result.id,
    });
    reply.send({
      token: token,
      email: result.email,
      id: result.id,
      data: result,
    });
  });

  fastify.post("/signup/mail", async (request, reply) => {
    const { email } = request.body;
    if (!email) {
      reply.send("Please give email");
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SIGN_UP_AUTH_USER, // generated ethereal user
        pass: process.env.SIGN_UP_AUTH_PASSWORD, // generated ethereal password
      },
    });

    const count = await collection.count();
    await collection.insertOne({
      socialName: null,
      email: email,
      id: count + 1,
      generalInfo: null,
      address: null,
      education: null,
      family: null,
      personal: null,
      marriage: null,
      other: null,
      lifePartner: null,
      authority: null,
      contact: null,
      isVerify: false,
      isDelete: false,
      isDisable: false,
      isPublish: false,
      isMarried: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "kureghorbdteam@gmail.com", // sender address
      to: email, // list of receivers
      subject: "SignUp", // Subject line
      text: "SignUp Process", // plain text body
      html: `<b><a href="${process.env.BE_URL}/user/verify?active_id=${
        count + 1
      }">আপনার একাউন্ট একটিভ করতে এখানে ক্লিক করুন.</a></b>`, // html body
    });

    reply.send({
      messageId: info.messageId,
      from: "kureghorbdteam@gmail.com", // sender address
      to: email,
    });
  });

  fastify.get("/user/verify", async (request, reply) => {
    const { active_id } = request.query;
    if (active_id) {
      await collection.findOneAndUpdate(
        { id: Number(active_id) },
        {
          $set: { isVerify: true, updatedAt: new Date().toISOString() },
        }
      );
    }
    reply.redirect(`${process.env.FE_URL}/login/`);
  });

  fastify.get(
    "/protected",
    {
      onRequest: [fastify.authenticate],
    },
    async function (request, reply) {
      return request.user;
    }
  );
}

export default routes;
