import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import { city, cityCountryRelations } from '@database/models/city.model';
import { country, countryCityRelations } from '@database/models/country.model';
import { pgSchema } from 'drizzle-orm/pg-core';

const schema = {
  city,
  country,
  cityCountryRelations,
  countryCityRelations
};

export const drizzleSchema = pgSchema('drizzle');

export type Database = NodePgDatabase<typeof schema>;

export const getDb = (config: PoolConfig): Database => {
  const pool = new Pool(config);
  return drizzle(pool, {
    schema: {
      city,
      country
    }
  });
};
