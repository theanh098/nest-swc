import { Database } from '../pool';
import { InjectDb } from '@decorators/database.inject';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { country } from '../models/country.model';
import { eq } from 'drizzle-orm';

export class CountryRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(id: number) {
    return pipe(
      TE.tryCatch(
        () => this.db.select().from(country).where(eq(country.id, id)),
        (err) => err,
      ),
    );
  }
}
