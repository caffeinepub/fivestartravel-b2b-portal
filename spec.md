# FiveStarTravel B2B Portal — UI Overhaul (Public + Agent Dashboard)

## Current State

- **Duplicate footer on Home page**: `App.tsx` home page renders `<HomePage>` (which already contains `<Footer>` at the end), then adds another `<Footer>` outside `<main>`. Results in two footers stacked.
- **Spelling issues**: "Join Free" in navbar/header (should be "Get Started Free"), "Start Free Agent Account" in HeroSection (should be "Create Free Agent Account"), "Book Now" in DashboardPage deals banner (should be "Start Booking").
- **Agent Dashboard color system**: All dark navy shades with no contrast hierarchy. Random accent colors with no semantic meaning. Low text contrast. Pastel status badges. CTA button blends in. Sidebar active state is weak. Icons are inconsistent colors.
- **Dashboard Cards**: Flat, basic design. No gradient border glow, no trend indicator micro-animation.
- **Quick Book section**: Titled "Quick Book", only has 8 service tiles. Missing: Add Client, Create Itinerary.
- **Sidebar**: Active item has no strong visual treatment. Icons have inconsistent colors. Missing visual hierarchy in nav groups.
- **Topbar**: Missing global search bar for PNR/Booking/Client. Wallet balance widget exists but needs more prominence.

## Requested Changes (Diff)

### Add
- Global search bar (PNR / Booking ID / Client name) in topbar
- Notifications bell icon in topbar with badge
- Performance graph section on dashboard (monthly bookings + revenue bars)
- Top Destinations section (Dubai, Thailand, Bali) with visual cards
- "Add Client" and "Create Itinerary" tiles to Quick Actions panel
- Wallet hero card on dashboard (gradient background, Add Balance / Transaction history buttons)
- Left border highlight + background glow for sidebar active state
- Hover animations: cards scale(1.02) + glow, buttons scale + shadow
- Sidebar expand animation on hover items

### Modify
- **App.tsx home page**: Remove duplicate `<Footer onNavigate={navigate} />` (HomePage already includes it)
- **HeroSection.tsx line 346**: "Start Free Agent Account" → "Create Free Agent Account"
- **PublicPages.tsx lines 308, 381**: "Join Free" → "Get Started Free"
- **PublicPages.tsx line 1026**: "Book Now" → "Start Booking"
- **DashboardPage.tsx**: "Quick Book" → "Quick Actions"; "Book Now →" → "Start Booking →"
- **DashboardPage.tsx stat cards**: Apply semantic color logic:
  - Total Bookings → Blue `#2563EB`
  - Wallet Balance → Green `#16A34A`  
  - This Month Revenue → Green `#16A34A` (not orange)
  - Active Clients → Blue/Purple `#2563EB` / `#7C3AED`
- **DashboardPage.tsx status badges**: Replace pastel with solid high-contrast:
  - Confirmed → `#16A34A` solid green badge, white text
  - Pending → `#F59E0B` solid amber badge, white text
  - Processing → `#2563EB` solid blue badge, white text
  - Cancelled → `#DC2626` solid red badge, white text
- **DashboardLayout.tsx**: Apply 3-layer contrast: `bg-[#0B1220]` page, `bg-[#111827]` cards/sidebar, gradient/glow for highlights
- **DashboardLayout.tsx sidebar**: Active item = left border `border-l-[#2563EB]` + `bg-[#2563EB]/10` glow + icon turns `text-[#2563EB]`; default icons = `text-slate-400`
- **DashboardLayout.tsx topbar**: Background `bg-[#111827]`, add search input, add bell notification icon, make wallet balance larger/greener, add profile avatar with dropdown hint
- **DashboardPage.tsx dashboard cards**: Dark card `bg-[#111827]`, gradient border glow on hover, trend arrow colored, value text white
- **DashboardPage.tsx CTA button**: Gradient `from-orange-500 to-pink-600` + hover glow shadow
- **DashboardPage.tsx Recent Bookings table**: Row hover highlight, action buttons column (View / Edit), stronger status badges

### Remove
- Duplicate `<Footer>` from `App.tsx` home page block (keep the one inside `HomePage` component)

## Implementation Plan

1. **Fix `src/frontend/src/App.tsx`**: Remove the `<Footer onNavigate={navigate} />` line from the home page section (it comes after `</main>`, inside the home page if block). The `HomePage` component already renders `<Footer>` at the end.

2. **Fix `src/frontend/src/components/HeroSection.tsx`**: Change "Start Free Agent Account" → "Create Free Agent Account" on the primary CTA button.

3. **Fix `src/frontend/src/components/PublicPages.tsx`**: Change both occurrences of "Join Free" in the navbar to "Get Started Free"; change "Book Now" to "Start Booking" in AgentDeals section.

4. **Rewrite `src/frontend/src/components/DashboardLayout.tsx`**: Full dark PRO theme with `#0B1220` page background, `#111827` sidebar/cards, enhanced sidebar with active state (left blue border + glow), topbar with global search, notification bell, prominent green wallet balance, profile avatar.

5. **Rewrite `src/frontend/src/components/DashboardPage.tsx`**: Stat cards with semantic colors and gradient borders/glow on hover; "Quick Actions" panel with 10 tiles (add Client, Itinerary); premium wallet hero card; performance bar chart section; top destinations mini cards; recent bookings table with solid status badges, row hover, View/Edit actions; deals banner CTA as gradient button with glow.
