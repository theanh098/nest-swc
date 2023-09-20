import type { InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { pgSchema, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

import { city } from "./city.model";

export type Country = InferSelectModel<typeof country>;

export const schema = pgSchema("drizzle");

export const country = schema.table(
  "countries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).unique(),
    thoanh: varchar("thoanh", { length: 26 })
  },
  country => ({
    nameIndex: uniqueIndex("name_idx").on(country.name)
  })
);

export const countryCityRelations = relations(country, ({ many }) => ({
  city: many(city)
}));
