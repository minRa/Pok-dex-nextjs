"use client";

import { useDebounce } from "../hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export function SortAndSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "number-asc");

  const debouncedSearch = useDebounce(search, 300);

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    }

    params.set("sort", sort);
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  }, [debouncedSearch, sort, router]);

  useEffect(() => {
    updateUrl();
  }, [debouncedSearch, sort, updateUrl]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or id"
        className="px-4 py-2 border rounded w-full sm:w-64"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="number-asc">Number ↑</option>
        <option value="number-desc">Number ↓</option>
        <option value="name-asc">Name A → Z</option>
        <option value="name-desc">Name Z → A</option>
      </select>
    </div>
  );
}
