import * as z from "zod";

export const PokeAPIUrl = z.object({
  url: z.string(),
});
