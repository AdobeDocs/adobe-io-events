---
title: Journaling Introduction
---

# Journaling

The Adobe I/O Events [Journaling API](./api/journaling-api.md) allows enterprise integrations to retrieve events at their own pace and process them in bulk.
For enterprise developers, Adobe provides an alternative method for consuming events beyond all push-based deliveries ([Webhooks](./index.md), [Amazon EventBridge](./amazon-eventbridge/index.md), and [Runtime](./runtime-webhooks/index.md)): **Journaling**.

Unlike _push-based_ deliveries, journaling requires no additional registration or configuration, and uses a **pull-based** model for consuming events.
With journaling, your application issues a series of API calls to retrieve batches of one or more events from the journal.
Every enterprise integration registered for events is automatically enabled for journaling.

**Key Benefits of Journaling:**

- Retains up to 7 days of event history
- Allows iteration from any previous event within the retention window
- Supports starting from a [specific point in time](./api/journaling-api.md#starting-from-a-specific-point-in-time-with-the-seek-parameter) using the `seek` parameter
- Continues to receive and store events even if your push-based deliveries are failing
- Enables retrieval of missed events due to push-based delivery failures

## Resources

- [Get started with the Journaling API](./api/journaling-api.md)
- [Journaling FAQ](../support/faq.md#journaling-faq)
