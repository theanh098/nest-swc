import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';

async function main() {
  const client = new Client({
    database: 'drizzle_city',
    host: 'localhost',
    port: 5432,
    password: 'vitaminc',
    user: 'postgres'
  });

  await client.connect();

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: 'drizzle' });
}

main();
