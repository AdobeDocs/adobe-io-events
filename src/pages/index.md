---
keywords:
  - Reactive
  - Event Driven Application
  - Getting Started
title: Adobe I/O Events Docs
description: Adobe I/O Events enables building reactive, event-driven applications, based on events originating from various Adobe services, such as Creative Cloud, Adobe Experience Manager, and Analytics Triggers.
---

<HeroSimple />

# Adobe I/O Events Docs test

Adobe I/O Events offer you a powerful way to integrate your application with Adobe services and solutions. With Creative Cloud Assets, Adobe Experience Manager, and Adobe Analytics Triggers, we have events across our entire range of technologies.

## Reactive and event-driven applications

Adobe I/O Events enables building reactive, event-driven applications, based on events originating from various Adobe services, such as Creative Cloud, Adobe Experience Manager, and Analytics Triggers.

Events are triggered by an **Event Provider**, like Adobe Creative Cloud Assets, whenever a certain real-world action occurs, such as creating a new asset.

To start listening for events, register your application, specifying which **Event Types** from which **Event Providers** it wants to receive.
Whenever a matching event gets triggered, your application is notified.

## Prerequisites

Following are the prerequisites:

* For **Creative Cloud Events**: you would need an active Adobe ID.
* For **Experience Cloud Events**: you would need to have entitlements for Adobe services in Experience Cloud in your organization, and administrative permission for your org to create integrations.
* For **Experience Platform Events**: same as above, you will require the appropriate permissions and access to Experience Platform from your organization.

## Getting Started

* [Introduction to Webhooks](guides/index.md)
* [Introduction to Journaling](guides/journaling-intro.md)
* [Introduction to Amazon EventBridge Integration](guides/amazon-eventbridge/index.md)
* Jump to the Adobe Developer Console documentation to learn how to [add Events to a project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-event/)
* Discover the [available events](guides/using/index.md)

## Going Further

* Automate your Adobe I/O Events integrations, using
  * [Adobe I/O Events API](guides/api/index.md)
  * [Adobe I/O Events CLI](guides/cli/index.md)
  * [Adobe I/O Events SDK](guides/sdk/index.md)
  * [Adobe I/O Events with App Builder](guides/appbuilder/index.md)
  * [Automatic event registrations](guides/runtime-webhooks/autoregistrations.md)

* [Ask questions, report bugs, make feature requests, and spark discussions](support/index.md).
