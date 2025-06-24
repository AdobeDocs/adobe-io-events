---
title: Journaling Introduction
---

# Journaling

For enterprise developers, Adobe offers another way to consume events besides webhooks: journaling.
The Adobe I/O Events Journaling API enables enterprise integrations to consume events according
to their own cadence and process them in bulk.
Unlike webhooks, no additional registration or other configuration is required;
every enterprise integration that is registered for events is automatically enabled for journaling.
Journaling data is retained for 7 days.

Important Takeaways on Journaling:

- Stores up to 7 days of history
- Can be iterated through from any previous event within the history
- Supports starting from a [specific point in time]((./api/journaling-api.md#starting-from-a-specific-point-in-time-with-the-seek-parameter)) using the `seek` parameter, which is useful for time-based investigations.
- Will still receive and store events even if webhook is failing
- Useful for fetching events that were missed due to webhook issues or for a pulling mechanism instead of webhook push

Journaling, in contrast to webhooks, is a _pull_ model of consuming events, whereas webhooks are a _push_ model.
In journaling your application will issue a series of API calls to pull batches of one or more events from the journal.

- [Get started with the Journaling API](./api/journaling-api.md)
- [Journaling FAQ](../support/faq.md#journaling-faq)
