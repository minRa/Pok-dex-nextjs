// app/app/pokemon/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPokemonDetail } from "../../lib";

interface PokemonDetailPageProps {
  params: { id: string };
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { id } = await params;
  const data = await getPokemonDetail(id);

  if (!data || !data.name) notFound();

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold capitalize mb-4">{data.name}</h1>
      {data.sprites?.front_default ? (
        <Image
          src={data.sprites.front_default}
          alt={data.name}
          width={200}
          height={200}
          className="mx-auto"
          priority
        />
      ) : (
        <div className="w-[200px] h-[200px] mx-auto bg-gray-200 flex items-center justify-center">
          <span className="text-sm text-gray-500">No image available</span>
        </div>
      )}
      <p className="mt-2 text-gray-600">Height: {data.height}</p>
      <p className="mt-2 text-gray-600">Weight: {data.weight}</p>
      <div className="mt-4 flex justify-center flex-wrap gap-2">
        {data.types.map((type) => (
          <span
            key={type.type.name}
            className="px-3 py-1 rounded-full bg-gray-200 text-sm capitalize"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
