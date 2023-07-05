import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [process.cwd() + '/src/database/migrations/*{.ts,.js}'],
  logging: true,
  cache: {
    type: 'database',
    tableName: 'shop_close_cache',
  },
  timezone: 'UTC+00:00',
});
