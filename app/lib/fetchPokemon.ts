import { FullPokemon, PokemonDetail } from "../types";

const TOTAL_POKEMON = 151;
const ONE_HOUR = 3600;
const BASE_API = "https://pokeapi.co/api/v2/pokemon";

export async function fetchJSON<T>(
  url: string,
  cacheConfig?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    next: {
      revalidate: ONE_HOUR,
      tags: ["pokemon"],
    },
    ...cacheConfig,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// All 151 Pokémon list with better caching
export async function getPokemonList(): Promise<FullPokemon[]> {
  try {
    const response = await fetchJSON<{
      results: { name: string; url: string }[];
    }>(`${BASE_API}?limit=${TOTAL_POKEMON}`, {
      next: {
        revalidate: ONE_HOUR,
        tags: ["pokemon", "pokemon-list"],
      },
    });

    const pokemonDetails = await Promise.allSettled(
      response.results.map(async (item) => {
        const detail = await fetchJSON<PokemonDetail>(item.url, {
          next: {
            revalidate: ONE_HOUR,
            tags: ["pokemon", `pokemon-${item.name}`],
          },
        });
        return {
          id: detail.id,
          name: detail.name,
          types: detail.types.map((t) => t.type.name),
        };
      })
    );

    return pokemonDetails
      .filter(
        (result): result is PromiseFulfilledResult<FullPokemon> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);
  } catch (error) {
    console.error("Failed to fetch Pokemon list:", error);
    throw new Error("Unable to load Pokemon data");
  }
}

export async function getPokemonDetail(id: string): Promise<PokemonDetail> {
  try {
    return await fetchJSON<PokemonDetail>(`${BASE_API}/${id}`, {
      next: {
        revalidate: ONE_HOUR,
        tags: ["pokemon", `pokemon-${id}`],
      },
    });
  } catch (error) {
    console.error(`Failed to fetch Pokemon ${id}:`, error);
    throw new Error(`Unable to load Pokemon ${id}`);
  }
}
