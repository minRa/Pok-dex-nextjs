import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  types: string[];
};

export function PokemonCard({ id, name, types }: Props) {
  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer text-center">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          width={96}
          height={96}
          className="mx-auto"
        />
        <div className="text-gray-500 text-sm">#{id}</div>
        <div className="capitalize font-semibold text-lg">{name}</div>
        <div className="text-blue-500 text-xs">{types.join(", ")}</div>
      </div>
    </Link>
  );
}
