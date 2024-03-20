---
title: AEM Events FAQ
---

# AEM Events FAQ

## What are the requirements ? Which versions of AEM are supported for I/O Events?

A range of versions is supported. For more information please refer [setting up AEM Events powered by AEM add-on module with Adobe I/O Events](./aem-addon-module/index.md#requirements).

## What does the AEM event payload look like?

Since [aio-lib-java version 0.1.0](https://github.com/adobe/aio-lib-java/releases/tag/aio-lib-java-0.1.0)
Adobe IO Events AEM package supports the recommended [CloudEvents](https://github.com/cloudevents/spec/blob/v1.0/spec.md) event envelope delivery format.

The `CloudEvents` event envelope looks like this :

```json
{
  "specversion": "1.0",
  "source": "urn:uuid:<the AEM provider_id>",
  "type": "<the AEM event_code>",
  "id": "<the AEM event_id>",
  "datacontenttype": "application/json",
  "data": "<the AEM event payload>"
}
```

Whereas the legacy [XDM Event Model](https://github.com/adobe/xdm-event-model) envelope looks like:

```json
{
  "event_id": "<the AEM event_id>",
  "event": "<the AEM event payload>"
}
```

The AEM event payloads follow an [Adobe XDM Event Model](https://github.com/adobe/xdm-event-model),
based on the [json-ld w3c activity streams spec](https://github.com/w3c/activitystreams/blob/master/ns/activitystreams.jsonld)

<InlineAlert variant="info" slots="text"/>

The following event payloads are specific to the deprecated AEM add-on module. For AEM Cloud Service events, the payload envelope follows the CloudEvents standard, though the contents may differ.

Here are a few sample AEM event payloads:

- _Asset events:_
    - Asset created:

        ```json
        {
          "@id": "82235bac-2b81-4e70-90b5-2bd1f04b5c7b",
          "@type": "xdmCreated",
          "xdmEventEnvelope:objectType": "xdmAsset",
          "activitystreams:published": "2016-07-16T19:20:30+01:00",
          "activitystreams:to": {
            "xdmImsOrg:id": "08B3E5CE5822FC520A494229@AdobeOrg",
            "@type": "xdmImsOrg"
          },
          "activitystreams:generator": {
            "xdmContentRepository:root": "http://francois.corp.adobe.com:4502/",
            "@type": "xdmContentRepository"
          },
          "activitystreams:actor": {
            "xdmAemUser:id": "admin",
            "@type": "xdmAemUser"
          },
          "activitystreams:object": {
            "@type": "xdmAsset",
            "xdmAsset:asset_id": "urn:aaid:aem:4123ba4c-93a8-4c5d-b979-ffbbe4318185",
            "xdmAsset:asset_name": "Fx_DUKE-small.png",
            "xdmAsset:etag": "6fc55d0389d856ae7deccebba54f110e",
            "xdmAsset:path": "/content/dam/Fx_DUKE-small.png",
            "xdmAsset:format": "image/png"
          },
          "@context": {
            "activitystreams": "http://www.w3.org/ns/activitystreams#",
            "xdmEventEnvelope": "https://ns.adobe.com/xdm/common/eventenvelope#",
            "xdmAsset": "http://ns.adobe.com/xdm/assets/asset#",
            "xdmImsOrg": "https://ns.adobe.com/xdm/ims/organization#",
            "xdmContentRepository": "https://ns.adobe.com/xdm/content/repository",
            "xdmAemUser": "https://ns.adobe.com/xdm/aem/user#",
            "xdmCreated": "https://ns.adobe.com/xdm/common/event/created#"
          }
        }
        ```

    - Asset deleted:

        ```json
        {
          "@id": "82235bac-2b81-4e70-90b5-2bd1f04b5c7b",
          "@type": "xdmDeleted",
          "xdmEventEnvelope:objectType": "xdmAsset",
          "activitystreams:published": "2016-07-16T19:20:30+01:00",
          "activitystreams:to": {
            "xdmImsOrg:id": "08B3E5CE5822FC520A494229@AdobeOrg",
            "@type": "xdmImsOrg"
          },
          "activitystreams:generator": {
            "xdmContentRepository:root": "http://francois.corp.adobe.com:4502/",
            "@type": "xdmContentRepository"
          },
          "activitystreams:actor": {
            "xdmAemUser:id": "admin",
            "@type": "xdmAemUser"
          },
          "activitystreams:object": {
            "@type": "xdmAsset",
            "xdmAsset:asset_id": "urn:aaid:aem:4123ba4c-93a8-4c5d-b979-ffbbe4318185"
          },
          "@context": {
            "activitystreams": "http://www.w3.org/ns/activitystreams#",
            "xdmEventEnvelope": "https://ns.adobe.com/xdm/common/eventenvelope#",
            "xdmAsset": "http://ns.adobe.com/xdm/assets/asset#",
            "xdmImsOrg": "https://ns.adobe.com/xdm/ims/organization#",
            "xdmContentRepository": "https://ns.adobe.com/xdm/content/repository",
            "xdmAemUser": "https://ns.adobe.com/xdm/aem/user#",
            "xdmDeleted": "https://ns.adobe.com/xdm/common/event/deleted#"
          }
        }
        ```

    - Asset updated:

        ```json
        {
          "@id": "82235bac-2b81-4e70-90b5-2bd1f04b5c7b",
          "@type": "xdmUpdated",
          "xdmEventEnvelope:objectType": "xdmAsset",
          "activitystreams:published": "2016-07-16T19:20:30+01:00",
          "activitystreams:to": {
            "xdmImsOrg:id": "08B3E5CE5822FC520A494229@AdobeOrg",
            "@type": "xdmImsOrg"
          },
          "activitystreams:generator": {
            "xdmContentRepository:root": "http://francois.corp.adobe.com:4502/",
            "@type": "xdmContentRepository"
          },
          "activitystreams:actor": {
            "xdmAemUser:id": "admin",
            "@type": "xdmAemUser"
          },
          "activitystreams:object": {
            "activitystreams:mediaType": "image/png",
            "@type": "xdmAsset",
            "xdmAsset:asset_id": "urn:aaid:aem:4123ba4c-93a8-4c5d-b979-ffbbe4318185",
            "xdmAsset:asset_name": "Fx_DUKE-small.png",
            "xdmAsset:etag": "6fc55d0389d856ae7deccebba54f110e",
            "xdmAsset:path": "/content/dam/Fx_DUKE-small.png",
            "xdmAsset:format": "image/png"
          },
          "@context": {
            "activitystreams": "http://www.w3.org/ns/activitystreams#",
            "xdmEventEnvelope": "https://ns.adobe.com/xdm/common/eventenvelope#",
            "xdmAsset": "http://ns.adobe.com/xdm/assets/asset#",
            "xdmImsOrg": "https://ns.adobe.com/xdm/ims/organization#",
            "xdmContentRepository": "https://ns.adobe.com/xdm/content/repository",
            "xdmAemUser": "https://ns.adobe.com/xdm/aem/user#",
            "xdmUpdated": "https://ns.adobe.com/xdm/common/event/updated#"
          }
        }
        ```

- _Page events:_
    - Page published:

        ```json
        {
          "@id": "82235bac-2b81-4e70-90b5-2bd1f04b5c7b",
          "@type": "xdmPublished",
          "xdmEventEnvelope:objectType": "xdmComponentizedPage",
          "activitystreams:published": "2016-07-16T19:20:30+01:00",
          "activitystreams:to": {
            "xdmImsOrg:id": "08B3E5CE5822FC520A494229@AdobeOrg",
            "@type": "xdmImsOrg"
          },
          "activitystreams:generator": {
            "xdmContentRepository:root": "https://cloud-action-dev.corp.adobe.com:4502/",
            "@type": "xdmContentRepository"
          },
          "activitystreams:actor": {
            "xdmAemUser:id": "admin",
            "@type": "xdmAemUser"
          },
          "activitystreams:object": {
            "@id": "http://adobesummit.adobesandbox.com:4502/content/geometrixx/en/vintage.html",
            "@type": "xdmComponentizedPage",
            "xdmComponentizedPage:title": "Vintage Collection",
            "xdmComponentizedPage:path": "/content/geometrixx/en/vintage.html"
          },
          "@context": {
            "activitystreams": "http://www.w3.org/ns/activitystreams#",
            "xdmEventEnvelope": "https://ns.adobe.com/xdm/common/eventenvelope#",
            "xdmComponentizedPage": "https://ns.adobe.com/xdm/content/componentized-page#",
            "xdmImsOrg": "https://ns.adobe.com/xdm/ims/organization#",
            "xdmContentRepository": "https://ns.adobe.com/xdm/content/repository#",
            "xdmAemUser": "https://ns.adobe.com/xdm/aem/user#",
            "xdmPublished": "https://ns.adobe.com/xdm/common/event/published#"
          }
        }
        ```

    - Page unpublished:

        ```json
        {
          "@id": "82235bac-2b81-4e70-90b5-2bd1f04b5c7b",
          "@type": "xdmUnpublished",
          "xdmEventEnvelope:objectType": "xdmComponentizedPage",
          "activitystreams:published": "2016-07-16T19:20:30+01:00",
          "activitystreams:to": {
            "xdmImsOrg:id": "08B3E5CE5822FC520A494229@AdobeOrg",
            "@type": "xdmImsOrg"
          },
          "activitystreams:generator": {
            "xdmContentRepository:root": "https://cloud-action-dev.corp.adobe.com:4502/",
            "@type": "xdmContentRepository"
          },
          "activitystreams:actor": {
            "xdmAemUser:id": "admin",
            "@type": "xdmAemUser"
          },
          "activitystreams:object": {
            "@id": "http://adobesummit.adobesandbox.com:4502/content/geometrixx/en/vintage.html",
            "@type": "xdmComponentizedPage",
            "xdmComponentizedPage:title": "Vintage Collection",
            "xdmComponentizedPage:path": "/content/geometrixx/en/vintage.html"
          },
          "@context": {
            "activitystreams": "http://www.w3.org/ns/activitystreams#",
            "xdmEventEnvelope": "https://ns.adobe.com/xdm/common/eventenvelope#",
            "xdmComponentizedPage": "https://ns.adobe.com/xdm/content/componentized-page#",
            "xdmImsOrg": "https://ns.adobe.com/xdm/ims/organization#",
            "xdmContentRepository": "https://ns.adobe.com/xdm/content/repository#",
            "xdmAemUser": "https://ns.adobe.com/xdm/aem/user#",
            "xdmPublished": "https://ns.adobe.com/xdm/common/event/published#"
          }
        }
        ```
