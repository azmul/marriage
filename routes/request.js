/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options, next) {
  const seperateRequest = fastify.mongo.db.collection("seperateRequest");
  const candidateRequest = fastify.mongo.db.collection("candidateRequest");

  fastify.get(
    "/notification",
    {
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - 8);

      let query = { bioId: Number(req.user.id) };

      query.createdAt = {
        $gte: new Date(startDate).toISOString(),
        $lt: new Date().toISOString(),
      };

      try {
        const items = await seperateRequest
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();

        rep.status(200).send(items);
      } catch (error) {
        rep.status(500).send({ status: 500, message: error });
      }
    }
  );

  fastify.post(
    "/notification/:id/:bioId/:requestId",
    {
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      try {
        const id = fastify.mongo.ObjectId(request.params.id);
        const bioId = Number(request.params.bioId);
        const requestId = Number(request.params.requestId);

        const requestItem = await candidateRequest.findOne(
          { id: requestId },
          { projection: { id: 1, biodatas: 1, _id: 1 } }
        );

        const biodatas = [...requestItem.biodatas];
        let index = -1;
        for (let i = 0; i < biodatas.length; i++) {
          if (biodatas[i].id === bioId) {
            index = i;
            break;
          }
        }
          
        if (index > -1) {
          biodatas[index] = { ...biodatas[index], ...request.body };

          await candidateRequest.findOneAndUpdate(
            { id: requestId },
            {
              $set: {
                biodatas,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          await seperateRequest.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                ...request.body,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          return request.body;
        } else {
          reply.send({ message: "Not Updated" });
        }
      } catch (err) {
        reply.send({ message: err?.message });
      }
    }
  );

  next();
}

export default routes;
