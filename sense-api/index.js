import { ProxyConfigCollection } from './server/proxy_config_collection';

module.exports = {
    initApiRoutes: function (server) {
      let Boom = require('boom');
      let Joi = require('joi');

      // const proxyConfigCollection = new ProxyConfigCollection(options.proxyConfig);
      const proxyRouteConfig = {
        validate: {
          query: Joi.object().keys({
            uri: Joi.string().uri({
              allowRelative: false,
              shema: ['http:', 'https:'],
            }),
          }).unknown(true),
        },

        // const filters = options.proxyFilter.map(str => new RegExp(str));
        // proxyFilter: Joi.array().items(Joi.string()).single().default(['.*'])
        // pre: [
        //   function filterUri(req, reply) {
        //     const { uri } = req.query;

        //     if (!filters.some(re => re.test(uri))) {
        //       const err = Boom.forbidden();
        //       err.output.payload = "Error connecting to '" + uri + "':\n\nUnable to send requests to that url.";
        //       err.output.headers['content-type'] = 'text/plain';
        //       reply(err);
        //     } else {
        //       reply();
        //     }
        //   }
        // ],

        handler(req, reply) {
          const { uri } = req.query;

          reply.proxy({
            uri,
            xforward: true,
            passThrough: true,
            onResponse(err, res, request, reply, settings, ttl) {
              if (err != null) {
                reply("Error connecting to '" + request.query.uri + "':\n\n" + err.message).type("text/plain").statusCode = 502;
              } else {
                reply(null, res);
              }
            },

            // ...proxyConfigCollection.configForUri(uri)
          })
        }
      };
      
      // http://hapijs.com/api/8.8.1#route-configuration
      server.route({
        path: '/api/sense/proxy',
        method: '*',
        config: {
          ...proxyRouteConfig,

          payload: {
            output: 'stream',
            parse: false
          },
        }
      });

      server.route({
        path: '/api/sense/proxy',
        method: 'GET',
        config: {
          ...proxyRouteConfig
        }
      });
      
      server.route({
        path: '/api/sense/api_server',
        method: ['GET', 'POST'],
        handler: function (req, reply) {
          let server = require('./api_server/server');
          let {sense_version, apis} = req.query;
          if (!apis) {
            reply(Boom.badRequest('"apis" is a required param.'));
            return;
          }

          return server.resolveApi(sense_version, apis.split(","), reply);
        }
      });

    }
};
