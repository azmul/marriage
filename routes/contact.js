import { createContactSchema } from "../schema/contact.js";
import { contactPayload } from "../utils/contact.js";
import { phoneNumberValidator } from "../utils/phValidator.js";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options, next) {
  const collection = fastify.mongo.db.collection("contact");

  fastify.post(
    "/contact",
    {
      schema: createContactSchema,
    },
    async (request, reply) => {
      try {
        const payload = contactPayload(request.body);
        if(!phoneNumberValidator(payload.phone)) {
          reply.status(400).send({ status: 400, message: "Phone not valid"});
        }
        const count = await collection.count();
        const result = await collection.insertOne({
          ...payload,
          createdAt: new Date().toISOString(),
          isDone: false,
          id: count + 1,
          comment: null,
        });
        return result;
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.get("/contact", async (req, rep) => {
    const { current = 1, pageSize = 50, startDate, endDate } = req.query;

    const skips = Number(pageSize) * (Number(current) - 1);

    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate).toISOString(),
        $lt: new Date(endDate).toISOString(),
      };
    }

    try {
      const items = await collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(Number(pageSize))
        .toArray();

      const total = await collection.find(query).count();

      rep.status(200).send({
        data: items,
        pagination: {
          total,
          pageSize,
          current,
        },
      });
    } catch (error) {
      rep.status(500).send({ status: 500, message: error });
    }
  });

  fastify.patch("/contact/:id", async (req, rep) => {
    const { isDone, comment } = req.body;
    const id = fastify.mongo.ObjectId(req.params.id);

    try {
      const item = await collection.updateOne(
        { _id: id },
        {
          $set: {
            isDone: isDone,
            comment: comment,
          },
        }
      );
      if (!item)
        return rep
          .status(404)
          .send("The Message with the given id was not found");

      rep.status(200).send({ message: "Message Updated", data: item });
    } catch (err) {
      rep.status(400).send({ status: 400, message: err?.message });
    }
  });

  next();
}

export default routes;
