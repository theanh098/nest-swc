import { Injectable } from "@nestjs/common";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { CountryRepository } from "@root/shared/database/repositories/country.repository";

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  public getCountry(id: number) {
    return this.countryRepository.findById(id);
  }

  public getCountryList() {
    return this.countryRepository.find();
  }

  async oneDelay() {
    await new Promise(res => setTimeout(res, 4000));
    return 2;
  }
  async twoDelay() {
    await new Promise(res => setTimeout(res, 4000));
    return "cmm";
  }

  public one(): TE.TaskEither<string, string | number> {
    return TE.tryCatch(
      () => this.oneDelay(),
      () => "one error"
    );
  }

  public two(): TE.TaskEither<string, string | number> {
    return TE.tryCatch(
      () => this.twoDelay(),
      () => "two error"
    );
  }

  public t() {
    return pipe([this.one(), this.two()], TE.sequenceArray);
  }
}
