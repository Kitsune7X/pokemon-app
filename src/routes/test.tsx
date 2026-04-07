import { Button } from "#/components/ui/8bit/button";
import { fetchPokemonList } from "#/utils/pokemon.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";

// const pokemonsQuery = queryOptions({
//   queryKey: ["pokemons"],
//   queryFn: async () => await fetchPokemonList(),
// });

export const Route = createFileRoute("/test")({
  // loader: ({ context }) => context.queryClient.ensureQueryData(pokemonsQuery),
  component: RouteComponent,
});

export const getServerTime = createServerFn().handler(async () => {
  return new Date().toISOString();
});

function RouteComponent() {
  const getPokemons = useServerFn(fetchPokemonList);

  const result = useSuspenseQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
  });

  console.log(result);
  return (
    <div>
      <h2>Test route</h2>
      <Button
        variant="outline"
        onClick={async () => {
          const time = await getServerTime();
          console.log(time);
        }}
      >
        Click here!
      </Button>
    </div>
  );
}
