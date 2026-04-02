# FiveStarTravel B2B Portal

## Current State
- Agent portal: fully built with 20+ navigation modules (DashboardLayout), white theme, all modules functional
- Admin, Supplier, DMC, Staff portals: exist as single-file components with basic tab-based UI but NO full sidebar navigation structure like the Agent portal
- App.tsx routes to each portal correctly
- ThemeContext and design-tokens provide consistent theming

## Requested Changes (Diff)

### Add
- AdminDashboard: full sidebar navigation (15+ items) using DashboardLayout pattern
  - Overview, Agents, Suppliers/DMCs, All Bookings, Inventory Control, Markup Rules, Wallet/Payments, Reports/Analytics, CRM, Automation, System Logs, Users & Roles, Notifications, Support Tickets, Settings
- SupplierDashboard: full sidebar navigation (10+ items)
  - Overview, My Inventory (Hotels/Tours/Transfers/Packages), Bookings, Contracts, Pricing Calendar, Payouts & Wallet, Reports, Profile, Support
- DMCDashboard: full sidebar navigation (8+ items)
  - Overview, Packages, Agent Bookings, Destinations, Partner Agents, Revenue Analytics, Inventory Upload, Support
- StaffDashboard: full sidebar navigation (8+ items)
  - Overview, Manual Bookings, Offline Queue, Task Board, Supplier Tracker, Payment Recording, Quotation Builder, Support
- Each portal gets its own sidebar + topbar matching the white theme design system
- All nav items render a proper module page (no "Coming Soon" placeholders for primary items)

### Modify
- AdminDashboard.tsx: rebuild with DashboardLayout-style sidebar, retain existing tab content, add new module pages
- SupplierDashboard.tsx: rebuild with sidebar nav, retain existing inventory/booking/pricing content
- DMCDashboard.tsx: rebuild with sidebar nav, retain package/agent/analytics content
- StaffDashboard.tsx: rebuild with sidebar nav, retain manual booking/task/quotation content

### Remove
- Simple tab-based navigation in all 4 portals (replaced by proper sidebar)

## Implementation Plan
1. Create shared PortalLayout component (sidebar + topbar) reusable across all portals, using same design tokens
2. Rebuild AdminDashboard with PortalLayout + 15 page views (agents table, supplier management, bookings overview, markup rules engine, wallet ledger, reporting, CRM, automation, logs, users/roles, notifications, support, settings)
3. Rebuild SupplierDashboard with PortalLayout + 10 page views (inventory hub, bookings, contracts, pricing calendar, payouts, reports, profile, support)
4. Rebuild DMCDashboard with PortalLayout + 8 page views (packages, agent bookings, destinations, partner agents, analytics, inventory, support)
5. Rebuild StaffDashboard with PortalLayout + 8 page views (manual bookings, offline queue, task board, supplier tracker, payment recording, quotation builder, support)
