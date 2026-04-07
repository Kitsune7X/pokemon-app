import * as z from "zod";
import { createEnv } from "@t3-oss/env-core";

export const PokeAPIUrl = z.object({
  url: z.string(),
});

export const env = createEnv({
  server: {
    POKE_API_URL: z.string(),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
