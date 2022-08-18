import { userCheck } from "../utils/check.js";
import { createSchema } from "../schema/candidates.js";
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options, done) {
  const collection = fastify.mongo.db.collection("candidates");

  fastify.get("/", { preHandler: userCheck }, async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/candidates", async (request, reply) => {
    const result = await collection.find().toArray();
    if (result.length === 0) {
      throw new Error("No documents found");
    }
    return result;
  });

  fastify.get("/candidates/:candidate", async (request, reply) => {
    const result = await collection.findOne({ name: request.params.name });
    if (!result) {
      throw new Error("Invalid value");
    }
    return result;
  });

  fastify.post(
    "/candidates",
    { schema: createSchema, preHandler: userCheck },
    async (request, reply) => {
      // we can use the `request.body` object to get the data sent by the client
      const result = await collection.insertOne({ ...request.body });
      return result;
    }
  );

  done();
}

export default routes;
