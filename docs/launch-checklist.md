# Launch checklist (Phase 5 audits, Phase 6 soft launch)

Budgets come from `.specify/memory/constitution.md` (IV, V, VI). Run against a production build (`next build && next start`) on a throttled mobile profile, not `next dev`.

## Phase 5a: Performance (Constitution IV)
- [ ] LCP < 1.2s on Home, Products, Pricing, a docs page, a blog post (Lighthouse mobile + WebPageTest)
- [ ] TBT < 150ms on the same pages
- [ ] CLS < 0.05 (check consent banner, chat launcher, sticky CTA bar for shifts)
- [ ] Hero image / font preloaded; no render-blocking third-party scripts
- [ ] With analytics consent rejected, no PostHog/GA requests in the network panel
- [ ] Route JS bundles reviewed (`next build` output); heavy widgets (API explorer, chat, Cal.com) lazy loaded
- [ ] Nonce-based CSP makes pages dynamic: confirm TTFB is still within budget (CDN cannot cache HTML)
- [ ] Real-user Web Vitals reporting confirmed once analytics is enabled

## Phase 5b: Accessibility (Constitution V, WCAG 2.2 AA)
- [ ] axe / Lighthouse a11y: 0 serious or critical issues on every route
- [ ] Keyboard-only pass: skip link, nav, menus, modals (focus trap and return), consent banner, chat panel (Esc closes), API explorer
- [ ] Screen reader pass (NVDA + Firefox, VoiceOver + Safari): landmarks, heading order, form errors announced
- [ ] Contrast checked for text, focus rings and UI components (3:1) including muted/subtle text
- [ ] Target size at least 24x24 CSS px; focus never obscured by sticky bar or banner (2.4.11)
- [ ] `prefers-reduced-motion` disables Framer Motion / parallax / auto-play
- [ ] 200% zoom and 320px width: no horizontal scroll, no clipped content
- [ ] Consent: Reject all is as prominent as Accept all; choice persists; a control can reopen preferences

## Phase 5c: Security and privacy (Constitution VI)
- [ ] Response headers on prod: CSP (nonce, strict-dynamic), HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (securityheaders.com grade A)
- [ ] No CSP violations in the browser console on any route (Cal.com embed, JSON-LD, analytics after consent, Algolia)
- [ ] Form endpoints validated server-side (zod), rate limited, no secrets in client bundle
- [ ] Hosting env vars set; only the search-only Algolia key is public
- [ ] Privacy policy and cookie list match what actually loads
- [ ] SSO and MFA requirement for developer portal confirmed (Constitution VI)

## Phase 5d: SEO
- [ ] `/sitemap.xml` lists every public route (add blog/docs loaders to `src/app/sitemap.ts`); `/robots.txt` correct
- [ ] Every page has unique title, description, canonical, OG and Twitter metadata (`buildMetadata`)
- [ ] Organization JSON-LD validates (Rich Results Test); OG image renders at `/opengraph-image`
- [ ] 404 and error pages return correct status; no broken internal links
- [ ] Submit sitemap to Google Search Console and Bing Webmaster Tools

## Phase 5e: Cross-browser matrix
| Browser | Desktop | Mobile |
|---|---|---|
| Chrome (latest) | [ ] | [ ] Android |
| Safari (latest, -1) | [ ] | [ ] iOS |
| Firefox (latest) | [ ] | n/a |
| Edge (latest) | [ ] | n/a |

For each: layout, nav, forms, consent banner, chat launcher, Cal.com embed, API explorer, colour scheme, fonts.

## Phase 6: Soft launch
- [ ] Content sign-off: no placeholder copy, unverified metrics, or fabricated customer names (Constitution III)
- [ ] Production env vars set; domain, TLS and HSTS verified; www/apex redirect decided
- [ ] Preview deployment smoke test: contact form delivers email, Cal.com booking works, search returns results
- [ ] Analytics: consent flow tested end to end; events visible in PostHog and GA4 only after Accept
- [ ] Monitoring: error tracking, uptime check, alert owner named
- [ ] Rollback plan: previous deployment can be promoted in under 5 minutes
- [ ] Soft launch to limited audience (internal, then invited users); keep `noindex` until public launch
- [ ] Collect feedback for one week; triage blocking issues; re-run Lighthouse on the production URL
- [ ] Go / no-go review, then announce and submit sitemap
