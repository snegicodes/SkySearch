"use client";

export default function ScrollToSearch({ children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
