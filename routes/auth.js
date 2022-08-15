/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options) {
  const candidates = fastify.mongo.db.collection("candidates");

  fastify.post("/signup", async (request, reply) => {
    const {name, email} = request.body;

    const result = await candidates.findOne({ email });
    if (!result) {
      const count = await candidates.count();
      await candidates.insertOne({ ...request.body, id: count + 1, isDelete: false, isDisable: false, isPublish: false });
      const token = fastify.jwt.sign({ name, email});
      reply.send({ token });
    }
    const token = fastify.jwt.sign({ name, email});
    reply.send({ token });
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
