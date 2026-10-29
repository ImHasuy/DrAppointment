ARG TAG=20.18.0-alpine3.19
ARG PORT=3000

# 1. Alapfüggőségek és forráskód
FROM node:${TAG} AS prepare

USER node
WORKDIR /home/node/app

COPY --chown=node package*.json ./
RUN npm ci

COPY --chown=node . .

# 2. Alkalmazás fordítása (dist létrehozása)
FROM prepare AS build
RUN npm run build

# 3. Csak a production függőségek letöltése
FROM node:${TAG} AS dependencies

USER node
WORKDIR /home/node/app

COPY --chown=node package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# 4. Végső futtató réteg
FROM node:${TAG} AS production

ARG PORT
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=${PORT:-3000}

USER node
WORKDIR /home/node/app

# Csak a lefordított kódot és a production függőségeket másoljuk át
COPY --from=dependencies --chown=node /home/node/app/node_modules ./node_modules
COPY --from=build --chown=node /home/node/app/dist ./dist

EXPOSE ${PORT:-3000}

# Közvetlen node indítás a jobb process-kezelés és gyorsabb leállás érdekében
CMD ["node", "dist/main"]