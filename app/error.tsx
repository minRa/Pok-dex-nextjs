"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-10 text-red-600">
      <h2 className="text-xl font-bold">
        Something went wrong! - {error.message}
      </h2>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-500"
      >
        Try again
      </button>
    </div>
  );
}
