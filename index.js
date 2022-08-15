import "make-promises-safe";
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import dbConnector from "./db/connect.js";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fastifyEnv from "@fastify/env";

const app = Fastify({
  logger: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.register(cors);
app.register(helmet);

app
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
      },
    },
    data: process.env,
  })
  .ready((err) => {
    if (err) console.error(err);
  });

app.register(dbConnector);

app.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

app.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

/**
 * Run the server!
 */
const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await app.listen({ port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
