export interface PokemonSummary {
  name: string;
  url: string;
}

export interface Pokemon extends PokemonSummary {
  sprite_url: string;
}

export interface PokemonPaginationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}
