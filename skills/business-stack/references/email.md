# Email campaigns and follow-ups

## Fits

- Broadcasts to CRM segments or dynamic lists: newsletters, launches, announcements.
- Follow-up sequences as scenarios, for example "opened but did not click", abandoned checkout, webinar reminders.
- One campaign can also reach chat channels; the first successful delivery wins.
- Sending from the built-in profile (no DNS work) or from the person's own domain or SMTP.
- One-click unsubscribe, stop lists, bounce suppression, test sends, a sent log and revenue per broadcast.

Not a fit: SMS through AXL alone. SMS needs the person's own Twilio or RingCentral account, billed by that provider.

## Settle first

- Audience: which segment or list, and roughly how many people.
- Sender: built-in profile, or their domain (DNS records to add first).
- Subject, content and the action you want readers to take.
- When: send now, or a scheduled time with its time zone.

## Build

Discover live. Starting recipes today: `list_email_profiles`, `check_email_content`, `create_email_template`, `create_scheduled_email_broadcast`, `control_broadcast_status`.

- **Creating a broadcast arms a real send. There is no draft state.** Create it only after the person approved audience, content and time.
- Use "send now" only when the person said so. Otherwise schedule it and tell them when it goes out and how to stop it.
- Count the audience with the same filter you will send to, and report the number before the send.
- Run the content check before scheduling.
- On Free, a mass email waits for AXL's review before it goes out, and mailings need a phone verified by SMS first. See [plans and billing](plans-and-billing.md).
- An own sending domain needs its DNS records added by the person, then verification, then a sender profile.
- Sequences and automated follow-ups are scenarios. See [automations](automations.md).

## Do not promise

Inbox placement or deliverability rates.

## Hand back

The broadcast admin link, the audience size, the scheduled time, and how to pause it.
