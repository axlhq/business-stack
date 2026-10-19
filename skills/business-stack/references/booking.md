# Booking pages (Calendly-style)

## Fits

- Consultations, intro calls, demos, sessions, classes with a seat limit.
- One host or a team with round robin by priority and workload.
- Availability rules: working windows, minimum notice, buffers, a closing date, a guest cap per slot. Guests book in their own time zone.
- Locations: Zoom (the person connects it with OAuth), Google Meet, phone or in person.
- Intake questions land on the contact record. Each booking also creates a task for the host.
- Shared as a link, embedded on any website with HTML, or placed on an AXL page.

Not a fit: hosting the call itself (AXL schedules it; Zoom or Meet runs it), or a booking screen the person is coding into their own app.

## Settle first

- Meeting name and length.
- Host or hosts, and round robin if a team.
- Working hours, time zone, minimum notice, buffers.
- Location: Zoom, Google Meet, phone or in person.
- Intake questions.
- Paid or free. Payment is a separate step (see below).
- Confirmation and reminder messages: channel and timing.

## Build

Discover live. Today the path is `list_meetings`, then `create_booking_page`, `set_meeting_weekly_schedule`, `configure_booking_page` and `get_booking_page_url`.

- A booking page is public as soon as it is created. Settle the details first, or tell the person it is already reachable.
- Get the shareable link from `get_booking_page_url`. To put the widget on an AXL page, use the native meeting element from the page guide.
- Reminders and confirmations are scenarios (email or chat, N minutes before). See [automations](automations.md).
- Paid sessions: create the product and order first, then send the booking link after payment through a scenario. Deposits work as partial payments. See [crm-and-payments](crm-and-payments.md).
- Zoom has to be connected by the person in the admin. Send them the link; do not ask for Zoom credentials.

## Do not promise

- Two-way sync with Google or Outlook calendars (busy times). It is not confirmed; check the live schema before mentioning it.
- Guests rescheduling by themselves.
- That AXL runs the video call.

## Hand back

The booking link, the admin link, whether reminders are set, and whether the page is already public.
