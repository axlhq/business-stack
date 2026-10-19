# Webinars and video hosting

## Webinars: fits

- Live webinars with stage layouts, slides, chat moderation, hosts, moderators and guests.
- Evergreen (automated) webinars on a timeline with scripted chat and timed offer buttons, recurring from hourly to yearly.
- Registration on the person's own domain with personal join links.
- Attendance, viewing time, drop-off, orders and UTM per webinar; attendance can drive follow-ups.

## Webinars: settle first

- Live or evergreen; date, time and time zone.
- Registration page and what registrants receive (confirmation, reminders, join link).
- An offer during the webinar, and the follow-up for attendees and no-shows.

## Webinars: build

Discover live. Starting recipes today: `create_webinar`, `edit_webinar_page`, `schedule_calendar_event`, `register_webinar_participant`.

- Registration is a page with a native form, plus a page scenario that registers the person for the webinar on form submission, plus a thank-you page. A captured contact is not registered automatically; wire it and check it.
- The calendar entry comes from the event recipe, not from the webinar alone. Follow the recipe.
- A new webinar has its own seeded scenario for its emails. Read it before adding another one.
- Use the streaming options the account's webinar settings show. Do not promise audience capacity.

## Video hosting: fits

- Upload, or import from Drive, OneDrive, Dropbox or Zoom.
- A player with download protection and a moving watermark; embeds locked to listed domains or limited to courses and sites.
- Versions: replacing the current version updates every embed.
- Views, unique viewers, watch time, and "watched" as a condition for segments and automations.

## Video hosting: build

Discover live. Today the path is `upload_file`, `add_video_from_upload`, `mark_video_upload_complete`, `check_video_ready`, then `get_video_for_embedding` or `configure_video_access`.

- Uploads finish outside MCP: a raw PUT of file parts to pre-signed URLs, without the AXL Authorization header. If you cannot make HTTP requests, send the person to the admin to upload.
- Adding a video by URL takes direct file links, not YouTube or Vimeo pages.
- Wait for processing before embedding.

## Do not promise

DRM, a ready-made replay page, or webinar capacity figures.

## Hand back

Admin links, the registration page link, the schedule, and which follow-ups are active.
