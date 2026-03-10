# FiveStarTravel B2B Portal

## Current State
- All 7 booking modules complete (Flight, Hotel, Visa, Transfer, Tour, Cruise, Railway)
- GDS, Package Builder, Wallet, Reports, CRM (5 tabs), Supplier/DMC/Admin Dashboards all complete
- Premium public homepage with 4 role-based login buttons (Agent, Supplier, DMC, Admin)
- DMC Login page exists as a basic placeholder (inline in App.tsx, not a proper dedicated page)
- No White-Label Settings module
- No Notifications/Announcements system

## Requested Changes (Diff)

### Add
- DMCLoginPage component in AuthPages.tsx — premium teal-themed split layout matching Supplier/Admin login pages
- White-Label Settings module (new page in agent dashboard) — branding customization, sub-agent portal settings, domain config, commission settings
- Notifications module (new page in agent dashboard) — announcement feed, unread badges, mark-read, notification types (booking confirmed, payment, promotion, system)

### Modify
- App.tsx: replace inline DMC login placeholder with proper DMCLoginPage component; add white-label and notifications routing
- DashboardLayout.tsx: add White-Label and Notifications to nav items and DashboardPage type

### Remove
- Inline DMC login placeholder code in App.tsx

## Implementation Plan
1. Add DMCLoginPage to AuthPages.tsx (teal gradient left panel, form right panel)
2. Update App.tsx to import and use DMCLoginPage, replace inline placeholder
3. Add WhiteLabelSettings component (new file)
4. Add NotificationsModule component (new file)
5. Update DashboardLayout.tsx to add WhiteLabel and Notifications nav items
6. Update App.tsx routing for new modules
