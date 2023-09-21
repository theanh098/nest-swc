import { Test } from "@nestjs/testing";
import * as TE from "fp-ts/TaskEither";
import { afterEach, beforeAll, expect, it, test, vi } from "vitest";

import { CountryController } from "@root/country/country.controller";
import { CountryService } from "@root/country/country.service";

test("CatsController", () => {
  let countryController: CountryController;
  let countryService: CountryService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [CountryService]
    }).compile();

    countryService = moduleRef.get<CountryService>(CountryService);
    countryController = moduleRef.get<CountryController>(CountryController);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("getCountry", () => {
    it("should return a country correctly", () => {
      const mockCountry = { id: 1, name: "india", thoanh: "cute" };
      vi.spyOn(countryService, "getCountry").mockReturnValue(
        TE.right(mockCountry)
      );
      expect(countryController.getCountry(1)).toEqual(mockCountry);
    });
  });
});
