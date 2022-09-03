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
  const seperateRequest = fastify.mongo.db.collection("seperateRequest");

  fastify.get("/", { preHandler: userCheck }, async (request, reply) => {
    return { message: "Hello Sunnah Shadi dot com" };
  });

  fastify.get("/candidates", async (request, reply) => {
    try {
      const {
        page = 1,
        pageSize = DEFAULT_DATA_PER_PAGE,
        age,
        gender,
        color,
        height,
        weight,
        occupation,
        maritalStatus,
        parmanentDistrict,
      } = request.query;
      const skips = Number(pageSize) * (Number(page) - 1);

      const projectionFields = {
        email: 0,
        comment: 0,
        createdAt: 0,
        updatedAt: 0,
        socialName: 0,
        social: 0,
        _id: 0,
        isDelete: 0,
        isDisable: 0,
        isMarried: 0,
        isPublish: 0,
        "generalInfo.name": 0,
        "generalInfo.age": 0,
        contact: 0,
        isApproved: 0,
        isVerify: 0,
        social: 0,
        password: 0,
        "family.fatherName": 0,
        "family.motherName": 0,
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

      if (height) {
        query["generalInfo.height"] = {
          $gte: 3.9,
          $lt: Number(height) + 1,
        };
      }

      if (weight) {
        query["generalInfo.weight"] = {
          $gte: 25,
          $lt: Number(weight) + 1,
        };
      }

      if (gender) query["generalInfo.gender"] = Number(gender);
      if (color) query["generalInfo.color"] = Number(color);
      if (occupation) query["generalInfo.occupation"] = Number(occupation);
      if (parmanentDistrict)
        query["generalInfo.parmanentDistrict"] = Number(parmanentDistrict);
      if (maritalStatus)
        query["generalInfo.maritalStatus"] = Number(maritalStatus);

      const result = await candidates
        .find(query, {
          projection: { ...projectionFields },
        })
        .sort({ id: 1 })
        .skip(skips)
        .limit(Number(pageSize))
        .toArray();

      const total = await candidates.find(query).count();

      reply.status(200).send({
        data: result,
        pagination: {
          total: Number(total),
          pageSize: Number(pageSize),
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
        current = 1,
        pageSize = DEFAULT_DATA_PER_PAGE,
        startDate,
        endDate,
      } = request.query;

      const skips = Number(pageSize) * (Number(current) - 1);

      const query = {
        isVerify: true,
      };

      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate).toISOString(),
          $lt: new Date(endDate).toISOString(),
        };
      }

      try {
        const results = await candidates
          .find(query)
          .sort({ createdAt: -1 })
          .skip(skips)
          .limit(Number(pageSize))
          .toArray();

        const total = await candidates.find(query).count();

        reply.status(200).send({
          data: results,
          pagination: {
            total: Number(total),
            pageSize: Number(pageSize),
            current: Number(current),
          },
        });
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  fastify.get("/admin/candidates/:id", async (request, reply) => {
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

  fastify.get(
    "/candidates/single",
    {
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      try {
        const result = await candidates.findOne({ email: request.user.email });
        if (!result) {
          throw new Error("Invalid Id");
        }
        return result;
      } catch (err) {
        throw new Error(err);
      }
    }
  );

  fastify.post(
    "/candidates/request",
    {
      schema: contactRequestSchema,
    },
    async (request, reply) => {
      try {
        const payload = candidatesRequestPayload(request.body);
        const { biodatas } = payload;

        if (biodatas.length > 0) {
          const ids = biodatas && biodatas.map((biodata) => biodata.id);
          const count = await candidateRequest.count() + 1;
          const contacts = await candidates
            .find(
              { id: { $in: ids } },
              { projection: { id: 1, contact: 1, _id: 0 } }
            )
            .toArray();
          await candidateRequest.insertOne({ ...payload, id: count, contacts });

          let promises = [];
          let index = 0;

          while (index <= contacts.length - 1) {
            promises.push(
              seperateRequest.insertOne({
                requestId: count,
                bioId: biodatas[index].id,
                isDone: false,
                isCancel: false,
                comment: null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })
            );
            index += 1;
          }
          await Promise.all(promises);
          reply.status(201).send(payload);
        }
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
