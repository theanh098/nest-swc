import { Injectable } from '@nestjs/common';
import { Database } from '../pool';
import { InjectDb } from '@decorators/database.inject';
import { City, city } from '../models/city.model';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { eq } from 'drizzle-orm';

@Injectable()
export class CityRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(id: number): TE.TaskEither<unknown, City | undefined> {
    return pipe(
      TE.tryCatch(
        () =>
          this.db.query.city.findFirst({
            where: (fields, operators) => operators.eq(fields.id, id),
          }),
        (err) => err,
      ),
    );
  }
}
