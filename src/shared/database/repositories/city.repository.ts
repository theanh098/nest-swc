import { Injectable } from '@nestjs/common';
import { Database } from '..';
import { InjectDb } from '@decorators/database.inject';
import { City, city } from '../models/city.model';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { eq, sql } from 'drizzle-orm';

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
