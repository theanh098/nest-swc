import type { Config } from 'drizzle-kit';

export default {
  schema: ['./src/shared/database/models/*'],
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    database: 'drizzle_city',
    host: 'localhost',
    port: 5432,
    password: 'vitaminc',
    user: 'postgres'
  }
} satisfies Config;
