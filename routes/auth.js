/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { loginSchema } from "../schema/auth.js";

async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("candidates");

  fastify.post("/signup", async (request, reply) => {
    try {
      const { email, googleId } = request.body;
      if (!email) {
        reply.send("Invalid email");
      }

      const result = await collection.findOne({ email });
      if (!result) {
        const count = await collection.count();
        await collection.insertOne({
          social: true,
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
          isApproved: false,
          comment: null,
          password: null,
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
    } catch (err) {
      reply(err.message);
    }
  });

  fastify.post(
    "/login",
    {
      schema: loginSchema,
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;
        if (!email && !password) {
          reply
            .status(400)
            .send({
              statusCode: 400,
              message: "ইউসার ইমেইল অথবা পাসওয়ার্ড সঠিক না!",
            });
        }

        const result = await collection.findOne({ email });
        if (!result) {
          reply
            .status(400)
            .send({ statusCode: 400, message: "User Not Found" });
        }
        const validPassword = await bcrypt.compare(password, result.password);

        if (!validPassword)
          return reply
            .status(400)
            .send({
              statusCode: 400,
              message: "ইউসার ইমেইল অথবা পাসওয়ার্ড সঠিক না!",
            });

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
      } catch (err) {
        reply.send(err.message);
      }
    }
  );

  fastify.post(
    "/signup/mail",
    {
      schema: loginSchema,
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;
        if (!email && !password) {
          reply.send("Please give email and password");
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

        const salt = await bcrypt.genSalt(10);
        const saltPassword = await bcrypt.hash(password, salt);

        const count = await collection.count();
        await collection.insertOne({
          social: false,
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
          isApproved: false,
          comment: null,
          password: saltPassword,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: "sunnahkobul@gmail.com", // sender address
          to: email, // list of receivers
          subject: "SignUp", // Subject line
          text: "SignUp Process", // plain text body
          html: `<b><a href="${process.env.BE_URL}/user/verify?active_id=${
            count + 1
          }">আপনার একাউন্ট একটিভ করতে এখানে ক্লিক করুন.</a></b>`, // html body
        });

        reply.send({
          messageId: info.messageId,
          from: "sunnahkobul@gmail.com", // sender address
          to: email,
        });
      } catch (err) {
        reply.send(err.message);
      }
    }
  );

  fastify.get("/user/verify", async (request, reply) => {
    try {
      const { active_id } = request.query;
      if (active_id) {
        await collection.findOneAndUpdate(
          { id: Number(active_id) },
          {
            $set: { isVerify: true, updatedAt: new Date().toISOString() },
          }
        );
      }
      reply.redirect(`${process.env.FE_URL}/login`);
    } catch (err) {
      reply.send(err.message);
    }
  });

  fastify.post("/password/recover", async (request, reply) => {
    try {
      const { email } = request.body;
      if (!email) {
        reply.status(400).send("Please give correct email");
      }

      const result = await collection.findOne({ email });
      if (!result) {
        reply.status(400).send("There is no user with this email");
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

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "sunnahkobul@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Password Recover", // Subject line
        text: "Password Recover", // plain text body
        html: `<b><a href="${process.env.FE_URL}/setpassword?email=${email}&active_id=${result.id}">আপনার পাসওয়ার্ডটি পুনুরায় সেট করতে এখানে ক্লিক করুন.</a></b>`, // html body
      });

      reply.send({
        messageId: info.messageId,
        from: "sunnahkobul@gmail.com", // sender address
        to: email,
      });
    } catch (err) {
      reply.send(err.message);
    }
  });

  fastify.post("/password/set", async (request, reply) => {
    try {
      const { email, password } = request.body;

      if (!email && !password) {
        reply.status(400).send("Please give email and password");
      }
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      await collection.findOneAndUpdate(
        { email: email },
        {
          $set: {
            password: newPassword,
            updatedAt: new Date().toISOString(),
          },
        }
      );
      reply.send({ message: "Password Changed Successfully" });
    } catch (err) {
      reply.send(err.message);
    }
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
