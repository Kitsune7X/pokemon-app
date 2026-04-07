import type { PokemonSummary } from "#/types/pokemon";
import { createFileRoute } from "@tanstack/react-router";

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
import "#/components/ui/8bit/styles/retro.css";
import { toast } from "#/components/ui/8bit/toast";
import { pokemonsQueryOptions } from "#/utils/pokemon.functions";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/pokemon")({
  component: PokemonPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(pokemonsQueryOptions());
  },
});

function PokemonPage() {
  const { data, error } = useSuspenseQuery(pokemonsQueryOptions());

  const pokemons = data.results;
  // console.log(pokemons);

  return (
    <section className="w-full px-4 py-16 md:py-24">
      {error && <AppAlert title={error.message} />}

      {pokemons.length > 0 ? (
        <div>
          <div className="mb-10">
            <PaginationApp previous={data.previous} next={data.next} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-1 md:max-w-4xl xl:max-w-6xl mx-auto">
            {pokemons.map((pokemon) => (
              <PokemonCard pokemon={pokemon} key={pokemon.name} />
            ))}
          </div>
          <div className="mt-20">
            <PaginationApp previous={data.previous} next={data.next} />
          </div>
        </div>
      ) : (
        !error && toast("Loading...")
      )}

      {/* Debug button */}
      {/* <Button
        onClick={async () => {
          const z = await queryClient.fetchQuery({
            queryKey: ["pokemons"],
            queryFn: () => fetchPokemonList({ data: { url: `${data.next}` } }),
          });
          console.log(z);
        }}
      >
        DEBUG BUTTON!
      </Button> */}
    </section>
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
            <AvatarFallback>{pokemon.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 items-start">
            <Badge>{`No.${pokemonId}`}</Badge>
            <p className="retro font-bold text-xs">
              {pokemon.name.toUpperCase()}
            </p>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          Details
        </Button>
      </CardContent>
    </Card>
  );
}

// TODO: Refactor this to use Query for pagination
