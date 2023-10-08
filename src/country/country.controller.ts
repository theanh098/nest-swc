import { Controller, Get, Param } from "@nestjs/common";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { CountryService } from "./country.service";
import { encodeError } from "@root/shared/errors/adapter";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get(":id")
  getCountry(@Param("id") id: number) {
    return pipe(
      this.countryService.getCountry(+id),
      TE.match(
        err => {
          throw encodeError(err);
        },
        res => res
      )
    )();
  }
}
