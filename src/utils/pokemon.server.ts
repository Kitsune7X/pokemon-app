import { queryOptions } from "@tanstack/react-query";
import { fetchPokemonList } from "./pokemon.functions";

export const pokemonsQueryOptions = () =>
  queryOptions({
    queryKey: ["pokemons"],
    queryFn: () => fetchPokemonList(),
  });
