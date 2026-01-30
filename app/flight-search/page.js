import Link from "next/link";
import Image from "next/image";

const LOGO_URL =
  "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762369/spotter/logo.png";
const LOGO_DARK_URL =
  "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762760/spotter/logoDark.png";

export default function FlightSearchPage() {
  return (
    <div className="min-h-screen bg-transparent px-4 py-12 text-[var(--foreground)]">
      <header className="relative z-10 mb-8 flex items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src={LOGO_URL}
            alt="SkySearch"
            width={180}
            height={42}
            className="h-10 w-auto sm:h-12 dark:hidden"
          />
          <Image
            src={LOGO_DARK_URL}
            alt="SkySearch"
            width={180}
            height={42}
            className="h-10 w-auto sm:h-12 hidden dark:block"
          />
        </Link>
      </header>
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--foreground)]/70 transition-colors hover:text-[var(--foreground)]"
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
        <h1 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
          Flight Search
        </h1>
        <p className="mt-2 text-[var(--foreground)]/70">
          Search and compare flights. (Coming soon)
        </p>
      </div>
    </div>
  );
}
