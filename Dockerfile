FROM node:20-alpine AS builder
WORKDIR /app

# Sharp için gerekli bağımlılıklar
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Create uploads directories in builder (use install -d for Alpine compatibility)
RUN install -d public/uploads public/uploads/ilanlar public/uploads/videos public/uploads/thumbnails

RUN npx prisma generate
RUN npx prisma db push
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
COPY --from=builder /app/lib/generated ./lib/generated

# Create directory for SQLite database
RUN mkdir -p /app/prisma

EXPOSE 3001
CMD ["node", "server.js"]
