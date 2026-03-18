---
title: AEM Events powered by AEM add-on module (Deprecated)
---

# AEM Events powered by AEM add-on module (Deprecated)

<Fragment src="../../../../common/aem-addon-module-deprecation-notice.md" />

**The AEM add-on module that facilitates integration with Adobe I/O Events is open source as the [`aem-io-events`](https://github.com/adobe/aio-lib-java/tree/main/aem/aio_aem_events) component of our [`aio-lib-java`](https://github.com/adobe/aio-lib-java) GitHub project.**

## Requirements

To set it up, you need:

- An AEM (version 6.5 and above) instance with administrative permissions.
- [Adobe Developer Console](https://developer.adobe.com/console) access, with administrative permissions for your enterprise organization.

Note: If you are still running AEM version 6.4 and wish to use this solution, [let us know](https://github.com/adobe/aio-lib-java/issues/104).

## Installation guides

These installation guides describe how to deploy and configure it so you can use Adobe IO Events for notification of AEM events, such as page or asset CUD operations.

- [Installation guide for AEM Events powered by Add-On Module on AEM On-Premise (6.5.x and above)](aem-on-premise-install.md)
- [Installation guide for AEM Events powered by Add-On Module on AEM as a Cloud Service](aem-skyline-install.md)

## Use Adobe IO Events

- Once the previous steps are completed, a new AEM provider should appear in the Events Providers list in your Adobe Developer Console.
Please refer to the Adobe Developer Console documentation on how to [add Events to a project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-event) if you are new to this.

![Adobe Developer Console showing an AEM Events Provider](../../../img/add_skyline_event_provider.png "Adobe Developer Console showing an AEM Events Provider")

- You are ready to register a new [webhook](../../../../guides/index.md) or to start pulling events from this new AEM source using [journaling](../../../../guides/journaling-intro.md).
