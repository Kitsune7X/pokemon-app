import type { PokemonPaginationResponse } from "#/types/pokemon";
import { createServerFn } from "@tanstack/react-start";
import { PokeAPIUrl } from "./schemas";

export const fetchPokemonList = createServerFn({ method: "GET" })
  .inputValidator(PokeAPIUrl)
  .handler(async ({ data }): Promise<PokemonPaginationResponse> => {
    const response = await fetch(data.url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
    }

    return await response.json();
  });
