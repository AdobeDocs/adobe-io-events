---
title: Adobe I/O Events SDK Overview
---

# Adobe I/O Events SDK Overview

The Adobe I/O Events SDK is an open-source SDK that can be used to interact with Adobe I/O Events and register `Events Providers` and `Event Metadata` with ease. You can also register a webhook or journaling endpoint to listen to events. 

You can then start publishing messages to the event receiver for your organization and listen to those events by either polling via journaling or by allowing the webhook to be notified about events. 

The Events SDK provides a wrapper over these API calls making it easier for you to use them as part of your apps and get started with I/O Events more quickly.

The SDK can be used to perform the following operations:

* Create, Update, Delete providers.
* Get All providers for an organization.
* Create, Update, Delete event metadata.
* Get all event metadata for a provider.
* Create a webhook or journal registration.
* Get all registrations for an integration.
* Publish events to the event receiver.
* Get events from journaling.
* Get an observable to start listening to events from journaling using a poller.
* Signature verifications for events delivered via webhook endpoint.

Use of the SDK can be broken down into two general components: 

* Event Producers: Using APIs to perform CRUD operations on providers and event metadata, and to publish events.
* Event Consumers: Registering webhooks, polling via journaling, and using the API to verify signatures and improve security around listeners.

## Next Steps

To begin working with the I/O Events SDK, read the [getting started guide](sdk-getting-started.md).
