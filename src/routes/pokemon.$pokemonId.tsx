import { pokemonQueryOptions } from "#/utils/pokemon.functions";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "#/components/ui/8bit/badge";
import { Card, CardContent, CardHeader } from "#/components/ui/8bit/card";
import { Progress } from "#/components/ui/8bit/progress";
import { Spinner } from "#/components/ui/8bit/spinner";
import AppAlert from "#/components/AppAlert";
import { Separator } from "#/components/ui/8bit/separator";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "#/components/ui/8bit/avatar";
import "#/components/ui/8bit/styles/retro.css";
import PaginationApp from "#/components/PaginationApp";
import { useState } from "react";

export const Route = createFileRoute("/pokemon/$pokemonId")({
  component: PokemonSheet,
});

function PokemonSheet() {
  const [pokemonId, setPokemonId] = useState(Route.useParams().pokemonId);

  const { data: pokemon, error } = useQuery(pokemonQueryOptions(pokemonId));

  return (
    <div className="flex flex-col items-center gap-7">
      {error && <AppAlert title={error.message} />}

      <Card className="w-full sm:w-md retro pb-7">
        {/* Pokemon Header */}
        <CardHeader className="pb-4">
          <div className="flex sm:flex-row flex-col items-start gap-4">
            <Avatar className="size-20 sm:size-30" variant="retro" font="retro">
              <AvatarImage
                src={pokemon?.sprites.front_default}
                alt={pokemon?.name}
              />
              <AvatarFallback className="text-xl">
                <Spinner variant="diamond" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:mt-4">
                <h2 className="text-xl font-bold truncate uppercase">
                  {pokemon?.name}
                </h2>
                <Badge className="text-xs w-fit">{`No.${pokemon?.id}`}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stat Bar */}
          <div className="space-y-3">
            {pokemon?.stats.map((stat) => (
              <div className="space-y-1">
                <div className="flex sm:flex-row flex-col justify-between items-center">
                  <span className="text-sm font-medium text-yellow-500 uppercase">
                    {stat.stat.name}
                  </span>
                  <span className="text-xs text-muted-foreground retro">
                    {stat.base_stat}
                  </span>
                </div>

                <Progress
                  value={stat.base_stat}
                  variant="retro"
                  className="h-3"
                  progressBg="bg-yellow-500"
                />
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wide">
              Abilities
            </h3>
            <div className="space-y-2">
              {pokemon?.abilities.map((ability) => (
                <div
                  key={ability.ability.name}
                  className="flex sm:flex-row flex-col items-center justify-between py-2 px-3 bg-muted/30 border-2"
                >
                  <span className="text-xs uppercase">
                    {ability.ability.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <PaginationApp
        isIndex={false}
        previous={Math.max(1, +pokemonId - 1).toString()}
        next={(+pokemonId + 1).toString()}
        setUrl={setPokemonId}
      />
    </div>
  );
}

// TODO: Render Pokemon Sheet
