import type { city } from "../database/models/city.model";

export type City = typeof city.$inferSelect;
