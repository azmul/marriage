import { userCheck } from "../utils/check.js";
import {
  generalInfoSchema,
  addressSchema,
  educationSchema,
  familySchema,
  personalSchema,
  marriageSchema,
  otherSchema,
  lifepartnerSchema,
  authoritySchema,
  contactMarriageSchema,
} from "../schema/biodata.js";
import {
  generalInfoPayload,
  addressPayload,
  educationPayload,
  familyPayload,
  personalPayload,
  contactPayload,
  marriagePayload,
  authorityPayload,
  otherPayload,
  lifePartnerPayload,
} from "../utils/biodata.js";

import { biodataCheckHandler } from "../utils/biodataCheck.js";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options, done) {
  const collection = fastify.mongo.db.collection("candidates");

  const projectionFields = {
    password: 0,
  };

  fastify.patch(
    "/biodata/generalinfo",
    {
      schema: generalInfoSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = generalInfoPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          {
            $set: { generalInfo: payload, updatedAt: new Date().toISOString() },
          }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/address",
    {
      schema: addressSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = addressPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { address: payload, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/education",
    {
      schema: educationSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = educationPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { education: payload, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/family",
    {
      schema: familySchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = familyPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { family: payload, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/personal",
    {
      schema: personalSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = personalPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { personal: payload, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/marriage",
    {
      schema: marriageSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = marriagePayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { marriage: payload, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/other",
    {
      schema: otherSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = otherPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { other: payload, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/lifePartner",
    {
      schema: lifepartnerSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = lifePartnerPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          {
            $set: { lifePartner: payload, updatedAt: new Date().toISOString() },
          }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/authority",
    {
      schema: authoritySchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = authorityPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { authority: payload, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/contact",
    {
      schema: contactMarriageSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = contactPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { contact: payload, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.patch(
    "/biodata/basic",
    {
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      try {
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { ...request.body, updatedAt: new Date().toISOString() } }
        );
        return await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.get(
    "/biodata/publish",
    {
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      try {
        const data = await collection.findOne(
          { email: request.user.email },
          {
            projection: { ...projectionFields },
          }
        );
        const isPublishPossibele = biodataCheckHandler(data);
        if (isPublishPossibele) {
          await collection.findOneAndUpdate(
            { email: request.user.email },
            { $set: { isPublish: true, updatedAt: new Date().toISOString() } }
          );
          return await collection.findOne(
            { email: request.user.email },
            {
              projection: { ...projectionFields },
            }
          );
        } else {
          reply.status(400).send({
            statusCode: 400,
            message:
              "আপনার বায়োডাটা পাবলিশ হবেনা। আপনি সব তথ্য দিয়ে পাবলিশ করেন।",
          });
        }
      } catch (err) {
        reply.send("error");
      }
    }
  );

  fastify.get("/biodata/info", async (request, reply) => {
    try {
      const male = await collection.find({ "generalInfo.gender": 1, isPublish: true, isApproved: true }).count();
      const female = await collection.find({ "generalInfo.gender": 2, isPublish: true, isApproved: true }).count();
      const marriage = await collection.find({ isPublish: true, isApproved: true, isMarried: true }).count();
      reply.status(200).send({ male, female, marriage });
    } catch (err) {
      reply.status(500).send({ message: err.message });
    }
  });

  fastify.get("/biodata/:id", async (request, reply) => {
    try {
      const projectionFields = {
        email: 0,
        comment: 0,
        createdAt: 0,
        updatedAt: 0,
        socialName: 0,
        social: 0,
        _id: 0,
        isDelete: 0,
        isDisable: 0,
        isMarried: 0,
        isPublish: 0,
        "generalInfo.name": 0,
        "generalInfo.age": 0,
        contact: 0,
        isApproved: 0,
        isVerify: 0,
        social: 0,
        password: 0,
        "family.fatherName": 0,
        "family.motherName": 0,
      };
      const result = await collection.findOne(
        {
          id: Number(request.params.id),
        },
        {
          projection: { ...projectionFields },
        }
      );
      if (!result) {
        throw new Error("Invalid Id");
      }
      return result;
    } catch (err) {
      throw new Error(err);
    }
  });

  done();
}

export default routes;
