/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("candidates");

  fastify.post("/signup", async (request, reply) => {
    const { name, email } = request.body;
    if (!name && !email) {
      reply.send("Invalid name and email");
    }

    const result = await collection.findOne({ email });
    if (!result) {
      const count = await collection.count();
      await collection.insertOne({
        socialName: name,
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
        isDelete: false,
        isDisable: false,
        isPublish: false,
        isMarried: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      const candidate = await collection.findOne({ email });
      const token = fastify.jwt.sign({ name: candidate.name, email: candidate.email, id: candidate.id });
      reply.send({ token: token, email: candidate.email, id: candidate.id });
    }
    const token = fastify.jwt.sign({ name: result.name, email: result.email, id: result.id });
    reply.send({ token: token, email: result.email, id: result.id });
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
