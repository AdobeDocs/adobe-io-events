---
title: GenStudio Events
description: Subscribe to Adobe GenStudio Experience lifecycle events through Adobe I/O Events.
---

# GenStudio Events

Adobe GenStudio for Performance Marketing emits events when approved Experiences are created, have their metadata updated, or are deleted. Subscribe to these events through Adobe I/O Events to react in near real time, instead of polling the [GenStudio API](https://developer.adobe.com/genstudio-api/).

## Provider

GenStudio Events are published under the **GenStudio Events** provider, using the [CloudEvents v1.0](https://cloudevents.io/) envelope.

## Available event types

| Event code | Display name | Emitted when |
|---|---|---|
| `com.adobe.genstudio.experience.created` | Experience Created | An approved Experience is created |
| `com.adobe.genstudio.experience.metadataUpdated` | Experience Metadata Updated | Metadata fields of an approved Experience are updated |
| `com.adobe.genstudio.experience.deleted` | Experience Deleted | An Experience is deleted |

Only approved (published) Experiences generate events; draft and rejected content does not.

## Event payload

All GenStudio events share the same CloudEvents envelope:

```json
{
  "specversion": "1.0",
  "id": "<uuid>",
  "source": "urn:adobe:genstudio:content",
  "type": "com.adobe.genstudio.experience.<event>",
  "datacontenttype": "application/json",
  "dataschema": "https://ns.adobe.com/schemas/genstudio/events/com.adobe.genstudio.experience.<event>",
  "time": "<ISO 8601 timestamp>",
  "subject": "<experienceId>",
  "data": { }
}
```

For `experience.created` and `experience.metadataUpdated`, `data` is a summary of the Experience:

```json
{
  "experienceId": "urn:aaid:aem:<uuid>",
  "orgId": "<IMS Org ID>",
  "createdAt": "2026-06-01T12:00:00.000Z",
  "modifiedAt": "2026-06-01T12:00:00.000Z",
  "title": "Example Experience",
  "channel": "linkedin",
  "keywords": ["image", "text"],
  "brands": [{"name": "Acme"}],
  "personas": [{"name": "Active Lifestyle Enthusiast"}],
  "products": [{"name": "Trail Runner Pro"}],
  "campaigns": [],
  "languages": ["en_US"],
  "selfLink": "https://genstudio.adobe.io/experiences/urn:aaid:aem:<uuid>"
}
```

`selfLink` points at the Experience — call it with your OAuth Server-to-Server credentials to retrieve the full record. See the [GenStudio API Authentication guide](https://developer.adobe.com/genstudio-api/getting-started/) and [API Reference](https://developer.adobe.com/genstudio-api/api/).

`experience.deleted` cannot be enriched with additional data (the Experience no longer exists), so `data` carries only the minimum needed to identify what was removed:

```json
{
  "experienceId": "urn:aaid:aem:<uuid>",
  "orgId": "<IMS Org ID>"
}
```

Events are additive-only — new optional fields may be added to `data` over time. Design your integration to ignore unknown fields.

## Delivery characteristics

* **Delivery semantics** — At-least-once. Deduplicate using the event `id`.
* **Ordering** — Not guaranteed across delivery. Use `time` and `modifiedAt` if you need to reason about sequence.
* **Source of truth** — The GenStudio API, not the event payload — events carry only a summary; the API returns the full Experience. Treat events as a signal to fetch or re-sync.
* **Max payload size** — 64 KB per event.

## How to subscribe to GenStudio Events in the Adobe Developer Console

1. Visit [https://developer.adobe.com/console/projects](https://developer.adobe.com/console/projects) and create or open a project.
2. Press **Add to Project** and then  **Event**. This opens the **Add Events** dialog.
3. Select **GenStudio Events** from the list of available providers.
4. Select the event types you want to receive (`Experience Created`, `Experience Metadata Updated`, `Experience Deleted`).
5. Choose an OAuth Server-to-Server credential (or create one) for the registration.
6. Provide a name and description for your event registration.
7. Choose how to consume the events:
   * **Adobe I/O Events Webhooks** — receive events as HTTP POST requests to a URL you control.
   * **Adobe I/O Journaling API** — pull events at your own cadence.
   * **Amazon EventBridge** — route events into your AWS account.

For debugging, GenStudio events arriving for your organization appear in the **Event Browser** tab of your registration, where you can inspect delivery status and payloads.

For general background on consuming Adobe I/O Events, see [Introduction to Adobe I/O Events Webhooks](../../index.md) and [Introduction to Journaling](../../journaling-intro.md).
