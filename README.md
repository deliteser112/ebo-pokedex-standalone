# Pokémon List App

A simple web application built with Angular that displays a list of Pokémon, allows searching, sorting, pagination, and viewing detailed information about each Pokémon. The app uses the PokéAPI to fetch data.

## Features

- Display a list of Pokémon with their details.
- Search Pokémon by name.
- Sort Pokémon by default order or by Pokédex order.
- Pagination support to browse through the Pokémon list.
- View detailed information for each Pokémon.
- Responsive design.

## Technologies Used

- Angular - Frontend framework
- Angular CDK - Virtual scrolling
- RxJS - Reactive programming
- TypeScript - Superset of JavaScript
- SCSS - CSS preprocessor for styling
- PokéAPI - Free Pokémon API

## Setup Instructions

1. Clone the repository:

```bash
git https://github.com/deliteser112/ebo-pokedex-standalone.git
cd ebo-pokedex-standalone
```

2. Install dependencies:

Make sure you have Node.js and npm installed. Then run:

```bash
npm install
```

3. Run the development server:

```bash
npm start
```

The application will be served at http://localhost:4200/. Open it in your browser.

4. Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the dist/ directory.

## Usage

- **Search Pokémon:** Enter a Pokémon name in the search bar to filter the list.
- **Sort Pokémon:** Use the dropdown to sort Pokémon by default order or by Pokédex order.
- **Pagination:** Navigate through the Pokémon list using the "Previous" and "Next" buttons.
- **View Details:** Click on a Pokémon card to view detailed information.

## Development

### Commands

- Start development server: `npm start`
- Run unit tests: `npm test`
- Run end-to-end tests: `npm run e2e`
- Build for production: `npm run build`
