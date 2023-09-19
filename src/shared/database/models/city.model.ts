import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { country } from './country.model';
import { InferModel, InferSelectModel } from 'drizzle-orm';

export const popularityEnum = pgEnum('popularity', [
  'unknown',
  'known',
  'popular',
]);

export const city = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  popularity: popularityEnum('popularity'),
  countryId: integer('country_id').references(() => country.id),
});

export type City = InferSelectModel<typeof city>;
