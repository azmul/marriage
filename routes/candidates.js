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
      "generalInfo.name": 0,
      contact: 0,
    };

    const query = {
      isVerify: true,
      isPublish: true,
      isApproved: true,
    };
    
    if (age) {
      query["generalInfo.age"] = {
        $gte: 6,
        $lt: Number(age) + 1,
      };
    }

    if (gender) query["generalInfo.gender"] = Number(gender);
    if (parmanentDistrict)
      query["generalInfo.parmanentDistrict"] = Number(parmanentDistrict);
    if (maritalStatus)
      query["generalInfo.maritalStatus"] = Number(maritalStatus);

    try {
      const result = await candidates
        .find(query, {
          projection: { ...projectionFields },
        })
        .sort({ id: 1 })
        .skip(skips)
        .limit(Number(size))
        .toArray();

      const total = await candidates.find(query).count();

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

  fastify.get(
    "/admin/candidates",
    {
      onRequest: [fastify.adminAuthenticate],
    },
    async (request, reply) => {
      const {
        page = 1,
        size = DEFAULT_DATA_PER_PAGE,
        startDate,
        endDate,
      } = request.query;
      const skips = Number(size) * (Number(page) - 1);

      const query = {
        isVerify: true,
        isPublish: true,
      };

      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate).toISOString(),
          $lt: new Date(endDate).toISOString(),
        };
      }

      try {
        const result = await candidates
          .find(query)
          .sort({ createdAt: -1 })
          .skip(skips)
          .limit(Number(size))
          .toArray();

        const total = await candidates.find(query).count();

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
    }
  );

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
        const { biodatas } = payload;
        const ids = biodatas && biodatas.map((biodata) => biodata.id);
        const contacts = await candidates
          .find(
            { id: { $in: ids } },
            { projection: { id: 1, contact: 1, _id: 0 } }
          )
          .toArray();
        await candidateRequest.insertOne({ ...payload, contacts });
        reply.status(201).send(payload);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  fastify.patch(
    "/admin/candidates/:id",
    {
      onRequest: [fastify.adminAuthenticate],
    },
    async (request, reply) => {
      try {
        const id = fastify.mongo.ObjectId(request.params.id);
        const { isDelete, isDisable, isMarried, isApproved, comment } =
          request.body;
        await candidates.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              isDelete: isDelete,
              isDisable: isDisable,
              isMarried: isMarried,
              isApproved: isApproved,
              comment: comment,
              updatedAt: new Date().toISOString(),
            },
          }
        );
        return request.body;
      } catch (err) {
        reply.send(err);
      }
    }
  );

  done();
}

export default routes;
