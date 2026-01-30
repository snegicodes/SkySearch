import Link from "next/link";

export default function FlightSearchPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-12 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to home
        </Link>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Flight Search
        </h1>
        <p className="mt-2 text-zinc-400">
          Search and compare flights. (Coming soon)
        </p>
      </div>
    </div>
  );
}
