import "make-promises-safe";
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import dbConnector from "./db/connect.js";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fastifyEnv from "@fastify/env";

const fastify = Fastify({
  logger: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fastify.register(cors);
fastify.register(helmet);

fastify
  .register(fastifyEnv, {
    confKey: "config",
    dotenv: true,
    schema: {
      type: "object",
      required: ["NODE_ENV"],
      properties: {
        NODE_ENV: {
          type: "string",
        },
        MONGO_LOCAL_URL: { type: "string" },
        MONGO_URL: { type: "string" },
        SECRET_KEY: { type: "string" },
        FE_URL: { type: "string" },
      },
    },
    data: process.env,
  })
  .ready((err) => {
    if (err) console.error(err);
  });

fastify.register(dbConnector);

fastify.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

fastify.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

/**
 * Run the server!
 */
const port = process.env.PORT || 8080;
const host = process.env.HOST || "0.0.0.0";

const start = async () => {
  try {
    fastify.listen({ port, host });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
