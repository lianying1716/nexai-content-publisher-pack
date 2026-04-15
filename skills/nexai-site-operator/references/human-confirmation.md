# Human Confirmation

The operator gateway exists so AI can work without opening the admin UI, but some actions still require a human decision.

## Always Human-Confirmed

- Confirming an unpaid order as paid
- Confirming a wallet topup as paid
- Confirming an API topup as paid
- Approving or rejecting agent applications
- Approving or rejecting API integration applications

These confirmations happen in the admin operator alerts inbox, not through the external skill alone.

## AI-Allowed Actions

- Drafting and publishing content when the token allows it
- Updating safe product fields
- Toggling listing state
- Previewing inventory import
- Committing inventory import
- Reading alerts
- Acking or snoozing operator-visible alerts
- Creating review suggestions with a reason and confidence

## Inventory Rule

- Always preview before commit
- The AI can know counts, duplicates, stock before, and stock after
- The AI must not receive the raw secrets back from the API

## Payments Rule

- AI reads payment summary
- AI can surface unpaid alerts
- Human confirms whether money arrived
