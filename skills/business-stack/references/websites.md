# Websites, landing pages, forms and quizzes

## Fits

- A landing page for an offer, event, course or webinar; a small business site; a lead form or quiz funnel; a checkout page with a thank-you page.
- Pages are hosted and server-rendered, with SEO basics (robots.txt, sitemap, per-page noindex, OG fields, redirects), A/B tests, page revisions and traffic analytics.
- Forms, quizzes and checkout are native page elements. Every submission writes to the CRM contact.
- Own domain (SSL is automatic) or a platform subdomain to start. Domains can also be bought or transferred inside AXL.

Not a fit: a web app with its own logic and backend, or a site the person wants to keep as code in their own repo. If they only need a form, booking or checkout inside their own site, an AXL embed can still save work.

## Settle first

Ask only for what you cannot infer or default:

- the goal of the page and who it is for;
- brand: logo, colours, an existing site to match;
- what a form collects and what happens after a submission (tag, email, booking link, task);
- domain: an existing one, or a platform subdomain for now;
- live straight away, or a draft to review first.

## Build

Discover live. Today the path is `list_sites`, then `create_landing_site` or `create_site_page`, then `edit_site_page_html`, `preview_site_page` and a thank-you page.

- Check existing sites first. The recipe asks you to confirm with the person before creating another site.
- Page HTML writes need the guide token (`section="guide"`, then `guideAck`). Use the guide's native elements for forms, quizzes, checkout and booking widgets. A handwritten form renders fine and saves nothing.
- Site pages go live unless the person asked for a draft. Respect their choice.
- Wire what happens after a submission with a page scenario. See [automations](automations.md).
- Standalone forms and quizzes have their own recipes. Read `get_quiz_item_schema` before adding fields.
- Domains: the domain recipe offers three routes (move DNS to AXL, add records at the current registrar, buy a new domain). Buying happens through a checkout link the person opens. Changes at their registrar are theirs to make.
- Images: `import_image_from_url`, the media library, or `generate_image` (billed, so ask first and pass `confirmSpend` only after a yes).

## Do not promise

- Automatic canonical tags or Twitter Cards. Add them through head HTML when needed.
- An instant sitemap refresh, or a blog engine with categories (a blog is pages under `/blog`).
- Permanent links for non-image files. Those links expire after 6 hours.

## Hand back

The public page link and the admin link from the tool result, the domain status, and what is still a draft.
