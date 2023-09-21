import { CountryController } from "@root/country/country.controller";
import { CountryService } from "@root/country/country.service";
import { test, beforeEach, it, vi, expect } from "vitest";
import { Test } from "@nestjs/testing";
import * as TE from "fp-ts/TaskEither";

test("CatsController", () => {
  let countryController: CountryController;
  let countryService: CountryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [CountryService]
    }).compile();

    countryService = moduleRef.get<CountryService>(CountryService);
    countryController = moduleRef.get<CountryController>(CountryController);
  });

  test("getCountry", async () => {
    it("should return a country correctly", async () => {
      let mockCountry = { id: 1, name: "india", thoanh: "xinh xan" };
      vi.spyOn(CountryService.prototype, "getCountry").mockReturnValue(
        TE.right({ id: 1, name: "india", thoanh: "xinh xan" })
      );
      expect(await countryController.getCountry(1)).toEqual(mockCountry);
    });
  });
});
