export type PokemonTypeEntry = {
  slot: number;
  type: { name: string; url: string };
};

export type FullPokemon = {
  id: number;
  name: string;
  types: string[];
};

export type BasicPokemon = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  id: number;
  name: string;
  types: PokemonTypeEntry[];
  height: number;
  weight: number;
  sprites: { front_default: string | null };
};
