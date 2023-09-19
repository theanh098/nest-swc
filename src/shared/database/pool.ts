import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import { city } from '@database/models/city.model';
import { country } from '@database/models/country.model';

const schema = {
  city,
  country,
};

export type Database = NodePgDatabase<typeof schema>;

export const getDb = (config: PoolConfig): Database => {
  const pool = new Pool(config);
  return drizzle(pool, {
    schema: {
      city,
      country,
    },
  });
};
