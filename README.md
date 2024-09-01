# Expense Manager

A web application to manage expenses, based on the script I have made to categorize my monthly expenses, [expense_categorizer](https://github.com/jorbush/expense_categorizer), but with a better UI and more features.

## Run development server

```bash
npm run dev
```

## Run production server

```bash
npm run build
npm run preview
```

## Run Docker

Run the web application in a Docker container:

```bash
docker-compose up --build
```

## Run tests

This project uses [Vitest](https://vitest.dev/) for testing:

```bash
npm run test
```

## Formatting

This project uses [Prettier](https://prettier.io/) for code formatting:
```bash
npm run format
```

## Linting
Uses [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting:
```bash
npx oxlint
```
