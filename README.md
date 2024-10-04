# RS3 Group Ironman Website

Website for the mmo runescape game mode group ironman. Project deployed on [Vercel](https://rs3-gim.vercel.app/).

## Getting Started

1. Clone the repository:

   ```nodejs
    git clone https://github.com/Endeyr/nextjs-template
   ```

2. Install dependencies:

   ```nodejs
    pnpm install
   ```

3. Run the development server:
   ```nodejs
   pnpm run dev
   ```
   The application will be available at http://localhost:3000.

## Scripts

- pnpm dev: Starts the development server.
- pnpm build: Builds the app for production.
- pnpm start: Runs the production build.
- pnpm lint: Runs ESLint to check for code quality and style issues.
- pnpm test: Runs the test suite using Jest.
- pnpm test:watch: Runs the test suite in watch mode, rerunning tests upon file changes.

## Dependencies

The project uses the following main dependencies:

- Next.js: A React framework for high-quality web applications.
- React: A JavaScript library for building user interfaces.
- Axios: A promise-based HTTP client for making API requests.
- React Hook Form: A library for managing forms in React with minimal re-rendering.
- SWR: A library for data fetching.
- Zod: A TypeScript-first schema declaration and validation library.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.

## Dev Dependencies

The development dependencies include tools and libraries to aid in development:

- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- ESLint: A tool for identifying and fixing problems in JavaScript code.
- Jest: A testing framework for JavaScript and TypeScript.
- Testing Library: A family of libraries to test UI components. 

## Project Structure

```bash
./
├── app/ # Nextjs root dir
├── components/ # Reusable React components
├── lib/ # Utility functions and helpers
├── schema/ # Zod schemas for react hook form
├── types/ # Global types
├── app/__test__/ # Jest test
├── app/globals.css # Main styling
├── app/layout.tsx # Providers and layout
└── app/page.tsx # Entry point for the App
```

## License

This project is licensed under the MIT License.
