import { SortAndSearchBar, PokemonList } from "./_components";

export const generateMetadata = () => ({
  title: "Pokédex | Original 151 Pokémon",
  description:
    "Explore the original 151 Pokémon with names, types, and images.",
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
