FROM node:20-alpine AS builder
WORKDIR /app

# Sharp için gerekli bağımlılıklar
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Create empty uploads directory (will be replaced by volume mount)
RUN mkdir -p public/uploads

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# Sharp ve diğer native modüller için gerekli bağımlılıklar
RUN apk add --no-cache libc6-compat

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create directory for SQLite database
RUN mkdir -p /app/prisma

EXPOSE 3001
CMD ["node", "server.js"]
