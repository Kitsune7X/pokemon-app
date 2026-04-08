import type { PokemonPaginationResponse } from "#/types/pokemon";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { PokeAPIUrl } from "./schemas";
import { pokeApiBaseUrl } from "#/config/pokeApiUrl";

// Set queryKey depend on url for proper indexing and pagination
export const pokemonsQueryOptions = (url: string = pokeApiBaseUrl) =>
  queryOptions({
    queryKey: ["pokemons", url],
    queryFn: () => fetchPokemonList({ data: { url } }),
    placeholderData: keepPreviousData,
  });

export const fetchPokemonList = createServerFn({ method: "GET" })
  .inputValidator(PokeAPIUrl)
  .handler(async ({ data }): Promise<PokemonPaginationResponse> => {
    const response = await fetch(data.url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
    }

    return await response.json();
  });
