# Astrologer CRM

A premium, dark-themed CRM tailored for Astrologers to manage clients, consultations, and view birth charts.

## Features
- Manage clients with astrology-specific fields (DOB, TOB, Place of Birth).
- Visually appealing North Indian style Birth Chart (Kundli) UI component.
- Next.js Server Actions with an SQLite database for blazing fast operations.
- Highly customized "mystic" CSS design system.

## Getting Started

This project uses SQLite, so there is no database setup required other than installing dependencies.

1. Install dependencies:
   ```bash
   npm install
   ```

2. The SQLite database is already initialized (`dev.db`). If you need to reset it, run:
   ```bash
   npx prisma db push
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deliverables
- `PROJECT_NOTES.md` - Tech stack, architecture, and future scope.
- `AI_USAGE.md` - Declaration of AI assistance.
- Video Demo (To be recorded and linked by candidate).
