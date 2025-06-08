import { SortAndSearchBar, PokemonList } from "./_components";

export const generateMetadata = () => ({
  title: "Pokédex | Explore All 151 Original Pokémon by Name, Type & ID",
  description:
    "Browse the original 151 Pokémon from the Kanto region. Sort, search, and view detailed stats, types, and images using this fast, SEO-optimized Pokédex.",
  keywords: [
    "Pokédex",
    "Pokémon",
    "original 151 Pokémon",
    "Kanto Pokémon",
    "search Pokémon",
    "Pokémon stats",
    "Pokémon types",
    "Next.js Pokédex",
    "Pokémon list",
  ],
});

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Pokédex</h1>
      <SortAndSearchBar />
      <PokemonList searchParams={params} />
    </main>
  );
}
