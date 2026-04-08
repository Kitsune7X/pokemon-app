import type { PokemonSummary } from "#/types/pokemon";
import { createFileRoute, Link } from "@tanstack/react-router";

import AppAlert from "#/components/AppAlert";
import PaginationApp from "#/components/PaginationApp";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "#/components/ui/8bit/avatar";
import { Badge } from "#/components/ui/8bit/badge";
import { Button } from "#/components/ui/8bit/button";
import { Card, CardContent } from "#/components/ui/8bit/card";
import { Spinner } from "#/components/ui/8bit/spinner";
import "#/components/ui/8bit/styles/retro.css";
import { toast } from "#/components/ui/8bit/toast";
import { pokeApiBaseUrl } from "#/config/pokeApiUrl";
import { pokemonsQueryOptions } from "#/utils/pokemon.functions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/pokemon/")({
  component: PokemonPage,
});

function PokemonPage() {
  const [url, setUrl] = useState(pokeApiBaseUrl);

  const { data, error } = useQuery(pokemonsQueryOptions(url));

  const pokemons = data?.results ?? [];

  return (
    <>
      {error && <AppAlert title={error.message} />}

      {data ? (
        <div>
          <div className="mb-10">
            <PaginationApp
              previous={data.previous}
              next={data.next}
              setUrl={setUrl}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-1 md:max-w-4xl xl:max-w-6xl mx-auto">
            {pokemons.map((pokemon) => (
              <PokemonCard pokemon={pokemon} key={pokemon.name} />
            ))}
          </div>
          <div className="mt-20">
            <PaginationApp
              previous={data.previous}
              next={data.next}
              setUrl={setUrl}
            />
          </div>
        </div>
      ) : (
        !error && toast("Loading...")
      )}
    </>
  );
}

function PokemonCard({ pokemon }: { pokemon: PokemonSummary }) {
  const pokemonIdMatch = pokemon.url.match(/\/(\d+)\//);

  const pokemonId = pokemonIdMatch?.[1] ?? null;

  const spritesUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Card key={pokemon.name}>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="flex items-center mr-auto gap-7 sm:gap-4">
          <Avatar className="size-20" variant="pixel">
            {spritesUrl && <AvatarImage alt={pokemon.name} src={spritesUrl} />}
            <AvatarFallback>{<Spinner variant="diamond" />}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 items-start">
            <Badge>{`No.${pokemonId}`}</Badge>
            <p className="retro font-bold text-xs">
              {pokemon.name.toUpperCase()}
            </p>
          </div>
        </div>

        <Button className="w-full" variant="outline" asChild>
          <Link to="/pokemon/$name" params={{ name: pokemon.name }}>
            Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
