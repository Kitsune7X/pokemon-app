import type {
  PokemonPaginationResponse,
  PokemonSheetResponse,
} from "#/types/pokemon";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { PokeAPIUrl, PokemonId } from "./schemas";
import { pokeApiBaseUrl } from "#/config/pokeApiUrl";

// Set queryKey depend on url for proper indexing and pagination
export const pokemonsQueryOptions = (url: string = pokeApiBaseUrl) =>
  queryOptions({
    queryKey: ["pokemons", url],
    queryFn: () => fetchPokemonList({ data: { url } }),
    placeholderData: keepPreviousData,
  });

export const pokemonQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon({ data: { id } }),
  });

export const fetchPokemonList = createServerFn({ method: "GET" })
  .inputValidator(PokeAPIUrl)
  .handler(async ({ data }): Promise<PokemonPaginationResponse> => {
    const response = await fetch(data.url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon list: ${response.statusText}`);
    }

    return await response.json();
  });

export const fetchPokemon = createServerFn({ method: "GET" })
  .inputValidator(PokemonId)
  .handler(async ({ data }): Promise<PokemonSheetResponse> => {
    const response = await fetch(`${pokeApiBaseUrl}/${data.id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
    }

    return await response.json();
  });
