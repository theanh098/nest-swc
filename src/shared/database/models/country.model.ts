import { relations } from "drizzle-orm";
import { pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

import { city } from "./city.model";

export const country = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  popularity: varchar("popularity", { length: 26 }).notNull()
});

export const countryCityRelations = relations(country, ({ many }) => ({
  city: many(city)
}));
