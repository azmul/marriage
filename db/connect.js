import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options, done) {
  const url = process.env.NODE_ENV === "production" ? process.env.MONGO_URL : process.env.MONGO_LOCAL_URL;
  try {
    fastify.register(fastifyMongo, {
      url
    });
    fastify.log.info("DB Connected");
    done();
  } catch (err) {
    fastify.log.info("DB Not Connected")
  }
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)