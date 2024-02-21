---
title: AEM Events Status Checks
---

## AEM Events Status Check Endpoints

The package `aio-aem-events` powers a few status endpoints that will help you troubleshoot your set up:

* [aio-aem-core](https://github.com/adobe/aio-lib-java/tree/main/aem/core_aem) endpoints
    * from [/bin/aio/workspace.json](http://localhost:4502/bin/aio/workspace.json)
      you can `GET` the status of your workspace configuration
* [aio-aem-events-mgmt](https://github.com/adobe/aio-lib-java/tree/main/aem/events_mgmt_aem)  endpoints
    * from [bin/aio/events/provider_config.json](http://localhost:4502/bin/aio/events/provider_config.json)
      you can `GET` the status of your Adobe I/O Events provider configuration,
    * from [bin/aio/events/provider.json](http://localhost:4502/bin/aio/events/provider.json)
      you can `GET` the status of your Adobe I/O Events provider registration,
    * from [bin/aio/events/event_metadata.json](http://localhost:4502/bin/aio/events/event_metadata.json)
      you can `GET` the status of your (12) Adobe I/O Events Event Metadata registration,
* [aio-aem-events-publish](https://github.com/adobe/aio-lib-java/tree/main/aem/events_ingress_aem)  endpoint
    * from [/bin/aio/events/publish_ping.json](http://localhost:4502/bin/aio/events/publish_ping.json)
      you can `GET` the status of the Adobe I/O Events Publish service
* [aio-aem-events-osgi-mapping](https://github.com/adobe/aio-lib-java/tree/main/aem/events_osgi_mapping) endpoint
    * from [/bin/aio/events/osgi_event_mapping.json](http://localhost:4502/bin/aio/events/osgi_event_mapping.json)
      you can `GET` the status of your OSGI to Adobe I/O Events Mappings services.
