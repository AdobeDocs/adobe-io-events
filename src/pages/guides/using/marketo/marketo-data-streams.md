# Subscribing to the Marketo Events with Adobe I/O Events

These instructions describe how to set up and get started using Adobe I/O Events for the Marketo Data Streams.

- [Introduction](#introduction)
- [Subscribing to Marketo Events](#subscribing-to-marketo-events)
- [Developer Guidelines](#developer-guidelines)
- [Debug](#debug)

## Introduction

In order to allow for additional scalability and further programmatic automation of the Marketo platform, we have introduced the Marketo Data Streams.  The data streams are available to all CET and Performance Plus customers.  There are currently five data streams:

- [Lead Activity Data Stream](https://developers.marketo.com/data-streams/#overview_lead_activity_data_stream)
- Metrics Data Stream (Alpha)
- Notification Data Stream (Beta)
- [Observability Data Stream (Beta)](marketo-observability-data-stream-setup.md)
- [User Audit Data Stream (Beta)](marketo-user-audit-data-stream-setup.md)

At this time, only the Notification, Observability, and User Audit streams are available within Adobe I/O Events, the Lead and Metrics streams can be subscribed to via alternate paths.

Note: The Marketo Data Streams are currently in Beta

## Subscribing to Marketo Events

See the [Adobe I/O Events Docs](/src/pages/index.md)

Here are some basic getting started instructions that will be the same for each of the available Marketo data streams in I/O Events.

- Start from the [developer console](/console/):

- Select `Create new project`

  ![Create new project](../../img/UserAuditDataStreamIOSetup1.png "Quick Start")

- Select `Add event`

  ![Add event](../../img/UserAuditDataStreamIOSetup2.png "Get started with your new project by adding an event subscription")

- Filter by `Experience Cloud`

You should see the three Marketo Data Streams available.  Please see the individual page for each stream for further setup instructions.

## Developer Guidelines

When setting up a project to subscribe to events, there are three ways to interact with those event subscriptions in order to receive the events.  The first is Journaling, which provides a pull model in which events can be pulled via API and stores up to 7 days of past events.  The second is Webhooks, which can be configured to send events either as single events or batched to a webhook endpoint in near real-time with the event occurrence.  Third is Runtime, where you can set up your own custom function within Adobe that events will automatically run through near-real time.

### Journaling
[Getting Started with Journaling](../../journaling_intro.md)

Important Takeaways:

- Stores up to 7 days of history
- Can be iterated through from any previous event within the history
- Will still receive and store events even if webhook is failing
- Useful for fetching events that were missed due to webhook issues or for a pulling mechanism instead of webhook push

### Webhooks
[Getting Started with Adobe I/O Events Webhooks](../../index.md)

Webhook Endpoint Requirements:

- Handle GET and POST requests
- Respond with a 200-type response within a reasonable time period
- Challenge Request
  - GET request with challenge query parameter
  - Must respond with value of challenge query parameter
- Webhook Events
  - POST request with JSON data body with one or more events
  - *Recommended to set up webhook as batch*

## Debug

[Debug Tracing](../../../support/tracing.md)

Once you have successfully completed your setup and event subscription registration, events should start being stored in the journal.  In addition, if you have webhooks or runtime set up, the events will go through those flows.  From the project's page in the event registration details, you should see a tab for Debug Tracing.  For webhooks, this will show a record of failed and successful challenge attempts as well as webhook attempts.  Each request includes the request/response details to help debug.

There is also an Event Browser tab which lets you manually look at events in the Journal from the Developer Console UI