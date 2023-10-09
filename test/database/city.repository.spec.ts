import { eq } from "drizzle-orm";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { testDatabase } from "test-helper/database.test.client";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { city } from "@root/shared/database/models/city.model";
import { country } from "@root/shared/database/models/country.model";
import { CityRepository } from "@root/shared/database/repositories/city.repository";

describe("CityRepository", () => {
  let cityRepository: CityRepository;

  beforeAll(() => {
    cityRepository = new CityRepository(testDatabase);
  });

  describe("findById", () => {
    beforeEach(async () => {
      await testDatabase.insert(country).values({
        name: "India",
        id: 1
      });

      await testDatabase.insert(city).values({
        countryId: 1,
        id: 1,
        name: "Mumbai",
        popularity: "popular"
      });
    });

    afterEach(async () => {
      await testDatabase.delete(city).where(eq(city.id, 1));
      await testDatabase.delete(country).where(eq(country.id, 1));
    });

    describe("happy path", () => {
      it("should return correct city", async () => {
        await pipe(
          cityRepository.findById(1),
          TE.match(
            () => {
              throw Error("unexpected error");
            },
            data => {
              expect(data).toEqual({
                countryId: 1,
                id: 1,
                name: "Mumbai",
                popularity: "popular"
              });
            }
          )
        )();
      });
    });
  });
});
