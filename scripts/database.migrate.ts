import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import { TEST_DATABASE_CONNECTION } from "test-helper/database.test.client";
import "dotenv/config";

async function main() {
  const client = new Client({
    connectionString:
      process.env.TARGET === "TEST"
        ? TEST_DATABASE_CONNECTION
        : process.env.DATABASE_URL
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
