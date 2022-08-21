import { userCheck } from "../utils/check.js";
import { DEFAULT_DATA_PER_PAGE } from "../constant/pagination.js";
import { contactRequestSchema } from "../schema/candidates.js";
import { candidatesRequestPayload } from "../utils/candidates.js";
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options, done) {
  const candidates = fastify.mongo.db.collection("candidates");
  const candidateRequest = fastify.mongo.db.collection("candidateRequest");

  fastify.get("/", { preHandler: userCheck }, async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/candidates", async (request, reply) => {
    const {
      page = 1,
      size = DEFAULT_DATA_PER_PAGE,
      age,
      createdAt,
      endAt,
      gender,
      maritalStatus,
      parmanentDistrict,
    } = request.query;
    const skips = Number(size) * (Number(page) - 1);

    const projectionFields = {
      createdAt: 0,
      updatedAt: 0,
      socialName: 0,
      isDelete: 0,
      isDisable: 0,
      isMarried: 0,
      isPublish: 0,
      "generalInfo.name": 0
    };

    const query = {};
    if (createdAt && endAt) {
      if (start && end) {
        query.createdAt = {
          $gte: new Date(createdAt),
          $lt: new Date(endAt),
        };
      }
    }

    if (age) {
      query["generalInfo.age"] = {
        $gte: 6,
        $lt: Number(age) + 1,
      };
    }

    if (gender) query["generalInfo.gender"] = Number(gender);
    if (parmanentDistrict) query["generalInfo.parmanentDistrict"] = Number(parmanentDistrict);
    if (maritalStatus)
      query["generalInfo.maritalStatus"] = Number(maritalStatus);

    try {
      const result = await candidates
        .find(query, {
          projection: { ...projectionFields }
        })
        .sort({ id: 1 })
        .skip(skips)
        .limit(Number(size))
        .toArray();
        
      const total = await candidates.find(query).count();

      if (result.length === 0) {
        throw new Error("No documents found");
      }

      reply.status(201).send({
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
      const result = await candidates.findOne({
        id: Number(request.params.id),
      });
      if (!result) {
        throw new Error("Invalid Id");
      }
      return result;
    } catch (err) {
      throw new Error(err);
    }
  });

  fastify.post(
    "/candidates/request",
    {
      schema: contactRequestSchema,
    },
    async (request, reply) => {
      try {
        const payload = candidatesRequestPayload(request.body);
        await candidateRequest.insertOne({ ...payload });
        reply.status(201).send(payload);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  done();
}

export default routes;
