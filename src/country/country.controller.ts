import { Controller, Get, Param } from "@nestjs/common";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { encodeCommonError } from "@root/shared/errors/common/adapter";

import { CountryService } from "./country.service";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getCountryList() {
    return pipe(
      this.countryService.getCountryList(),
      TE.match(
        err => {
          throw encodeCommonError(err);
        },
        res => res
      )
    )();
  }

  @Get(":id")
  getCountry(@Param("id") id: number) {
    return pipe(
      this.countryService.getCountry(+id),
      TE.match(
        err => {
          throw encodeCommonError(err);
        },
        res => res
      )
    )();
  }

  @Get("m")
  m() {
    return pipe(
      this.countryService.t(),
      TE.matchW(
        err => err,
        res => res
      )
    )();
  }
}
