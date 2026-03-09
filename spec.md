# FiveStarTravel B2B Portal

## Current State
Visa module has a single VisaApplyFlow that handles both online and offline visa in one shared 4-step form, branching on `isOnline` boolean. VisaServices shows a single search view and a unified apply flow.

## Requested Changes (Diff)

### Add
- `VisaEvisaFlow.tsx` — dedicated Online eVisa flow (Atlys-style):
  - For countries with visa type: e-Visa, Visa on Arrival
  - Steps: Country Info → Personal Details → Document Upload (per evisaChecklist) → Review & Submit
  - Passport OCR scan mock, photo upload, mandatory/optional document checklist with progress bar
  - Fee summary in USD + INR, application reference on confirmation
- `VisaOfflineFlow.tsx` — dedicated Offline/Sticker Visa flow (VisaHQ-style):
  - For countries with visa type: Sticker Visa, Visa Required
  - Steps: Select Embassy → Applicant Form (personal + travel details) → Document Checklist (per offlineChecklist with checkboxes + upload) → Appointment & Submit
  - Per-item document checklist with checkboxes, upload per document, progress bar
  - Embassy/consulate selector, appointment date picker, courier return toggle
  - PDF checklist download button (mocked)
  - Full applicant form: name, DOB, nationality, passport no., travel dates, purpose, address
  - Application reference on confirmation
- Two distinct entry points on the Visa landing: "Apply Online eVisa" section and "Sticker Visa / Offline" section with clear visual separation and separate CTAs

### Modify
- `VisaServices.tsx` — add two tabs at top: "Online eVisa" and "Offline Visa"; route `view` to correct new flow component based on selected country visa type
- `VisaCountrySearch.tsx` — pass `visaType` context so the Apply button routes to the correct flow; show "Apply eVisa" vs "Apply Offline" label on country cards based on type
- Remove shared `VisaApplyFlow.tsx` usage and replace with the two new dedicated components

### Remove
- `VisaApplyFlow.tsx` — replaced by the two dedicated flow components (keep file but gut usage)

## Implementation Plan
1. Create `VisaEvisaFlow.tsx` with dedicated 4-step online eVisa form (passport OCR, document upload per evisaChecklist, review, confirmation)
2. Create `VisaOfflineFlow.tsx` with dedicated 4-step offline visa form (embassy select, full applicant form, document checklist with checkboxes+upload, appointment, confirmation + PDF mock)
3. Update `VisaServices.tsx` to show two top-level sections (Online eVisa / Offline Visa) and route to correct component
4. Update `VisaCountrySearch.tsx` country cards to show correct CTA label and pass visaType to parent on select
