# Pokemon Deck

A modern Pokemon deck viewer application built with Next.js and TypeScript. Browse through Pokemon cards, filter by types, and view image of each Pokemon.

TOTAL TIME SPENT: 3h37m

## Features

- Browse Pokemon cards with pagination
- Filter Pokemon by types
- Responsive design for all devices
- Fast and efficient data loading with React Query
- Modern UI components using ShadCN UI

## Technologies

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [@tanstack/react-query](https://tanstack.com/query) - Data fetching and caching
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [ShadCN UI](https://ui.shadcn.com) - Modern UI components
- [Pokedex Promise V2](https://github.com/PokeAPI/pokedex-promise-v2) - Pokemon API client
- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

### Development

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

Build the application:

```bash
bun run build
```

Start the production server:

```bash
bun start
```

## Project Structure

- `app/` - Next.js app router pages and layouts
- `apis/` - API client setup and configuration
- `components/` - Reusable UI components
- `hooks/` - Custom React hooks for state and data management
- `lib/` - Utility functions and shared logic
- `public/` - Static assets
- `types/` - TypeScript type definitions
