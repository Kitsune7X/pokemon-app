import type {
  PokemonPaginationResponse,
  PokemonSummary,
} from "#/types/pokemon";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const fetchPokemonList = createServerFn().handler(
  async (): Promise<PokemonPaginationResponse> => {
    const response = await fetch(process.env.POKE_API_PAGINATION_URL as string);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
    }

    return await response.json();
  },
);

export const Route = createFileRoute("/pokemon")({
  component: PokemonPage,
  loader: async (): Promise<{
    pokemons: PokemonSummary[];
    error: string | null;
  }> => {
    try {
      const pokemonData = await fetchPokemonList();
      return { pokemons: pokemonData.results, error: null };
    } catch (error) {
      console.error("Error fetching pokémon list:", error);
      return { pokemons: [], error: "Failed to load Pokémon" };
    }
  },
});

function PokemonPage() {
  const { pokemons, error } = Route.useLoaderData();

  return (
    <div>
      {error && <div>{error}</div>}

      {pokemons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.name} />
          ))}
        </div>
      ) : (
        !error && <div>Loading...</div>
      )}
    </div>
  );
}

function PokemonCard({ pokemon }: { pokemon: PokemonSummary }) {
  const pokemonIdMatch = pokemon.url.match(/\/(\d+)\//);

  const pokemonId = pokemonIdMatch?.[1] ?? null;

  const spritesUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  // console.log(spritesUrl);

  return (
    <div>
      <img src={spritesUrl} className="h-40 object-cover" />
      <h3>{pokemon.name}</h3>
      <p>{pokemon.url}</p>
    </div>
  );
}
