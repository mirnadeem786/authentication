import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_DB_HOST,
  port: 5432,
  database: process.env.PG_DB_NAME,
  username: process.env.PG_DB_USERNAME,
  password: process.env.PG_DB_PASSWORD,
  synchronize: false,
  logging: false,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  subscribers: [],
});
