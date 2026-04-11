import * as z from "zod";

export const PokeAPIUrl = z.object({
  url: z.string(),
});

export const PokemonId = z.object({
  id: z.string(),
});
