/* eslint-disable import/no-import-module-exports */
import Knex from 'knex';

const { knexSnakeCaseMappers } = require('objection');

exports.register = async (server) => {
  const knex = Knex({
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_MASTER_HOST,
      port: process.env.MYSQL_MASTER_PORT,
      user: process.env.MYSQL_MASTER_USER,
      password: process.env.MYSQL_MASTER_PASSWORD,
      database: process.env.MYSQL_MASTER_DATABASE,
      waitForConnections: true,
      connectionLimit: parseInt(process.env.MYSQL_REPLICA_CONNECTION_LIMIT, 10) || 80,
      queueLimit: 0,
      typeCast(field: any, next: any) {
        if (field.type === 'TINY' && field.length === 1) {
          return field.string() === '1';
        }
        if (field.type === 'NEWDECIMAL') {
          return parseFloat(field.string());
        }
        return next();
      },
      dateStrings: false,
      timezone: '+00:00',
    },
    pool: {
      min: parseInt(process.env.MYSQL_REPLICA_CONNECTION_POOL_MIN, 10) || 50,
      max: parseInt(process.env.MYSQL_REPLICA_CONNECTION_POOL_MAX, 10) || 185,
    },
    ...knexSnakeCaseMappers(),
  });

  // Set producer as a plugin property in the server
  server.expose('knex', knex);
};

exports.pkg = {
  name: 'readReplicaDb',
};
