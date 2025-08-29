FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json yarn.lock ./
COPY nx.json ./
COPY tsconfig.base.json ./


COPY apps/web/package*.json ./apps/web/
COPY apps/backend/package*.json ./apps/backend/


RUN yarn install --frozen-lockfile

COPY . .

# ========================================
# Frontend image
# ========================================
FROM base AS frontend-dev
EXPOSE 3000

# Start the development server
CMD ["yarn", "web:dev", "--host", "0.0.0.0"]

# ========================================
# backend image
# ========================================
FROM base AS backend-dev
RUN yarn install --frozen-lockfile

RUN yarn prisma:generate
RUN yarn prisma:migrate

EXPOSE 3001

# Start the development server
CMD ["yarn", "backend:dev", "--host", "0.0.0.0"]



