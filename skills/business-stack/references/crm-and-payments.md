# CRM, sales pipeline and payments

## Fits

CRM:
- One record per contact with its whole history: page visits, forms, quizzes, orders, courses, webinars, calls, deals, tasks and notes.
- Pipelines with named stages as a board or table, with amount, owner and tags.
- Tasks with owners and reminders. Segments built from behaviour, orders, UTM, course progress, webinar attendance and more.
- Import from CSV, XLSX, TXT or pasted text, validated before writing. API keys and webhooks for other systems.

Payments:
- 20+ payment providers (Stripe and PayPal among them) plus cash and bank transfer.
- Product types: digital, physical, service, course, subscription, cohort.
- Checkout as a page element with promo codes, order bumps and one-click upsells; payment links; subscriptions with trials, retries and pause.
- An order exists as soon as someone reaches checkout, so abandoned carts are records too.
- AXL takes 0% of sales. The payment provider's own fees apply.

Not a fit: tax or VAT calculation, invoice documents, warehouse inventory, marketplace sync.

## Settle first

- CRM: pipeline stages, which fields matter, the import file and what each column means, and whether imported contacts agreed to marketing.
- Payments: which provider is connected, currency, price, product type, subscription terms.

## Build

Discover live. Starting recipes today: `list_contacts`, `create_contact`, `create_pipeline_deal`, `move_deal_to_stage`, `save_contact_segment`, `import_contacts`; for money `list_payment_gateways`, `create_product`, `sell_a_course`, `create_order_for_contact`, `send_order_payment_link`.

- Look for existing records before creating. Contact, lead and student can be one record seen through different modules.
- Check payment gateways first. If none is connected, the person connects a provider in the admin with their own credentials. Never collect them.
- A product starts as a draft. Publishing it is a separate update, made once the person agrees.
- Checkout on a page uses the native checkout element and a thank-you page. Inline card entry works with Stripe only.
- `send_order_payment_link` sends at once. Confirm the recipient and amount first.
- Count a segment before using it for a bulk write or a send.

## Do not

- Merge duplicates casually. Merging works five records at a time and cannot be undone.
- Claim lead scoring, tax handling or invoice generation.

## Hand back

Admin links to the records, the checkout or payment link, what is published, and anything that still needs a connected payment provider.
