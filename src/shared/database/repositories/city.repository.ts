import { Injectable } from "@nestjs/common";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";

@Injectable()
export class CityRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(id: number) {
    return pipe(
      TE.tryCatch(
        () =>
          this.db.query.city.findFirst({
            columns: {
              popularity: true
            },
            with: {
              country: {
                columns: {
                  name: true
                }
              }
            },
            where: (fields, operators) => operators.eq(fields.id, id)
          }),
        err => err
      )
    );
  }
}
