import { pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const country = pgTable(
  'countries',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).unique(),
  },
  (country) => ({
    nameIndex: uniqueIndex('name_idx').on(country.name),
  }),
);
