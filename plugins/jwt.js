import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function jwtConnector(fastify, options, done) {
  try {
    fastify.register(fastifyJwt, {
      secret: process.env.SECRET_KEY,
    });

    fastify.decorate("authenticate", async function (request, reply, next) {
      try {
        const auth = request.headers.authorization;
        if(!auth) reply.send("Token not provided")
        const token = auth.split(" ")[1];
        fastify.jwt.verify(token, (err, decoded) => {
          if (err) fastify.log.error(err);
          request.user = decoded;
        });
      } catch (err) {
        fastify.log.error(err);
      }
    });
    fastify.decorate("adminAuthenticate", async function (request, reply, next) {
      try {
        const token = request.headers["x-auth-token"];
        if(!token) reply.send("Token not provided")
        fastify.jwt.verify(token, (err, decoded) => {
          if (err) fastify.log.error(err);
          request.user = decoded;
        });
      } catch (err) {
        fastify.log.error(err);
      }
    });
  } catch (err) {
    fastify.log.error(err);
  }
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(jwtConnector);
