import { Injectable } from "@nestjs/common";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import type { DatabaseQueryError } from "@root/shared/errors/common/DatabaseQueryError";
import { databaseQueryError } from "@root/shared/errors/common/DatabaseQueryError";
import type { DatabaseQueryNotFoundError } from "@root/shared/errors/common/DatabaseQueryNotFoundError";
import { databaseQueryNotFoundError } from "@root/shared/errors/common/DatabaseQueryNotFoundError";
import type { City } from "@root/shared/IO/City";

import { city } from "../models/city.model";

@Injectable()
export class CityRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(
    id: number
  ): TE.TaskEither<DatabaseQueryError | DatabaseQueryNotFoundError, City> {
    return pipe(
      TE.tryCatch(
        () =>
          this.db.query.city.findFirst({
            where: (cols, opts) => opts.eq(cols.id, id)
          }),
        err => databaseQueryError(err)
      ),
      TE.chainW(
        TE.fromNullable(
          databaseQueryNotFoundError({
            table: city,
            target: {
              column: city.id,
              value: id
            }
          })
        )
      )
    );
  }
}
