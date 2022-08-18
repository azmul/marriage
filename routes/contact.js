import { createContactSchema } from "../schema/contact.js";
import { contactPayload } from "../utils/contact.js";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options, done) {
  const collection = fastify.mongo.db.collection("contact");

  fastify.post(
    "/contact",
    {
      schema: createContactSchema,
    },
    async (request, reply) => {
      try {
        const payload = contactPayload(request.body);
        const result = await collection.insertOne({ ...payload });
        return result;
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.get("/contact", async (request, reply) => {
    const result = await collection.find().toArray();
    if (result.length === 0) {
      throw new Error("No documents found");
    }
    return result;
  });

  done();
}

export default routes;
