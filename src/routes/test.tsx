import { Button } from "#/components/ui/8bit/button";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

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
