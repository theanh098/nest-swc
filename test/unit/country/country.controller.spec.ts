import { Test } from "@nestjs/testing";
import * as TE from "fp-ts/TaskEither";
import { afterEach, beforeAll, expect, it, vi, describe } from "vitest";

import { AppModule } from "@root/app.module";
import { CountryController } from "@root/country/country.controller";
import { CountryService } from "@root/country/country.service";

describe("CatsController", () => {
  let countryController: CountryController;
  let countryService: CountryService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    countryService = moduleRef.get<CountryService>(CountryService);
    countryController = moduleRef.get<CountryController>(CountryController);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getCountry", () => {
    it("should return a country correctly", async () => {
      const mockCountry = { id: 1, name: "india", thoanh: "cute" };
      vi.spyOn(countryService, "getCountry").mockReturnValue(
        TE.right(mockCountry)
      );
      expect(await countryController.getCountry(1)).toEqual(mockCountry);
    });
  });
});
