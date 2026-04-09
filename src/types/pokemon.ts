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

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonSheetResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}
