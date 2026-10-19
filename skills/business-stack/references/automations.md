# Automations (scenarios)

## Fits

- "When a form is submitted, tag the contact, send a welcome email and create a task."
- Booking confirmations and reminders, abandoned checkout, webinar follow-up for attendees and no-shows, subscription renewals, Instagram comment to DM.
- Triggers include orders, forms, page visits, comments, lessons, webinars and incoming webhooks. Actions send on email and chat channels, grant or revoke access, move a deal, create a task, or call a webhook (retried for 24 hours).
- A scenario can wait, listen for an event, and branch on segment conditions. It can also run in bulk on a saved segment.

## Settle first

- The trigger, the steps, the wait times and the branches, in plain words.
- Who it applies to, and whether it should run for people already in the account or only for new ones.

## Build

Discover live. Today the path is `create_entity_scenario`, `create_site_page_scenario` or `create_chat_channel_scenario`, then `create_scenario_node`, `configure_scenario_node`, `connect_scenario_nodes` and `activate_scenario`.

- Read the scenario already attached to the host (a page, webinar or channel) before creating another. Some arrive with default nodes.
- Fetch `get_scenario_node_schema` for each node type and run `check_scenario_node_payload` before writing a node.
- Link nodes with the source node's real output ports. A link can save and still never fire. Read the graph back.
- Nodes must be connected and the scenario active. Authoring, activating and running are separate steps, and a run can message real people. Activate only when the person asked for it.

See the scenario section of [operation pitfalls](operation-pitfalls.md).

## Hand back

The admin link to the scenario, whether it is active, and what will happen to whom.
