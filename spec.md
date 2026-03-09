# FiveStarTravel B2B Portal

## Current State
- VisaEvisaFlow.tsx: 4-step flow. Step 4 (Review & Submit) shows trip details, passport summary, fee breakdown, and a T&C checkbox. On submit, generates a reference number.
- VisaOfflineFlow.tsx: 4-step flow. Step 4 (Appointment & Submit) shows appointment summary, time slot picker, payment info, important notes, and a T&C checkbox. On submit, generates a reference number.
- Wallet balance is hardcoded as ₹1,24,800 in DashboardLayout.tsx.

## Requested Changes (Diff)

### Add
- A shared wallet utility (walletUtils.ts) to read/write wallet balance in localStorage (initial: 124800).
- In Review step of both flows: complete document upload summary showing all doc names and their uploaded status.
- Expanded Terms & Conditions section (scrollable text box, ~200px height) showing the full T&C text before the checkbox.
- Wallet balance check panel on Review step: show current balance, total charge, and post-deduction balance. Show an error if insufficient balance.
- On submit in both flows: deduct the total charge from wallet balance via walletUtils, show toast with amount deducted.
- DashboardLayout.tsx: read wallet balance from localStorage via walletUtils instead of hardcoded value.

### Modify
- VisaEvisaFlow.tsx step 4: Expand review to show ALL passport fields (passport number, expiry, issue date, issuing country, DOB, gender, nationality), all trip details, and all uploaded documents list.
- VisaOfflineFlow.tsx step 4: Expand review to show ALL applicant form fields (full name, DOB, gender, nationality, passport, place of birth, occupation, employer, full address, emergency contact), all travel/embassy details, and all uploaded documents list.
- handleSubmit in both flows: add wallet deduction before setConfirmed(true).
- Success screen in both flows: show amount deducted from wallet.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/utils/walletUtils.ts` with getWalletBalance() / deductWalletBalance(amount) functions using localStorage key `fstwallet`.
2. Update `VisaEvisaFlow.tsx` step 4 JSX: add full passport detail rows, full document list, scrollable T&C box, wallet balance panel. Update handleSubmit to call deductWalletBalance.
3. Update `VisaOfflineFlow.tsx` step 4 JSX: add full applicant/embassy detail rows, full document list, scrollable T&C box, wallet balance panel. Update handleSubmit to call deductWalletBalance.
4. Update `DashboardLayout.tsx`: import walletUtils, use state + storage event to show live wallet balance.
