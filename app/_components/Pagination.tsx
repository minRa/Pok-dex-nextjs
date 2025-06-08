"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: Props) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "number-asc";
  const search = searchParams.get("search") ?? "";

  const getPageUrl = (page: number) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    const params = new URLSearchParams({
      sort,
      search,
      page: String(safePage),
    });
    return `/?${params.toString()}`;
  };

  return (
    <div className="mt-6 flex justify-center gap-2">
      <Link
        href={getPageUrl(currentPage - 1)}
        className={`px-4 py-2 border rounded ${
          currentPage <= 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Previous
      </Link>

      <span className="px-4 py-2 bg-gray-200 rounded">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={getPageUrl(currentPage + 1)}
        className={`px-4 py-2 border rounded ${
          currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}
