import { getDb } from "@root/shared/database";

export const testDatabase = getDb({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});
