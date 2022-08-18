import { userCheck } from "../utils/check.js";
import { DEFAULT_DATA_PER_PAGE } from "../constant/pagination.js";
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
    const {
      page = 1,
      size = DEFAULT_DATA_PER_PAGE,
      createdAt,
      endAt,
      gender,
      maritalStatus,
      district
    } = request.query;
    const skips = Number(size) * (Number(page) - 1);

    const query = {};
    if (createdAt && endAt) {
      if (start && end) {
        query.createdAt = {
          $gte: new Date(createdAt),
          $lt: new Date(endAt),
        };
      }
    }

    if (gender) query["generalInfo.gender"] = Number(gender);
    if (district) query["generalInfo.parmanentDistrict"] = district;
    if (maritalStatus) query["generalInfo.maritalStatus"] = Number(maritalStatus);

    try {
      const result = await collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(Number(size))
        .toArray();
      const total = await collection.find(query).count();

      if (result.length === 0) {
        throw new Error("No documents found");
      }

      reply.status(200).send({
        data: result,
        pagination: {
          total,
          size: Number(size),
          page: Number(page),
        },
      });
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  fastify.get("/candidates/:id", async (request, reply) => {
    try {
      const result = await collection.findOne({ id: Number(request.params.id) });
      if (!result) {
        throw new Error("Invalid Id");
      }
      return result;
    } catch (err) {
      throw new Error(err)
    }
    
  });

  done();
}

export default routes;
