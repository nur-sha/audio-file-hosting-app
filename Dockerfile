FROM node:20-alpine AS base
WORKDIR /apps

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

WORKDIR /apps

EXPOSE 3000

# Start the development server
CMD ["yarn", "web:dev", "--host", "0.0.0.0"]

# ========================================
# backend image
# ========================================
FROM base AS backend-dev
#RUN yarn install --frozen-lockfile
WORKDIR /apps

COPY apps/backend/prisma .apps/backend/prisma/


RUN yarn prisma:generate

EXPOSE 3001

# Start the development server
CMD ["yarn", "backend:dev", "--host", "0.0.0.0"]





