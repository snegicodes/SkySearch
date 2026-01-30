"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToSearch from "./components/ScrollToSearch";
import SearchForm from "@/src/components/SearchForm";

const LOGO_URL =
  "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762369/spotter/logo.png";
const LOGO_DARK_URL =
  "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762760/spotter/logoDark.png";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero section wrapper with backgrounds */}
      <div className="relative">
        {/* Moving grid background - only in hero */}
        <div className="grid-bg" aria-hidden />
        <div
          className="hero-orb pointer-events-none"
          style={{ top: "30%", left: "50%" }}
          aria-hidden
        />

        {/* Header */}
        <motion.header
          className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8 lg:px-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight sm:text-xl"
          >
            <Image
              src={LOGO_URL}
              alt="SkySearch"
              width={210}
              height={48}
              className="h-12 w-auto sm:h-14 dark:hidden"
              priority
            />
            <Image
              src={LOGO_DARK_URL}
              alt="SkySearch"
              width={210}
              height={48}
              className="h-12 w-auto sm:h-14 hidden dark:block"
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ScrollToSearch className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-all hover:border-[var(--teal)]/30 hover:bg-[var(--teal-muted)] sm:px-5">
              Get Started
            </ScrollToSearch>
          </div>
        </motion.header>

        {/* Hero section */}
        <section className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 pb-20 pt-8 text-center sm:px-6 md:min-h-[calc(100vh-6rem)] md:px-8 lg:px-12">
          <motion.div
            className="mx-auto max-w-4xl"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.p
              className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--teal)] opacity-90 sm:text-base"
              variants={fadeUp}
            >
              Flight search, reimagined
            </motion.p>
            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              variants={fadeUp}
            >
              <span className="text-[var(--foreground)]">Find your next</span>
              <br />
              <span className="bg-gradient-to-r from-[var(--teal)] via-[var(--teal-light)] to-[var(--teal-dark)] bg-clip-text text-transparent">
                destination
              </span>
            </motion.h1>
            <motion.p
              className="mx-auto mb-10 max-w-xl text-base text-[var(--foreground)]/70 sm:text-lg md:mb-12 md:text-xl"
              variants={fadeUp}
            >
              Compare prices and track deals on flights from hundreds of
              airlines, all in one place. Powered by real-time data.
            </motion.p>
            <motion.div variants={fadeUp}>
              <ScrollToSearch className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--teal)] to-[var(--teal-dark)] px-8 py-4 text-base font-semibold text-white shadow-[0_0_24px_var(--teal-glow)] transition-all hover:opacity-90 hover:shadow-[0_0_32px_var(--teal-glow)] active:scale-[0.98] sm:text-lg">
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
              </ScrollToSearch>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Search section - separate from hero backgrounds */}
      <motion.section
        id="search-section"
        className="relative z-10 bg-[var(--background)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <SearchForm />
      </motion.section>
    </div>
  );
}
