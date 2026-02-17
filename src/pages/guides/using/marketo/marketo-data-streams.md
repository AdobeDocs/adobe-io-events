---
title: Marketo Data Streams
---

import DeveloperGuidelines from 'marketo-data-streams-developer-guidelines.md'
import Debug from 'marketo-data-streams-debug.md'

# Subscribing to the Marketo Events with Adobe I/O Events

These instructions describe how to set up and get started using Adobe I/O Events for the Marketo Data Streams.

- [Introduction](#introduction)
- [Subscribing to Marketo Events](#subscribing-to-marketo-events)
- [Developer Guidelines](#developer-guidelines)
- [Debug](#debug)

## Introduction

In order to allow for additional scalability and further programmatic automation of the Marketo platform, we have introduced the Marketo Data Streams.  The data streams are available to all CET and Performance Plus customers.  There are currently five data streams:

- [Lead Activity Data Stream](marketo-lead-activity-data-stream-setup.md)
- [User Audit Data Stream](marketo-user-audit-data-stream-setup.md)
- [Notification Data Stream (Beta)](marketo-notification-data-stream-setup.md)
- [Observability Data Stream (Beta)](marketo-observability-data-stream-setup.md)
- Metrics Data Stream (Alpha)

The Lead Activity, User Audit, Notification, and Observability Data Streams are all available within Adobe I/O Events.
The Metrics Data Stream can be subscribed to via an alternate path.

Note: Some Marketo Data Streams are currently in Alpha and Beta states.

## Subscribing to Marketo Events

See the [Adobe I/O Events Docs](../../../index.md)

Here are some basic getting started instructions that will be the same for each of the available Marketo data streams in I/O Events.

- Start from the [developer console](https://developer.adobe.com/console/):

- Select `Create new project`

  ![Create new project](../../img/console_create_new_project.png "Quick Start")

- Select `Add event`

  ![Add event](../../img/UserAuditDataStreamIOSetup2.png "Get started with your new project by adding an event subscription")

- Filter by `Experience Cloud`

You should see the various Marketo Data Streams available.  Please see the individual page for each stream for further setup instructions.

<Fragment src="marketo-data-streams-developer-guidelines.md"/>

<Fragment src="marketo-data-streams-debug.md"/>
