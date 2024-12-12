import { Manifest } from '@hapi/glue';
import { env } from '@utilities';
import ServicePlugins from '../origami';

const ServerManifest: Manifest = {
  server: {
    host: env('SERVER_HOST', '0.0.0.0'),
    port: env('PORT', '3000'),
    routes: {
      cors: {
        origin: env('ALLOWED_ORIGINS', '*').split(','),
        headers: [
          'Accept',
          'Authorization',
          'Content-Type',
          'If-None-Match',
          'X-CSRF-Token',
          'App-Platform',
          'platform',
          'App-Device-Id',
          'App-Version',
          'Appsflyer-Uid',
          'locale',
          'X-Amz-Apigw-Id',
          'X-Amzn-Requestid',
        ],
      },
    },
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true,
    },
    state: {
      strictHeader: false,
    },
  },
  register: {
    plugins: [
      {
        plugin: ServicePlugins,
        routes: {
          prefix: '/api',
        },
      },
    ],
  },
};

export default ServerManifest;
