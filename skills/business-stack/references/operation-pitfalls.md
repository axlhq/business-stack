# AXL operation pitfalls

Read only the sections relevant to the current operation. These notes preserve cross-module traps; the live recipe and schema supply the exact fields, IDs, payloads, and current behavior.

## Filters, updates, and files

- A malformed filter may be silently ignored. Inspect matches and compare with the corresponding count before using the same audience for a write. An empty bulk-action filter can target every record in the account; a single-record task needs an exact selector.
- Update models can use `Optional<T>`: a wrapper with `value` sets or clears a value, while omission leaves it unchanged. Follow the actual schema. A collection update can replace the entire collection; use the additive recipe for requests such as adding a tag. Do not copy a contact payload onto a deal or another entity.
- Contact, lead, and student can refer to one underlying record exposed through different modules. Inspect existing records and enrollment before creating duplicates. Import column mapping, custom-field creation, and subscription consent require the actual import contract and the user's intended meaning.
- Images belong in the account media library; site scaffolding and visitor downloads use site Files. Follow the upload recipe to completion before presenting an asset URL. A pre-signed storage upload must not carry the AXL Authorization header. Poll asynchronous imports/exports through their status operation and report rejected rows or partial results.

## HTML and editor content

- Before a gated page, shared-component, or course-theory HTML write, fetch `get_operation_schema` with `section="guide"` for that operation, read it, and return its current token as top-level `guideAck`. Page and component acknowledgments are not interchangeable.
- Read existing design content and its concurrency stamp before editing. Send the required stamp; reread and reconcile a conflict instead of forcing an overwrite. Keep AI revision metadata required by the current recipe.
- Use the live brand-style and native element contracts. Shared headers/footers stay shared components. Native forms, checkout, quizzes, and media need real account bindings and their documented runtime; handwritten substitutes can render correctly and still fail to save data or take payment.
- Course theory written as custom HTML and content from the visual editor's block tree are different representations. Follow the current guide's editing constraints so a later visual-editor save does not silently overwrite the intended content. Check publication separately from a successful content save.

## Linked entities and access

- A course-creation response can contain both a content-tree node ID and a course ID. Follow the recipe's identification of each; they are not interchangeable. Standalone forms/surveys and graded lesson tests also have different models. Use `get_quiz_item_schema` when a form-item recipe requires it.
- Creating course content, publishing it, including it in a product, and granting a contact access are distinct actions. Preserve the user's scope and inspect each required relationship. A captured contact is not automatically registered for a webinar; wire and verify that relationship when registration is the requested result.
- Do not assume creation yields an empty or inactive entity. Check defaults, pre-existing links, and generated records before appending more. Resolve template, sender, channel, recipient, and time-zone requirements from the relevant live recipe before a send or schedule.

## Scenario graphs

- Read the scenario already attached to the host entity before making another. Some scenario types arrive with connected default nodes; a standalone scenario is for an intended flow without that host.
- Fetch `get_scenario_node_schema` for the selected host and node type. Put behavior in `payload`; `settingsJson` is editor-canvas configuration. Follow the current serialization format and run `check_scenario_node_payload` before writing a node, accounting for exceptions explicitly documented by its schema.
- Preserve documented editor mirrors alongside runtime IDs. Use the source node's real output type and port IDs for links; a link can save successfully and never execute. Read back the graph, payloads, connections, and activation state.
- A test run can contact real recipients. Authoring, activating, and running a graph are separate actions; execute only those covered by the user's request. Do not retry an uncertain send or run blindly.
