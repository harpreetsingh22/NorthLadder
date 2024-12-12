import 'dotenv/config';

export const config = { transaction: true };

export default {
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_MASTER_HOST,
    port: process.env.MYSQL_MASTER_PORT,
    user: process.env.MYSQL_MASTER_USER,
    password: process.env.MYSQL_MASTER_PASSWORD,
    database: process.env.MYSQL_MASTER_DATABASE,
  },
  migrateOnStart: true,
  migrations: {
    tableName: 'migrations',
  },
};
