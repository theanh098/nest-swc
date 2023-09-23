import { getDatabase } from "@root/shared/database";

export const testDatabase = getDatabase({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});
