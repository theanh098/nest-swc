import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import type { DatabaseQueryError } from "@root/shared/errors/common/DatabaseQueryError";
import { databaseQueryError } from "@root/shared/errors/common/DatabaseQueryError";
import type { DatabaseQueryNotFoundError } from "@root/shared/errors/common/DatabaseQueryNotFoundError";
import { databaseQueryNotFoundError } from "@root/shared/errors/common/DatabaseQueryNotFoundError";
import type { Country } from "@root/shared/models/Country";

import { country } from "../models/country.model";

export class CountryRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(
    id: number
  ): TE.TaskEither<DatabaseQueryNotFoundError | DatabaseQueryError, Country> {
    return pipe(
      TE.tryCatch(
        () =>
          this.db.query.country.findFirst({
            where: (cols, opts) => opts.eq(cols.id, id)
          }),
        err => databaseQueryError(err)
      ),
      TE.chainW(
        TE.fromNullable(
          databaseQueryNotFoundError({
            filterColumn: country.id,
            table: country,
            filterValue: id
          })
        )
      )
    );
  }
}
