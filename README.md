# 🪐 Humara Pandit — Astrologer CRM

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://astrologer-crm-lac.vercel.app)

A full-stack, production-ready **Customer Relationship Management (CRM)** system built specifically for professional astrologers. Manage clients, schedule consultations, track payments, and generate Vedic birth charts — all in one premium dark-themed dashboard.

🔗 **Live Demo:** [astrologer-crm-lac.vercel.app](https://astrologer-crm-lac.vercel.app)

---

## ✨ Features

### 📊 Dashboard
- Live stats: Total Clients, Today's Readings, Active Remedies, Monthly Revenue (₹)
- Upcoming consultations for the day with client name & time
- Weekly consultation bar chart (Recharts)
- Quick-access floating action button

### 👤 Client Management
- Full client directory with search & filter by zodiac sign / consultation type
- Add new clients via modal: Name, DOB, Birth Time, Birth Place, Phone, Email
- Astrological details: Zodiac Sign, Sun Sign, Moon Sign, Rising Sign
- Clickable rows → opens detailed Client Profile

### 🪐 Client Profile
- Birth details panel (DOB, time, place)
- Sun ☀️ / Moon 🌙 / Rising sign badges
- Full consultation history timeline
- Notes section for the astrologer
- Recommended remedies section
- **Vedic Lagna (Birth) Chart** — deterministically unique per client based on their name seed
- Planet legend: `Su · Mo · Ma · Me · Ju · Ve · Sa · Ra · Ke`

### 🗓️ Consultations
- Calendar view with highlighted consultation dates
- Day-wise consultation list with client name, type & time
- **Mark as Completed** button for scheduled sessions
- Schedule new consultations via modal

### 💊 Remedies
- Track active remedies per client (Gemstone, Mantra, Puja, Fasting)
- Filter tabs: All | Gemstone | Mantra | Puja | Fasting
- Mark remedies as completed

### 💰 Payments & Revenue
- Revenue cards: **Total Revenue**, **This Month**, **Pending Payments**
- Full transaction history table
- **Record new payment** via floating `+` button (modal with client, amount, service, status, date)
- **Mark Paid** button on unpaid rows — instantly updates revenue cards

### 📈 Reports & Analytics
- Zodiac Distribution (Pie Chart)
- Revenue by Service (Bar Chart)
- Client Growth over months (Line Chart)

### ⚙️ Settings
- Theme toggle (Dark / Light)
- Profile configuration

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS + CSS Modules |
| Database | SQLite |
| ORM | [Prisma](https://www.prisma.io/) |
| Charts | [Recharts](https://recharts.org/) |
| Calendar | [react-calendar](https://github.com/wojtekmaj/react-calendar) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Inter + Cinzel (Google Fonts) |
| Hosting | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/vaibhav3960-coder/astrologer-crm.git
cd astrologer-crm

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── actions/          # Server Actions (clients, consultations, payments, remedies)
│   ├── clients/          # Client list & profile pages
│   ├── consultations/    # Consultation calendar page
│   ├── payments/         # Revenue & payments page
│   ├── remedies/         # Remedies tracker page
│   ├── reports/          # Analytics & charts page
│   ├── settings/         # Settings page
│   ├── layout.tsx        # Root layout with sidebar & header
│   └── page.tsx          # Dashboard
├── components/
│   ├── clients/          # AddClientModal, BirthChart, ClientsDataTable
│   ├── consultations/    # ConsultationsView, NewConsultationModal, CompleteConsultationButton
│   ├── dashboard/        # DashboardChart
│   ├── layout/           # Sidebar, Header, ThemeProvider, FloatingActionButton
│   ├── payments/         # AddPaymentModal, MarkPaidButton
│   ├── remedies/         # RemediesFilterableList, AddRemedyModal
│   └── reports/          # ReportsCharts
prisma/
├── schema.prisma         # Database schema
└── seed.ts               # Sample data seeder
```

---

## 🎨 Design Highlights

- **Dark mode first** — premium deep navy + gold (`#f59e0b`) color palette
- **Glassmorphism** cards with subtle backdrop blur
- **Cinzel** typeface for headings — gives an authentic astrological feel
- Smooth hover animations and micro-interactions throughout
- Fully responsive layout

---

## 📸 Screenshots

> Dashboard, Client Profile with Lagna Chart, Payments Page, Reports Analytics

---

## 👨‍💻 Author

**Vaibhav Chaudhary**
- GitHub: [@vaibhav3960-coder](https://github.com/vaibhav3960-coder)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
