import { FullPokemon } from "../types";
import { getPokemonList } from "../lib";
import { Pagination } from "./Pagination";
import { PokemonCard } from "./PokemonCard";

const PAGE_SIZE = 16;

function sortPokemon(list: FullPokemon[], sort: string) {
  switch (sort) {
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case "number-desc":
      return list.sort((a, b) => b.id - a.id);
    case "number-asc":
    default:
      return list.sort((a, b) => a.id - b.id);
  }
}

export async function PokemonList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sortBy = searchParams.sort ?? "number-asc";
  const searchKeyword = (searchParams.search ?? "").toString().toLowerCase();
  const page = parseInt(
    Array.isArray(searchParams.page)
      ? searchParams.page[0] ?? "1"
      : searchParams.page ?? "1",
    10
  );

  const allPokemon: FullPokemon[] = await getPokemonList();

  const filteredList = allPokemon.filter(
    (p) =>
      p.name.toLowerCase().includes(searchKeyword) ||
      String(p.id).includes(searchKeyword)
  );

  const sortedList = sortPokemon(filteredList, sortBy.toString());
  const totalPages = Math.max(1, Math.ceil(sortedList.length / PAGE_SIZE));
  const paginated = sortedList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {paginated.length === 0 ? (
        <p className="text-center text-gray-600">No Pokémon found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {paginated.map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))}
        </div>
      )}
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
