---
title: Journaling API
---

# Adobe I/O Events Journaling API

## What is a Journal?

A Journal, is an ordered list of events - much like a ledger or a log where new entries (events) are added to the end of the ledger and the ledger keeps growing.
Your application can start reading the ledger from any position and then continue reading "newer" entries (events) in the ledger, much like turning pages forward.

[Journaling](../journaling-intro.md), in contrast to [webhooks](../index.md), is a _pull_ model of consuming events, whereas webhooks are a _push_ model.
In journaling your application will issue a series of API calls to pull batches of one or more events from the journal.
The Journaling API response contains event data and the unique position in the journal for every event returned in that batch.

The position of an event in the journal is significant. For your application to continue reading "newer" events in the journal, the position of the last event needs to be supplied back to the Journaling API in order to fetch events "newer" than the last event.

A batch of events returned by the Journaling API looks similar to the following JSON object.

```json
{
   "events": [ // an ordered list of events
      {
         "position": "string", // unique position of this event in the journal
         "event": {
            "key": "value" // actual event data
         }
      }
   ],
   "_page": {
      "last": "string", // position corresponding to the last event returned in this batch
      "count": 1 // number of events returned in this batch
   }
}
```

## Fetching events from the journaling API

### Finding the journaling endpoint URL

Every event registration has a corresponding unique journaling endpoint URL. This URL is displayed on the Adobe Developer Console -

1. Log into the [Adobe Developer Console](https://developer.adobe.com/console) and open your project.

2. Navigate to the appropriate Event registration using the left sidebar under the Events section.

3. Under the Event Delivery Method section, copy the URL for the unique api endpoint.

4. Be sure to add the `I/O Management API` as a service in your integration in order to be able to invoke the journaling API. Click on Add to project > API > I/O Management API.

### Obtaining an access token to call the API

To issue the API call, you need to provide three additional parameters:

* Your integration's API key (Client ID). It can be found either on the Project overview page, in the Credentials tab of the Event registration, or on the specific credential page.
* An OAuth Server-to-Server token. See [Authentication: Creating an OAuth Server-to-Server Token](https://developer.adobe.com/developer-console/docs/guides/authentication/ServerToServerAuthentication/#oauth-server-to-server-credential) for how to create an OAuth Server-to-Server token.
* Your organization id in the format `some_id@AdobeOrg`. This is also displayed in the Overview tab for your integration in the Adobe Developer Console.

You combine the URL you got from the Journaling section of the event details with your API key, OAuth Server-to-Server token and organization ID to make the call.

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/xxxxx/integrations/xxxx/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
  -H "x-ims-org-id: $ORG_ID" \
  -H "Authorization: Bearer $oauth_s2s_token" \
  -H "x-api-key: $API_KEY"
```

### Fetching your first batch of events from the journal

The journaling endpoint URL, when called without any query parameters fetches the batch of the ["oldest" available events](#oldest-available-events) in the journal. These events are "older" than all other events and, hence, once your application starts consuming "newer" events from this position it will eventually consume all events present in the journal.

For example:

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```json
HTTP/1.1 200 OK
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614>; rel="next"

{
   "events":[
      {
         "position":"camel:5aeb25cc-1b15-4f26-a082-9c213005dba8:ff244403-ca7c-4993-bbda-3c8915ce0b32",
         "event":{
            "@id":"urn:oeid:aem:199e85da-dd54-4966-95ba-13cf544964dc",
            "@type":"xdmCreated",
            "activitystreams:published":"2018-03-06T15:19:03-08",
            "activitystreams:to":{
               "@type":"xdmImsOrg",
               "xdmImsOrg:id":"01DC1FC45956A5810A494138@AdobeOrg"
            },
            "activitystreams:generator":{
               "@type":"xdmContentRepository",
               "xdmContentRepository:root":"http://localhost-roberto-aem63:4502"
            },
            "activitystreams:actor":{
               "@id":"healthcheck-user",
               "@type":"xdmAemUser"
            },
            "activitystreams:object":{
               "@type":"xdmAsset",
               "xdmAsset:asset_name":"healthcheck.png",
               "xdmAsset:path":"/content/dam/healthcheck.png",
               "xdmAsset:format":"image/png"
            },
            "xdmEventEnvelope:objectType":"xdmAsset"
         }
      },
      {
         "position":"moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614",
         "event":{
            "@id":"urn:oeid:aem:61930ae6-ff2a-48fb-881d-078e862c3811",
            "@type":"xdmCreated",
            "activitystreams:published":"2018-03-06T15:19:59-08",
            "activitystreams:to":{
               "@type":"xdmImsOrg",
               "xdmImsOrg:id":"01DC1FC45956A5810A494138@AdobeOrg"
            },
            "activitystreams:generator":{
               "@type":"xdmContentRepository",
               "xdmContentRepository:root":"http://localhost-roberto-aem63:4502"
            },
            "activitystreams:actor":{
               "@id":"healthcheck-user",
               "@type":"xdmAemUser"
            },
            "activitystreams:object":{
               "@type":"xdmAsset",
               "xdmAsset:asset_name":"healthcheck.png",
               "xdmAsset:path":"/content/dam/healthcheck.png",
               "xdmAsset:format":"image/png"
            },
            "xdmEventEnvelope:objectType":"xdmAsset"
         }
      }
   ],
   "_page": {
      "last": "moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614",
      "count": 2
   }
}
```

_Notice the structure of the JSON response returned by the Journaling API, and that the unique position of every event in the journal is mentioned alongside the event's data._

_Also, for your benefit, all the examples in the journaling documentation are in continuation of each other._

### Fetching the next batch of "newer" events from the journal

Once your application has fetched a batch of events from the journal, it can fetch the next batch of "newer" events by supplying the `position` of the `last` event in the current batch. The `position` of the `last` event needs to be supplied back in the query parameter `since`. The API call can then be read semantically as: **`GET` a batch of events `since` the given `position` in the journal.**

Instead of constructing the URL to the next batch of "newer" events it is **strongly recommended** that you utilize the link provided in the response headers. Every successful response from the journaling API contains a `Link` response header with the relation type `rel=next`. The URL in the `next` link is pre-populated with the `since` query parameter to fetch the next batch of "newer" events.

For example:

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614 \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```json
HTTP/1.1 200 OK
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=rabbit:f9645ec8-34f2-4188-bf6e-cea4b2784fda:7dd9e3c4-0d3f-42d5-abb4-1776e209b080>; rel="next"

{
   "events":[
      {
         "position":"rabbit:f9645ec8-34f2-4188-bf6e-cea4b2784fda:7dd9e3c4-0d3f-42d5-abb4-1776e209b080",
         "event":{
            "@id":"urn:oeid:aem:f6851819-5fb7-4232-ad25-f523ae44186c",
            "@type":"xdmCreated",
            "activitystreams:published":"2018-03-01T17:54:14-08",
            "activitystreams:to":{
               "@type":"xdmImsOrg",
               "xdmImsOrg:id":"01DC1FC45956A5810A494138@AdobeOrg"
            },
            "activitystreams:generator":{
               "@type":"xdmContentRepository",
               "xdmContentRepository:root":"http://localhost-roberto-aem63:4502"
            },
            "activitystreams:actor":{
               "@id":"healthcheck-user",
               "@type":"xdmAemUser"
            },
            "activitystreams:object":{
               "@type":"xdmAsset",
               "xdmAsset:asset_name":"healthcheck.png",
               "xdmAsset:path":"/content/dam/healthcheck.png",
               "xdmAsset:format":"image/png"
            },
            "xdmEventEnvelope:objectType":"xdmAsset"
         }
      }
   ],
   "_page": {
      "last": "rabbit:f9645ec8-34f2-4188-bf6e-cea4b2784fda:7dd9e3c4-0d3f-42d5-abb4-1776e209b080",
      "count": 1
   }
}
```

_Notice the link header with the URL to the next batch of events. The query parameter `since` in the URL has been automatically populated with the position of the `last` event in the batch._

### Fetching events from the end of the journal

By continuously iterating through the journal and consuming "newer" events, eventually your application will reach the "end" of the journal. The "end" of the journal corresponds to that position of the journal, where there are no "newer" events _yet_. Hence, if you try to fetch events "newer" than the "end" position, no events will be returned - just a `204 No Content` response.

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=rabbit:f9645ec8-34f2-4188-bf6e-cea4b2784fda:7dd9e3c4-0d3f-42d5-abb4-1776e209b080 \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```http
HTTP/1.1 204 No Content
retry-after: 10
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=rabbit:f9645ec8-34f2-4188-bf6e-cea4b2784fda:7dd9e3c4-0d3f-42d5-abb4-1776e209b080>; rel="next"
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb/validate?since=rabbit:f9645ec8-34f2-4188-bf6e-cea4b2784fda:7dd9e3c4-0d3f-42d5-abb4-1776e209b080>; rel="validate"
```

However, after some time, depending on the frequency of events in your event registration, "newer" events will be added in near real-time to the end of the journal. These events can then be fetched by calling the same URL that earlier returned a `204 No Content` response, but this time it will return a `200 OK` response with a list of events in the response body.

For your benefit whenever you're fetching events `since` the "end" position in the journal, the `next` link in the `204 No Content` will be the same as the current request URI. Hence, you can always rely on the `next` link to iterate through the journal. And whenever you receive a `204 No Content` response you should back off by the number of seconds specified in the `retry-after` response header before resuming to pull events from the `next` link.

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=rabbit:f9645ec8-34f2-4188-bf6e-cea4b2784fda:7dd9e3c4-0d3f-42d5-abb4-1776e209b080 \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```json
HTTP/1.1 200 OK
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb>; rel="next"

{
   "events":[
      {
         "position":"penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb",
         "event":{
            "@id":"urn:oeid:aem:5492d8d4-6fca-4d6c-a788-043ec4bf32af",
            "@type":"xdmCreated",
            "activitystreams:published":"2018-03-01T19:33:11-08",
            "activitystreams:to":{
               "@type":"xdmImsOrg",
               "xdmImsOrg:id":"01DC1FC45956A5810A494138@AdobeOrg"
            },
            "activitystreams:generator":{
               "@type":"xdmContentRepository",
               "xdmContentRepository:root":"http://localhost-roberto-aem63:4502"
            },
            "activitystreams:actor":{
               "@id":"healthcheck-user",
               "@type":"xdmAemUser"
            },
            "activitystreams:object":{
               "@type":"xdmAsset",
               "xdmAsset:asset_name":"healthcheck.png",
               "xdmAsset:path":"/content/dam/healthcheck.png",
               "xdmAsset:format":"image/png"
            },
            "xdmEventEnvelope:objectType":"xdmAsset"
         }
      }
   ],
   "_page": {
      "last": "penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb",
      "count": 1
   }
}
```

## Controlling the response

### Limiting the size of the batch

When events are created at a high frequency, Journal persists groups of events in its storage units;
when events are created at a lower rate, these storage units will contain only one event.

Hence, depending on the traffic of the events associated with your registration,
the number of events returned in a single response batch varies:
a batch of events contains at least one event (if you are not already at the end of the journal),
but there is no pre-defined upper limit.

In case you wish to set an upper bound, you can supply the `limit` query parameter with the maximum number
of events that may be returned by the API.

Once a `limit` query parameter is supplied, the value of the parameter is retained in the `next` link as well. Hence, you can continue using the `next` link as-is, without needing to construct it. The `limit` query parameter can also be combined with any other query parameter, just make sure that you pass a positive integer as the value.

For example, here is the same request as before but with the number of events returned limited to just one:

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?limit=1 \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```json
HTTP/1.1 200 OK
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=camel:5aeb25cc-1b15-4f26-a082-9c213005dba8:ff244403-ca7c-4993-bbda-3c8915ce0b32&limit=1>; rel="next"

{
   "events":[
      {
         "position":"camel:5aeb25cc-1b15-4f26-a082-9c213005dba8:ff244403-ca7c-4993-bbda-3c8915ce0b32",
         "event":{
            "@id":"urn:oeid:aem:199e85da-dd54-4966-95ba-13cf544964dc",
            "@type":"xdmCreated",
            "activitystreams:published":"2018-03-06T15:19:03-08",
            "activitystreams:to":{
               "@type":"xdmImsOrg",
               "xdmImsOrg:id":"01DC1FC45956A5810A494138@AdobeOrg"
            },
            "activitystreams:generator":{
               "@type":"xdmContentRepository",
               "xdmContentRepository:root":"http://localhost-roberto-aem63:4502"
            },
            "activitystreams:actor":{
               "@id":"healthcheck-user",
               "@type":"xdmAemUser"
            },
            "activitystreams:object":{
               "@type":"xdmAsset",
               "xdmAsset:asset_name":"healthcheck.png",
               "xdmAsset:path":"/content/dam/healthcheck.png",
               "xdmAsset:format":"image/png"
            },
            "xdmEventEnvelope:objectType":"xdmAsset"
         }
      }
   ],
   "_page": {
      "last": "camel:5aeb25cc-1b15-4f26-a082-9c213005dba8:ff244403-ca7c-4993-bbda-3c8915ce0b32",
      "count": 1
   }
}
```

NOTE: The `limit` query parameter DOES NOT guarantee that the number of events returned will always be equal to the value supplied.
 This is true even if there are more events to be consumed in the journal.
 The `limit` query parameter only serves as a way to specify an upper bound on the count of events.

For example, our journal above has at least 4 events that we know of, however, even when the `limit` parameter is supplied with the value `3`, we do not get that many events in the respsonse.

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?limit=3 \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```json
HTTP/1.1 200 OK
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614&limit=3>; rel="next"

{
   "events":[
      {
         "position":"camel:5aeb25cc-1b15-4f26-a082-9c213005dba8:ff244403-ca7c-4993-bbda-3c8915ce0b32",
         "event":{
            "@id":"urn:oeid:aem:199e85da-dd54-4966-95ba-13cf544964dc",
            "@type":"xdmCreated",
            "activitystreams:published":"2018-03-06T15:19:03-08",
            "activitystreams:to":{
               "@type":"xdmImsOrg",
               "xdmImsOrg:id":"01DC1FC45956A5810A494138@AdobeOrg"
            },
            "activitystreams:generator":{
               "@type":"xdmContentRepository",
               "xdmContentRepository:root":"http://localhost-roberto-aem63:4502"
            },
            "activitystreams:actor":{
               "@id":"healthcheck-user",
               "@type":"xdmAemUser"
            },
            "activitystreams:object":{
               "@type":"xdmAsset",
               "xdmAsset:asset_name":"healthcheck.png",
               "xdmAsset:path":"/content/dam/healthcheck.png",
               "xdmAsset:format":"image/png"
            },
            "xdmEventEnvelope:objectType":"xdmAsset"
         }
      },
      {
         "position":"moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614",
         "event":{
            "@id":"urn:oeid:aem:61930ae6-ff2a-48fb-881d-078e862c3811",
            "@type":"xdmCreated",
            "activitystreams:published":"2018-03-06T15:19:59-08",
            "activitystreams:to":{
               "@type":"xdmImsOrg",
               "xdmImsOrg:id":"01DC1FC45956A5810A494138@AdobeOrg"
            },
            "activitystreams:generator":{
               "@type":"xdmContentRepository",
               "xdmContentRepository:root":"http://localhost-roberto-aem63:4502"
            },
            "activitystreams:actor":{
               "@id":"healthcheck-user",
               "@type":"xdmAemUser"
            },
            "activitystreams:object":{
               "@type":"xdmAsset",
               "xdmAsset:asset_name":"healthcheck.png",
               "xdmAsset:path":"/content/dam/healthcheck.png",
               "xdmAsset:format":"image/png"
            },
            "xdmEventEnvelope:objectType":"xdmAsset"
         }
      }
   ],
   "_page": {
      "last": "moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614",
      "count": 2
   }
}
```

### Starting from a specific point in time with the `seek` parameter

The Journaling API supports a `seek` query parameter, which allows you to start fetching events from a specific point in time, rather than from the oldest or most recent event. This is especially useful when you want to inspect or extract events from a particular time window.

The `seek` parameter accepts values in [ISO 8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations), such as:

* `-PT2H` (2 hours ago)
* `-P1D` (1 day ago)
* `-P5DT2H` (5 days and 2 hours ago)

For example, to fetch events starting from 2 hours ago:

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?seek=-PT2H \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

**Note:**

* Use the `seek` parameter to seek to a particular point in time in the journal. For subsequent requests, use the `since` parameter as provided in the `next` link from the API response to actually traverse the journal from that point.
* `seek` and `since` parameters cannot be used together in the same request.

### Consuming the most recent events

The Journaling endpoint URL when supplied with no query parameters returns the oldest entries in ledger, however, sometimes a client application is not interested in consuming older events. In such a case, the client application can jump straight to the "end" of the journal and start consuming events that are written to the journal after the request was made.

This can be done by specifying the query parameter `latest=true` on the first API call. For example:

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?latest=true \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```http
HTTP/1.1 204 No Content
retry-after: 10
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb>; rel="next"
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb/validate?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb>; rel="validate"
```

In most cases, there will not be any events to consume yet and the response will be a `204 No Content` response. In an extremely rare case, there might actually be events that were written in near-real time to the journal after the request was made and in such a case they will be able returned with a `200 OK` response with the same response body structure as above.

NOTE: the `latest=true` query parameter is just a way to jump to the "end" of the journal. The client applications should use the `next` links as usual to iterate over the journal from that position onward. In case the client application continues to make requests with `latest=true`, it is very likely that they will not receive any events - just because doing that is semantically equivalent of asking for "events from now onward". And the definition of "now" changes with every request that is made.

```bash
curl -X GET \
  /events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```http
HTTP/1.1 204 No Content
retry-after: 10
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb>; rel="next"
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb/validate?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb>; rel="validate"
```

Note: We picked up the `next` link and made a `GET` request to the link instead of using the `latest=true` query parameter again. Once an event is actually available, the same link would give a `200 OK` response with the event.

Also note that the `limit` query parameter can be combined with the `latest` query parameter as well. Even though the `limit` query parameter might not be needed for the first request but it is helpful because subsequent `next` links will then come with the `limit` parameter already populated.

## Event expiry

A journal will retain the events for up to 7 days of them being written. In the running analogy of a ledger, newer entries are added to the "end" whereas entries older than 7 days are removed from the "beginning" of the ledger.

### Oldest available events

The journaling endpoint URL when called without any query parameters tries to fetch the oldest events in the journal. However, because older events expire after 7 days, the best the API can do is to return the _oldest available events_ in the journal.

Hence, over time the response of the Journaling API when called without any query parameters will change. This is only because as older events expire, the starting position of the journal begins pointing to a new set of oldest available events.

For example, let's assume that the first three events in our journal got older than 7 days and have now expired. If we now try to fetch the oldest available events from the journal:

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```json
HTTP/1.1 200 OK
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb>; rel="next"

{
   "events":[
      {
         "position":"penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb",
         "event":{
            "@id":"urn:oeid:aem:5492d8d4-6fca-4d6c-a788-043ec4bf32af",
            "@type":"xdmCreated",
            "activitystreams:published":"2018-03-01T19:33:11-08",
            "activitystreams:to":{
               "@type":"xdmImsOrg",
               "xdmImsOrg:id":"01DC1FC45956A5810A494138@AdobeOrg"
            },
            "activitystreams:generator":{
               "@type":"xdmContentRepository",
               "xdmContentRepository:root":"http://localhost-roberto-aem63:4502"
            },
            "activitystreams:actor":{
               "@id":"healthcheck-user",
               "@type":"xdmAemUser"
            },
            "activitystreams:object":{
               "@type":"xdmAsset",
               "xdmAsset:asset_name":"healthcheck.png",
               "xdmAsset:path":"/content/dam/healthcheck.png",
               "xdmAsset:format":"image/png"
            },
            "xdmEventEnvelope:objectType":"xdmAsset"
         }
      }
   ],
   "_page": {
      "last": "penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb",
      "count": 1
   }
}
```

### Fetching expired events

Once an event expires, it cannot be fetched again. This means that a request that previously returned events with a `200 OK` response, after 7 days will stop returning those events, and will instead return a `410 Gone` response.

For example, now that the first three events in our journal have expired, if we again try to make the second API request in the documentation above, this is the response we will get:

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614 \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```http
HTTP/1.1 410 Gone

Events at position moose:e7ba778b-dace-4994-96e7-da80e7125233:2159b72c-e284-4899-b572-08da250e3614 have expired.
```

Once the events at a certain position have expired, that position in the journal can no longer be used to fetch more events. In such a scenario, your application will need to reset its position in the journal. To reset the position you could chose to consume events from the `oldest available position` or the `latest` position depending on your use case.

### No Events in Journal

If the Journaling API, when called without any query parameters, responds with a `204 No Content` response it signifies that there aren't actually any events in the journal. Either there may have been events in the past that have now expired, or, there never were any events in the journal.

For example, once all events in our journal expire:

```bash
curl -X GET \
  https://events-va6.adobe.io/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb \
  -H "x-ims-org-id: 4CC7D9704674CFB2138A2C54@AdobeOrg" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "x-api-key: $API_KEY"
```

```http
HTTP/1.1 204 No Content
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb>; rel="next"
Link: </events/organizations/23294/integrations/54108/f89067f2-0d50-4bb2-bf78-209d0eacb6eb/validate?since=penguin:41322b44-c2e9-4b44-8354-ba2173064d24:752f6e67-d7e4-48d3-9f51-452936268fbb>; rel="validate"
```
