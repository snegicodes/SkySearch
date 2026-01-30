import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Moving grid background */}
      <div className="grid-bg" aria-hidden />
      <div
        className="hero-orb pointer-events-none"
        style={{ top: "30%", left: "50%" }}
        aria-hidden
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight sm:text-xl"
        >
          <span className="bg-gradient-to-r from-[var(--skysearch-cyan)] to-[var(--skysearch-purple)] bg-clip-text text-transparent">
            SkySearch
          </span>
          <svg
            className="h-5 w-5 text-[var(--skysearch-cyan)] sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/flight-search"
            className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-all hover:border-[var(--skysearch-cyan)]/40 hover:bg-[var(--skysearch-cyan)]/10 sm:px-5"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 pb-20 pt-8 text-center sm:px-6 md:min-h-[calc(100vh-6rem)] md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--skysearch-cyan)] opacity-90 sm:text-base">
            Flight search, reimagined
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-[var(--foreground)]">Find your next</span>
            <br />
            <span className="bg-gradient-to-r from-[var(--skysearch-cyan)] via-[var(--skysearch-purple)] to-[var(--skysearch-blue)] bg-clip-text text-transparent">
              destination
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-base text-zinc-400 sm:text-lg md:mb-12 md:text-xl">
            Compare prices, track deals, and book flights across hundreds of
            airlines—all in one place. Powered by real-time data.
          </p>
          <Link
            href="/flight-search"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--skysearch-cyan)] to-[var(--skysearch-purple)] px-8 py-4 text-base font-semibold text-black shadow-[0_0_40px_var(--skysearch-glow)] transition-all hover:opacity-90 hover:shadow-[0_0_50px_var(--skysearch-glow)] active:scale-[0.98] sm:text-lg"
          >
            Get Started
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
