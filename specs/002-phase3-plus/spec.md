# PanjatanTech Website – Speckit Phase 3+ (v2.0)

**Content Cleanup + Developers Portal + Launch Readiness** · 2026-10-14 · Supersedes v1.0 for the next phase.
Constitution: `.specify/memory/constitution.md` (unchanged), plus:

> **Phase 3+ rule:** No new feature or page may be started until every visible placeholder on the
> current site is resolved or intentionally hidden.

## Goal
Take the site from "promising skeleton with placeholders" to a credible, conversion-ready product
site with a strong Developers experience.

## Success criteria
- Zero visible "pending", "placeholder", or "example.com" text on any public page
- Developers page is a working portal (docs + API explorer + SDKs)
- Site can be shown to external users / early customers
- Lighthouse Performance ≥ 90, Accessibility ≥ 90

## In scope
**A. Content & trust cleanup (first):** replace or remove placeholder metrics; final pricing or
"Contact sales"; real customer logos or remove the strip; complete About values and team; fix the
cookie banner.

**B. Developers portal:** docs layout with sidebar; 4–6 real pages (Quickstart, Authentication,
Inference, Vector Store, Agents, Evaluation); API Explorer (mock acceptable); multi-language code
tabs with copy; SDK section (TypeScript, Python, Go); clear "Try it" / sandbox messaging.

**C. Supporting completeness:** deeper Solutions pages; Blog listing + 1–2 posts; Careers
("hiring – coming soon" acceptable); Contact / Book Demo fully functional.

**D. Quality gate:** performance, accessibility audit, cross-device testing, SEO basics.

## Out of scope
Full auth / dashboard; real backend beyond the mocked API; light mode; complex animation or
personalization; CMS-driven blog.

## Plan
| Sprint | Focus | Duration | Exit criteria |
|---|---|---|---|
| 1 | Content cleanup (P0 + P1) | 3–4 days | Zero placeholders on Home, Products, Pricing, About |
| 2 | Developers portal foundation | 5–7 days | Real docs + API Explorer + SDK section live |
| 3 | Supporting pages + quality | 4–5 days | Solutions, Blog, Careers usable; Lighthouse ≥ 90 |

Risks: content delays (owner supplies final numbers/copy within 48h); docs scope creep (max 6
pages); cookie banner fixed early so it doesn't block testing.

## Sprint 1 decisions (2026-10-14)
- Pricing: paid tiers show "Contact sales"; only Free is a published price. Billing toggle removed.
- Customer logos and metrics: removed from Home until verified data exists.
- API host and SDK package names: decided at the start of Sprint 2 (see below).

## Sprint 2 decisions (2026-10-14)
- API host `https://api.panjatantech.com`; TypeScript SDK `@panjatantech/sdk` (`new Panjatan({ apiKey })`).
- Endpoint contract lives in `content/api/openapi.json` and drives the docs, explorer and sandbox. It is a proposed contract: engineering must confirm it matches the real API before launch.
- Python and Go SDKs show "Coming soon"; docs use plain HTTP (`requests`) for Python.

## Tasks

### Sprint 1 – Content cleanup
- [x] Audit every page and list all placeholder text
- [x] Metrics section hidden (no verified numbers)
- [x] Pricing changed to "Contact sales" for paid tiers
- [x] Removed "pending approval" / "example.com" / "illustrative" text from Home, Products, Pricing, About, Careers
- [x] Cookie banner: shown only when analytics is configured; compact bar on mobile, small corner card on desktop
- [x] Logo strip removed
- [x] About values rewritten from the Constitution
- [x] "Team coming soon" section
- [ ] Review and tighten Home and Products microcopy (needs product-owner review)

### Sprint 2 – Developers portal
- [x] API host `https://api.panjatantech.com`, TypeScript SDK `@panjatantech/sdk` (Python/Go: coming soon, names TBD)
- [x] Docs: Quickstart, Authentication, Inference API, Vector Store, Agents, Evaluation
- [x] API Explorer polish (mocked) with "Try it" / sandbox messaging
- [x] Code tabs with reliable copy
- [x] SDK section with install commands and links
- [x] Developers landing page

### Sprint 3 – Completeness & quality
- [ ] Deepen Solutions pages
- [ ] Blog listing + 1–2 published posts
- [ ] Careers page finalized
- [ ] Contact form sending (Resend/Formspree) + Cal.com URL
- [ ] Performance, accessibility, cross-browser passes; soft-launch checklist
