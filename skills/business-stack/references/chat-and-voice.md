# Chat inbox, AI chat agents, phone and voice AI

## Chat: fits

- One operator inbox for messengers and social DMs (WhatsApp, Instagram, Telegram and others), tied to the contact record.
- An AI chat agent that answers from the person's instructions and files on chosen channels, helps customers book through attached booking pages, and hands off to the team.
- Instagram comment-to-DM automation.

## Chat: settle first

- Which channels, and whether they are already connected.
- What the agent should and should not answer, its sources, its tone, and when to hand off.

## Chat: build

Discover live. Starting recipes today: `list_chat_channels`, `connect_chat_channel`, `list_ai_agents`, `create_chat_agent`, `configure_ai_agent`, `test_ai_agent`.

- The person connects channels in the admin. Never collect bot tokens, page tokens or passwords.
- A new AI agent is created disabled. It answers only when it is enabled and its channel list includes a connected channel. An empty list means it answers nowhere.
- Test the agent before enabling it on a live channel, and ask before enabling.
- Meta and WhatsApp rules apply: message templates and messaging windows. Facebook comment automation depends on Meta permissions.
- AI replies are paid from the account balance.

## Phone and voice AI: fits

- Business numbers in the US and Canada, a browser softphone, recordings, transcripts and AI call summaries on the contact timeline.
- Voice agents for inbound reception, outbound calls, qualification, reminders and feedback calls. They can book into attached booking pages during a call.
- After a call, scenarios branch on answered, no answer, voicemail or the analysed outcome.

## Phone and voice AI: build

Discover live. Starting recipes today: `list_phone_numbers`, `check_telephony_prices`, `create_voice_agent`, `route_calls_to_ai_agent`, `call_contact_with_voice_agent`, `start_call_campaign`.

- Buying a number and enabling SMS are the person's steps in the admin.
- A voice agent works only when it is enabled and a number routes to it.
- Calls cost money and reach real people. Outbound calls need the called people's consent and the person's explicit go. Never start a call or a campaign without a yes in chat.
- Quote prices only from `check_telephony_prices`.

## Do not promise

Call hold or transfer, numbers outside the US and Canada, latency figures, or a fixed setup time.

## Hand back

Admin links to the agent and numbers, which channels or numbers it is live on, and the steps left for the person.
