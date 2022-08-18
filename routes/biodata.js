import { userCheck } from "../utils/check.js";
import { createGeneralInfoSchema } from "../schema/biodata.js";
import { generalInfoPayload } from "../utils/biodata.js";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options, done) {
  const collection = fastify.mongo.db.collection("candidates");

  fastify.patch(
    "/biodata/generalinfo",
    {
      schema: createGeneralInfoSchema,
      onRequest: [fastify.authenticate],
      preHandler: userCheck,
    },
    async (request, reply) => {
      try {
        const payload = generalInfoPayload(request.body);
        await collection.findOneAndUpdate({ email: request.user.email }, { $set: { "generalInfo" : payload } });
        return await collection.findOne({ email: request.user.email });
      } catch (err) {
        reply.send("error");
      }
    }
  );

  done();
}

export default routes;
