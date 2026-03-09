# FiveStarTravel B2B Portal — Premium Redesign

## Current State
- Working B2B portal with full booking modules (Flight, Hotel, Visa, Transfer, etc.)
- Basic design using Bricolage Grotesque + Outfit fonts
- Primary color #0B5ED7 (blue), secondary #1E293B (navy), accent #22C55E (green)
- Logo hosted at /assets/uploads/image-1.png (old), new logo at /assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg
- Standard SaaS dashboard layout, not premium enough

## Requested Changes (Diff)

### Add
- New logo reference: /assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg used throughout
- Premium OKLCH color tokens: deep navy (primary), vibrant orange (accent/CTA), rich gold highlights
- Advanced glassmorphism hero with animated gradient mesh background
- Premium sidebar with gradient, logo display, glowing active states
- Top header with glass effect and premium wallet display
- Luxury-tier typography: Bricolage Grotesque for display, Plus Jakarta Sans for body
- Premium stat cards with gradient overlays and micro-detail
- Animated gradient CTA buttons with hover shimmer effects
- Premium service cards with sophisticated hover interactions
- High-end footer with gradient background and subtle texture
- Advanced dashboard quick-book grid with premium icon design
- Cinematic hero section with layered depth and floating booking cards

### Modify
- index.css: Rewrite all CSS tokens to match premium navy/orange palette + advanced gradient classes
- tailwind.config.js: Add Plus Jakarta Sans font, premium shadow tokens, advanced animations
- PublicPages.tsx: Redesign Header, Hero, StatsBar, ServicesSection, WhyWorkWithUs, Footer with premium look
- DashboardLayout.tsx: Premium dark sidebar with gradient, glowing nav items, premium header
- DashboardPage.tsx: Premium stat cards, gradient deal cards, polished booking table
- AuthPages.tsx: Premium login/register with logo + brand color background panel

### Remove
- Generic flat card styles
- Outdated logo src paths replaced with new logo

## Implementation Plan
1. Update index.css with premium OKLCH tokens: deep navy primary, orange accent, gold brand color, dark/semi-dark sidebar
2. Update tailwind.config.js with Plus Jakarta Sans, premium shadows, custom animations
3. Redesign PublicPages.tsx: cinematic hero, premium nav, advanced sections
4. Redesign DashboardLayout.tsx: premium sidebar with gradient + glow, header glass
5. Redesign DashboardPage.tsx: premium stats, gradient cards, polished table
6. Redesign AuthPages.tsx: split-panel login with brand hero side
