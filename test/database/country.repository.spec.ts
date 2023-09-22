import { eq } from "drizzle-orm";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { testDatabase } from "test-helper/database.test.client";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from "vitest";

import { country } from "@root/shared/database/models/country.model";
import { CountryRepository } from "@root/shared/database/repositories/country.repository";
import { isDatabaseQueryError } from "@root/shared/errors/common/DatabaseQueryError";

describe("CountryRepository", () => {
  let countryRepository: CountryRepository;

  beforeAll(() => {
    countryRepository = new CountryRepository(testDatabase);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("findById", () => {
    beforeEach(async () => {
      await testDatabase.insert(country).values({
        name: "India",
        thoanh: "cute",
        id: 1
      });
    });

    afterEach(async () => {
      await testDatabase.delete(country).where(eq(country.id, 1));
    });

    describe("happy path", () => {
      it("should return correct country", async () => {
        await pipe(
          countryRepository.findById(1),
          TE.match(
            () => {
              throw Error("unexpected error");
            },
            data => {
              expect(data).toEqual({
                name: "India",
                thoanh: "cute",
                id: 1
              });
            }
          )
        )();
      });
    });

    describe("negative path", () => {
      it("should return database query error", async () => {
        vi.spyOn(testDatabase.query.country, "findFirst").mockRejectedValue(
          new Error("query err")
        );
        await pipe(
          countryRepository.findById(1),
          TE.match(
            err => expect(isDatabaseQueryError(err)).toBe(true),
            () => {
              throw Error("unexpected success");
            }
          )
        )();
      });
    });
  });
});
