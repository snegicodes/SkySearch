# ✈️ SkySearch

**SkySearch** is a modern flight search and comparison web app designed to help users explore flight options with speed, clarity and confidence.  
It focuses on real-world usability: fast search, meaningful filters, visual price insights and effortless comparison.

---

## 🌍 What You Can Do

- Search flights by **origin, destination, dates, passengers and cabin class**
- Browse results in a clean, readable layout
- Filter and sort results instantly
- Understand pricing trends at a glance
- Compare flights side by side before booking
- Use comfortably on **mobile and desktop**

---

## ✨ Core Features

### 🔎 Flight Search & Results
A streamlined search experience that returns clear flight cards showing:
- Airline and schedule
- Total duration and number of stops
- Price with clean formatting

Results update instantly as the search or filters change.

---

### 🎛 Filtering & Sorting
Refine results using:
- Number of stops
- Price range
- Airlines

Sorting options make it easy to focus on what matters most — cost, speed, or overall balance.

---

### 📊 Price Trend Graph
An interactive price graph visualizes how flight prices vary across departure times.  
The graph stays in sync with active filters and sorting, helping users quickly spot better-value options.

---

### 🔁 Flight Comparison
Select up to two flights and compare them across key criteria:
- Price
- Duration
- Stops
- Departure and arrival times

Comparison works seamlessly across scrolling and screen sizes.

---

### 📱 Responsive Design
Built mobile-first with:
- Collapsible filters and drawers on small screens
- Persistent sidebars and tables on desktop
- Smooth transitions for a polished feel

---

## 🍒 Cherry-on-Top Enhancements

These features go beyond the basics to improve decision-making and overall experience.

### ⭐ Smart Sorting Presets
One-tap sorting options:
- **Best** – a balanced choice considering both price and duration
- **Cheapest** – lowest fare first
- **Fastest** – shortest travel time first

The active sort is always visible so users understand how results are ranked.

---

### 💡 Price Confidence Indicator
Each flight includes a small indicator that labels the price as:
- **Low for this route**
- **Average**
- **High**

This gives immediate context and helps users judge whether a fare is actually good relative to other options.

---

### 🆚 Enhanced Compare Mode
The comparison view highlights:
- Best price
- Fastest option
- Fewest stops

Visual cues make trade-offs obvious without requiring deep analysis.

---

### 🔌 Adapter Pattern for Flight APIs

- **Single domain shape** — The app depends on one **Flight** shape (id, airline, price, stops, duration, departure/arrival). No UI or logic is tied to a specific provider.
- **Adapter layer** — Amadeus responses are normalized in `src/api/adaptFlight.js` into that shape. The API route always returns `{ flights: Flight[] }`, whether data comes from Amadeus or the mock.
- **Switching providers** — To use another provider (e.g. Skyscanner, Sabre), add a new fetcher and a new adapter that maps that API's response to the same Flight shape. The route calls the new provider; UI, filters, and comparison logic stay unchanged.

---

## 🛠 Tech Stack (At a Glance)

- **Next.js** & **React**
- **MUI** and **Tailwind CSS**
- **Zustand** for state management
- **Recharts** for data visualization
- **Amadeus API** with a mock fallback

---

