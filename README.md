# Sales Dashboard (Next.js 15 + TypeScript + Tailwind)

Responsive dashboard demonstrating multiple Recharts visualizations with dynamic filtering. Built on Next.js 15 App Router, TypeScript, Tailwind CSS.

## Features
- Multiple chart types (bar, line, pie) with Recharts.
- Custom sales threshold filter.
- API route (`/api/sales`) serving sales data by year.
- Dashboard page rendering the chart component and controls.

## Project Structure
- `src/app/page.tsx` — Dashboard page with controls and chart.
- `src/components/organisms/SalesChart.tsx` — Recharts wrapper supporting chart switching and threshold line.
- `src/components/molecules/YearSelector.tsx` — Year toggle buttons.
- `src/app/api/sales/route.ts` — API route exposing sales data.
- `src/data/sales.ts` — Mocked sales dataset (used by API).

## Setup
```bash
npm install
npm run dev
# visit http://localhost:3000
```

## What was done
- Implemented an empty dashboard page and added the sales chart component with controls.
- Added multi-type Recharts chart (bar/line/pie) and a custom threshold input.
- Wired data fetching through a Next.js App Router API route instead of static imports.
- Documented setup and structure here.

## Live Demo & Repository

Live Deployment (Vercel): https://sales-project-psi.vercel.app/

GitHub Repository: https://github.com/AnkitSharma5304/Sales-Project

## Tech
- Next.js 15 (App Router), TypeScript
- Tailwind CSS
- Recharts
# Sales-Project
