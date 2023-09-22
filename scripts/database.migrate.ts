import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

async function main() {
  const client = new Client({
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
  });
  await client.connect();
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "drizzle" });
}

main()
  .then(() => {
    console.info("Schema has been synchronized.");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
