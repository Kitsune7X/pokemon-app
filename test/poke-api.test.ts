import { pokeApiBaseUrl } from "#/config/pokeApiUrl";
import type {
  PokemonPaginationResponse,
  PokemonSheetResponse,
} from "#/types/pokemon";
import {
  assert,
  beforeAll,
  describe,
  expect,
  expectTypeOf,
  test,
} from "vitest";

describe("Poke Api", () => {
  describe("Resource list of Pokémon", () => {
    let response: Response;
    let body: PokemonPaginationResponse;

    beforeAll(async () => {
      response = await fetch(pokeApiBaseUrl);

      body = await response.json();
    });

    test("Should have response status 200", () => {
      expect(response.status).toBe(200);
    });

    test("Should have no previous page", () => {
      expect(body.previous).toBe(null);
    });

    test("Should contain an array of Pokémon", () => {
      expectTypeOf(body.results).toBeArray();
    });

    test("Should only return 20 Pokémon", () => {
      expect(body.results.length).toBe(20);
    });

    test("First Pokémon should be 'Bulbasaur'", () => {
      expect(body.results.at(0)?.name).toMatch(/bulbasaur/);
    });
  });

  describe("Single Pokémon detail", () => {
    let response: Response;
    let body: PokemonSheetResponse;

    const bulbasaur = "bulbasaur";

    beforeAll(async () => {
      response = await fetch(`${pokeApiBaseUrl}/${bulbasaur}`);

      body = await response.json();
    });

    test("Should have response status 200", () => {
      expect(response.status).toBe(200);
    });

    test("Should return correct Pokémon name", () => {
      expect(body.name).toMatch(/bulbasaur/);
    });

    test("Should contain details about Pokémon", () => {
      assert.property(body, "abilities");
      assert.property(body, "height");
      assert.property(body, "weight");
    });
  });
});
