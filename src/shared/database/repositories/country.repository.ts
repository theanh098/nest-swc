import { eq } from "drizzle-orm";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { Database } from "@shared/database";
import { InjectDb } from "@shared/decorators/database.inject";

import { country } from "../models/country.model";

export class CountryRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(id: number) {
    return pipe(
      TE.tryCatch(
        () => this.db.select().from(country).where(eq(country.id, id)),
        err => err
      )
    );
  }
}
