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

    fastify.decorate("authenticate", async function (request, reply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });
    done();
  } catch (err) {
    fastify.log.err(err);
  }
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(jwtConnector);
