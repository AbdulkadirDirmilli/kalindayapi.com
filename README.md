# Kalında Yapı - Emlak ve İnşaat

Kalında Yapı resmi web sitesi. Next.js 16 ile geliştirilmiştir.

## Teknolojiler

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma (SQLite/LibSQL)
- NextAuth.js

## Geliştirme

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Docker ile Deploy

```bash
docker compose up -d --build
```

## Veritabanı

```bash
npm run db:push    # Schema sync
npm run db:seed    # Seed data
npm run db:studio  # Prisma Studio
```
