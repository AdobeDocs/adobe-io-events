# AEM FAQ

## Which versions of AEM is supported for I/O Events?  

We support a range of versions see [Set up AEM Events with Adobe I/O Events](../index.md) 

## What do I need to leverage AEM events?  

A separate package is required to use AEM I/O Events. 

## What does the AEM event payload look like?  

Here are sample payloads for all AEM events: 

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

