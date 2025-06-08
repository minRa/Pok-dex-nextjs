# Pokédex - Original 151 Pokémon

A web app built with Next.js (App Router) that displays the original 151 Pokémon. You can browse, search, sort, and view details for each Pokémon.

## Features

- ✅ Server-side rendering (SSR) using Next.js App Router
- 🔍 Search by name or number
- 🔃 Sort by name or number (ascending/descending)
- 📄 Pagination (16 Pokémon per page)
- 📱 Responsive UI
- 🔗 Detail pages for each Pokémon
- 🌐 SEO-friendly with per-page metadata using `generateMetadata`

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PokéAPI

## How to Run

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/pokedex-app.git
   cd pokedex-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser.

## Project Structure

```
app/
  ├─ page.tsx               # Home page with search/sort bar and list
  ├─ pokemon/[id]/page.tsx  # Detail page for each Pokémon (with SEO metadata)
  └─ _components/           # UI components (Card, List, Pagination, etc.)

lib/
  └─ fetchPokemon.ts        # API logic to get Pokémon data

types/
  └─ pokemon.d.ts           # Type definitions
```

## Notes

- Data is fetched from [https://pokeapi.co](https://pokeapi.co).
- The UI is styled with Tailwind CSS.
- Uses debounced search and URL query params for a smooth UX.
- Metadata is automatically injected using `generateMetadata` for SEO.
