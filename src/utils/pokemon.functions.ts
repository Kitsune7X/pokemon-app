import type { PokemonPaginationResponse } from "#/types/pokemon";
import { createServerFn } from "@tanstack/react-start";

export const fetchPokemonList = createServerFn({ method: "GET" }).handler(
  async (): Promise<PokemonPaginationResponse> => {
    const response = await fetch(process.env.POKE_API_PAGINATION_URL as string);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
    }

    return await response.json();
  },
);
