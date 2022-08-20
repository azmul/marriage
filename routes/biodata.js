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
  gurdianPermissionSchema,
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
  gurdianPermissionPayload,
  otherPayload,
  lifePartnerPayload,
} from "../utils/biodata.js";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options, done) {
  const collection = fastify.mongo.db.collection("candidates");

  const projectionFields = {
    createdAt: 0,
    updatedAt: 0,
    socialName: 0,
    isDelete: 0,
    isDisable: 0,
    isMarried: 0,
    isPublish: 0,
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
            projection: { ...projectionFields }
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
    "/biodata/gurdian",
    {
      schema: gurdianPermissionSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = gurdianPermissionPayload(request.body);
        await collection.findOneAndUpdate(
          { email: request.user.email },
          { $set: { gurdian: payload, updatedAt: new Date().toISOString() } }
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

  done();
}

export default routes;
