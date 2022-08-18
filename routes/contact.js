import { createContactSchema } from "../schema/contact.js";
import { contactPayload } from "../utils/contact.js";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options) {
  const contact = fastify.mongo.db.collection("contact");

  fastify.post(
    "/contact",
    {
      schema: createContactSchema,
    },
    async (request, reply) => {
      try {
        const payload = contactPayload(request.body);
        const result = await contact.insertOne({ ...payload });
        return result;
      } catch (err) {
        reply.send(err);
      }
    }
  );

  done();
}

export default routes;
