# Audio File Hosting App

## Run with docker

To run the dev server for your app, use:

```sh
docker compose up
```

## Run locally

Run Db:

```sh
docker compose up postgress
```

Install dependencies:

```sh
yarn install
```

Start Backend:

```sh
yarn prisma:generate
yarn backend:dev
```

Start Frontend:

```sh
yarn web:dev
```

#### Frontend URL: `http://localhost:3000`

#### Backend endpoint: `http://localhost:3001`
