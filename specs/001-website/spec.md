# PanjatanTech Website – Specification

**Version:** 1.0 · **Date:** 2026-10-14 · **Owner:** Senior Manager & Development Head
Constitution: `.specify/memory/constitution.md`

## Product Vision
A high-performance marketing + developer portal website that positions PanjatanTech as a premium AI infrastructure and tools company.

## Primary Goals
- Convert visitors into free-tier users and qualified demo requests
- Serve as the single source of truth for product documentation and developer resources
- Establish strong technical credibility and brand authority

## Target Audiences
1. Individual developers and indie hackers
2. Engineering teams at startups
3. Enterprise technical decision-makers (CTOs, VPs of Engineering, AI leads)

## Key Pages & Requirements

| Page            | Must-Have Features                                                            | Success Metrics                   |
|-----------------|-------------------------------------------------------------------------------|-----------------------------------|
| Home            | Hero with dual CTA, product overview, social proof, how-it-works, final CTA   | Bounce rate < 40%, CTA click > 8% |
| Products        | Filterable product cards, product detail pages with live demos                | Time on page > 2 minutes          |
| Developers      | Full documentation, interactive API explorer, SDK downloads, code examples    | Docs engagement rate > 60%        |
| Pricing         | Clear tiers, feature comparison table, annual/monthly toggle, enterprise CTA  | Pricing page conversion > 4%      |
| Solutions       | Persona and industry-based pages                                              | Qualified lead rate               |
| About           | Mission, team, timeline, values                                               | Brand trust signals               |
| Blog / Insights | Technical articles, case studies, release notes                               | Organic traffic growth            |
| Contact / Demo  | Form + calendar booking + live chat                                           | Demo booking rate                 |
| Careers         | Open roles, culture, benefits                                                 | Quality applications              |

## Functional Requirements
- Dark-mode primary (light mode can be added later)
- Global sticky navigation + mobile hamburger menu
- Persistent bottom CTA bar on scroll (dismissible)
- Live chat widget (AI first response + human handoff)
- Newsletter signup
- Exit-intent modal (free credits / whitepaper)
- Interactive code playgrounds on product and documentation pages
- Multi-language code snippets with one-click copy
- Full-text search across documentation and blog (Algolia)
- SEO-ready (metadata, structured data, sitemap, Open Graph, Twitter cards)
- Privacy-compliant analytics (PostHog + GA4 with consent)

## Non-Functional Requirements
- Lighthouse Performance score ≥ 95
- Accessibility: WCAG 2.2 AA
- Security: Strict CSP, HTTPS only
- Internationalization-ready (English first)
- Fully responsive from 320px to 2560px

## Content Requirements
- All copy must be technically accurate and benefit-oriented
- Tone: Confident, precise, modern, slightly ambitious
- No exaggerated or unsupported claims
