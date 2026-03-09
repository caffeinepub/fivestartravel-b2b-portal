# FiveStarTravel B2B Portal - Transfer Module Complete Rebuild

## Current State
TransferBooking.tsx exists with a basic 4-step flow (search → results → details → confirmed) covering airport, outstation, and local tabs. It has vehicle cards, passenger fields (name/phone/email/notes), and a basic booking summary. Missing: proper trip type tabs (one-way/round/rental/outstation), car plate/reg number, full duration/distance fields, proper review step before payment, airport/hotel/city address confirmation fields, rental hours picker, and wallet deduction display.

## Requested Changes (Diff)

### Add
- Trip type tabs: One-Way | Round Trip | Rental (hourly) | Outstation
- Transfer category selector per type: Airport Transfer vs City-to-City vs Hotel Pickup
- Full vehicle detail on card: car type, registration number (plate), PAX capacity, luggage capacity, estimated duration, price per km/hour
- Dedicated Review step (step 4) between details and confirmation showing: all trip details, vehicle summary, passenger info, pickup/drop confirmation (airport terminal, hotel name, city), itinerary, price breakup (base fare + toll + GST + driver allowance), T&C, wallet balance vs total
- Wallet deduction on final confirm with remaining balance shown
- Rental: hours picker (4hr/8hr/12hr) + package price
- Outstation: multi-day support, per-day pricing, return date
- Passenger form: title (Mr/Mrs/Ms), full name, mobile, email, alternate contact
- Pickup confirmation: airport name + terminal (for airport type), hotel name + address (for hotel), city + landmark (for city)
- Booking ref format: TRF-YYYYMMDD-XXXXXX
- 5-step progress stepper: Search → Results → Details → Review → Confirmed

### Modify
- Replace single tab (airport/outstation/local) with 4 trip type tabs
- Expand vehicle cards with plate number (masked), duration estimate, km estimate, tolls included badge
- Passenger details page: add title, alternate contact, GST (optional), special requests
- Confirmation page: full itinerary card, driver contact (mock), QR code placeholder, download voucher CTA

### Remove
- Generic "local" tab (replaced by Rental)
- Sparse confirmation screen (replaced by detailed booking confirmation card)

## Implementation Plan
1. Rewrite TransferBooking.tsx completely as a standalone file under 600 lines
2. Add trip type: ONE_WAY | ROUND_TRIP | RENTAL | OUTSTATION with appropriate sub-fields
3. Transfer category: AIRPORT | CITY | HOTEL pickup/drop
4. Vehicle cards: show car type, reg (masked), PAX, bags, distance, duration, price
5. Passenger details form: title + name + mobile + email + alt contact + pickup notes
6. Review step: full summary, price breakup table, T&C checkbox, wallet panel
7. Wallet deduction on submit, show remaining balance
8. Confirmed step: booking ref, driver info, full trip card, download/new-search CTAs
