# PanjatanTech Website – Plan

## Technical Architecture

| Layer              | Technology                                   |
|--------------------|----------------------------------------------|
| Framework          | Next.js 15 (App Router) + TypeScript         |
| Styling            | Tailwind CSS + Design Tokens                 |
| Animation          | Framer Motion                                |
| CMS                | Sanity                                       |
| Documentation      | MDX + Contentlayer / custom pipeline         |
| API Explorer       | Custom React component or Scalar             |
| Authentication     | Clerk (Developer Portal)                     |
| Search             | Algolia DocSearch                            |
| Hosting            | Vercel                                       |
| CDN & Security     | Cloudflare                                   |
| Analytics          | PostHog + Google Analytics 4                 |
| Forms & Scheduling | Resend / Formspree + Cal.com                 |
| Chat               | Intercom or custom AI chat (Phase 6)         |

**Implementation note:** the project was scaffolded with Tailwind CSS v4, which defines design tokens in CSS (`@theme` in `src/app/globals.css`) instead of `tailwind.config.ts`. The tokens are the single source of truth for color, type, spacing and radius.

## Design System
- Design tokens in `src/app/globals.css` (`@theme`)
- Component library in `src/components/ui`, built on Radix UI primitives
- Logo and brand assets version-controlled in `public/brand`

## Delivery Phases

| Phase | Scope                                       | Duration  | Priority |
|-------|---------------------------------------------|-----------|----------|
| 1     | Design System + Home + Global Layout        | 2 weeks   | Critical |
| 2     | Products + Pricing + Contact                | 2 weeks   | Critical |
| 3     | Developers Portal (Docs + API Explorer)     | 3 weeks   | Critical |
| 4     | Solutions, About, Blog, Careers             | 2 weeks   | High     |
| 5     | Polish, Performance, Accessibility, SEO     | 1.5 weeks | Critical |
| 6     | Analytics, Chat, Exit-intent, Soft Launch   | 1 week    | High     |

## Risk Mitigation
- Design system is built first to prevent visual debt
- Content and design work run in parallel with engineering
- Weekly design + engineering sync meetings
- Accessibility and performance audits at the end of every phase

## Ownership

| Role                     | Responsibility                       |
|--------------------------|--------------------------------------|
| Senior Manager / Product | Prioritization, content approval     |
| Design Lead              | Design system + visual QA            |
| Frontend Lead            | Architecture + core implementation   |
| Developer Advocate       | Documentation accuracy + DX          |
| QA                       | Accessibility + performance          |
