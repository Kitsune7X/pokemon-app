import type { PokemonPaginationResponse } from "#/types/pokemon";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { PokeAPIUrl } from "./schemas";

const pokeApiBaseUrl = "https://pokeapi.co/api/v2/pokemon";
export const pokemonsQueryOptions = (url: string = pokeApiBaseUrl) =>
  queryOptions({
    queryKey: ["pokemons"],
    queryFn: () => fetchPokemonList({ data: { url } }),
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
