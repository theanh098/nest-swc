import { getDatabase } from "@root/shared/database";
import { sql } from "drizzle-orm";

async function main() {
  const db = getDatabase({
    database: "swc_test_db",
    user: "postgres",
    password: "test",
    port: 5432
  });

  const tables = Object.keys(db._.tableNamesMap);

  for (const table of tables) {
    await db.execute(sql.raw(`DROP TABLE IF EXISTS ${table} CASCADE`));
    console.log(`Droped ${table} table.`);
  }
}

main()
  .then(() => {
    console.info("Testing database has been clean up.");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
