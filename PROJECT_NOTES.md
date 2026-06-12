# Project Notes: Astrologer CRM

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS Modules & Global variables) - chosen specifically over Tailwind to demonstrate raw CSS skills and implement a highly customized, premium "mystic" design system.
- **Database**: SQLite with Prisma ORM. SQLite was chosen over Postgres to ensure the reviewer can run the app immediately with zero configuration (no Docker or external DB required).
- **Icons**: `lucide-react`

## Architecture
- Built using **React Server Components (RSC)** where appropriate to minimize client JavaScript bundle size.
- State mutations (like adding a client) use Next.js **Server Actions** (`src/app/actions/`) directly interacting with Prisma, completely bypassing the need for a separate REST API layer. This represents the most modern Next.js paradigm.

## Standout Features
- **Astrology-First Data**: Tracks Date, Time, and Place of birth natively.
- **Lagna Chart Visualization**: A dedicated North Indian style Birth Chart (Kundli) SVG visualization on the client profile page. It represents a real-world use case for an astrologer CRM.
- **Premium UI**: Uses a glassmorphism and deep blue/gold gradient aesthetic perfectly suited to the domain.

## Assumptions
- An astrologer needs to rapidly add clients with exact birth details.
- Authentication/Authorization was omitted to focus on core domain logic and ease of evaluation.
- Birth chart planet placement is currently mocked for the UI demonstration, as a real Ephemeris calculation algorithm is beyond the scope of a short UI/CRUD project.

## Future Improvements
- Implement Swiss Ephemeris integration to calculate real planetary positions based on DOB/TOB/POB.
- Add a calendar integration (Google Calendar/Cal.com) for consultation scheduling.
- Add authentication (NextAuth) for multi-user support (multiple astrologers using the same CRM).
