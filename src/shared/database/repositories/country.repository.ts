import { sql } from "drizzle-orm";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import type { DatabaseQueryError } from "@root/shared/errors/common/DatabaseQueryError";
import { databaseQueryError } from "@root/shared/errors/common/DatabaseQueryError";
import type { DatabaseQueryNotFoundError } from "@root/shared/errors/common/DatabaseQueryNotFoundError";
import { databaseQueryNotFoundError } from "@root/shared/errors/common/DatabaseQueryNotFoundError";
import { paginate } from "@root/shared/helpers/paginate";
import type { Country } from "@root/shared/IO/Country";
import type { PaginateResponse } from "@root/shared/IO/Paginate";

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
            table: country,
            target: {
              column: country.id,
              value: id
            }
          })
        )
      )
    );
  }

  public find(): TE.TaskEither<DatabaseQueryError, PaginateResponse<Country>> {
    return pipe(
      TE.tryCatch(
        () =>
          Promise.all([
            this.db.query.country.findMany({
              offset: 0,
              limit: 10
            }),
            this.db
              .select({
                count: sql`count(*)`.mapWith(Number)
              })
              .from(country)
          ]),
        err => databaseQueryError(err)
      ),
      TE.map(([nodes, [{ count }]]) =>
        paginate({ limit: 10, nodes, page: 1, total: count })
      )
    );
  }
}
