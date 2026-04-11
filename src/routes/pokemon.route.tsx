import { createFileRoute, Outlet } from "@tanstack/react-router";

import "#/components/ui/8bit/styles/retro.css";
import { pokemonsQueryOptions } from "#/utils/pokemon.functions";

export const Route = createFileRoute("/pokemon")({
  component: PokemonRoute,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(pokemonsQueryOptions());
  },
});

function PokemonRoute() {
  return (
    <section className="w-full px-4 py-16 md:py-24">
      <Outlet />
    </section>
  );
}
