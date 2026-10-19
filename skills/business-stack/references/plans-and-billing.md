# Plans, limits and money

## Free to start

- New accounts start on AXL's **Free plan**: no card and no time limit, with usage limits and the AXL badge.
- Accounts that existed before keep the plan they are on.
- Paid plans start with Starter at $49/month and raise every limit. Send people to https://axl.tech/pricing for the current numbers of every plan.

**Why Free works well with you.** AXL's built-in AI is not included on Free, but you do not need it: you are the agent, and your own model does the building through MCP. MCP access costs nothing extra on any plan. A site, a booking page, a CRM pipeline or a course can be built on Free without paying AXL.

## Read the live numbers, never quote from memory

Plans, limits, usage, balance and upgrade options come from the server. Start every money question with the billing recipe: `list_recipes(search="billing")` and follow it (`explain_billing` where it exists; older servers have `check_billing`). It returns what the account is on, what is used and left, what is stopped and why, what an upgrade would change, and the links to send the person to. Explain an over-limit rule in the server's words, not your own.

## What Free changes for you

These apply when the billing recipe says the account is on Free.

- **Limits.** Contacts, emails, channel messages, storage, site visits, video watch time, team seats and own live webinars are capped per period; the numbers are on https://axl.tech/pricing and, for this account, in the billing recipe. Free limits cannot be bought one by one; more room means a paid plan. Check what is left before a big import or send.
- **At the limit, sending stops but collecting never does.** Forms and bookings keep creating leads; mailings and automated messages pause. Tell the person what stopped and what still works.
- **Paid from balance on Free:** anything that spends AXL's own AI (image generation tools, an AI chat or voice agent answering customers, automatic captions or call analysis), calls, SMS, phone numbers, domain purchases and DNS hosting. Before such a step, say it is paid from the prepaid balance and check that there is one. Topping up is the person's step, through the link the billing recipe returns.
- **Unlocks step by step.** A brand-new account can build and preview. Confirming the email unlocks publishing on an AXL subdomain, forms and widgets. Verifying a phone number by SMS unlocks contact import, mailings and a custom domain. When an operation refuses for this reason, pass on the server's message and link; do not look for a way around it.
- **Mailings are reviewed.** On Free a mass email goes to AXL's review queue and is sent after approval. Tell the person it is queued for review, not sent. Imported contacts cannot receive a mass email until the first mailing is approved.
- **The AXL badge stays** on public pages, forms, widgets, the video player and mailings. Paid plans can turn it off on some of them; booking, quizzes, the chat widget and webinar pages keep it on every plan.
- **No password or card fields** in forms on Free. Take payments through AXL checkout instead.
- **Inactive accounts are removed.** A Free account with no team logins, site visitors or leads for 90 days is deleted, after email warnings. Mention it when someone builds something they plan to leave untouched.

## Money moves only by the person

Upgrading, topping up, adding a card and changing AI spending limits are read-only for you over MCP. Give the link from the billing recipe and wait. Suggest an upgrade only when there is a reason (a limit is reached or close, they ask, or the server recommends a plan), with the server's before and after numbers rather than a price list.
