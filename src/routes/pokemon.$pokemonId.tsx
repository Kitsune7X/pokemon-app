import { pokemonQueryOptions } from "#/utils/pokemon.functions";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Card, CardContent, CardHeader } from "#/components/ui/8bit/card";
import { Progress } from "#/components/ui/8bit/progress";

export const Route = createFileRoute("/pokemon/$pokemonId")({
  component: PokemonSheet,
});

function PokemonSheet() {
  const pokemonId = Route.useParams().pokemonId;

  const { data, error } = useQuery(pokemonQueryOptions(pokemonId));

  console.log(data);

  return <div>{`Hello ${pokemonId}`}</div>;
}
