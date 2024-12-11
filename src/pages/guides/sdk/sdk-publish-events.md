---
title: Publish Events 
---

# Publish events

Event publishers can publish events to the event receiver using the Adobe I/O Events SDK. 

For information on installing and using the SDK, please begin by reading the [getting started guide](sdk-getting-started.md).

<InlineAlert slots="title, text"/>

Data Residency:

Please note that all custom events are stored in the **United States (US)** region.  

## Method

```shell
publishEvent(cloudEvent) ⇒ Promise.<string>
```

|Parameter	|Type	|Description|
|---|---|---|
|`cloudEvent`	|object	|Object to be published to event receiver in cloud event format.|

## CloudEvents Sample

The events should follow [CloudEvents 1.0](https://github.com/cloudevents/spec/blob/v1.0/spec.md) Image result for CloudEvents specification. 

As of now, only `application/json` is accepted as the `content-type` for the "data" field of the CloudEvent. 

If retries are set, publish events are retried on network issues, 5xx and 429 error response codes. 

The following shows a sample cloud event accepted by the event receiver:

```json
{
    "id": "<id>",
    "event_id": "<event_id>",
    "specversion": "1.0",
    "type": "<event-code>",
    "source": "urn:uuid:<provider-id>",
    "time": "2020-03-06T05:40:34Z",
    "datacontenttype": "application/json",
    "data": { "hello": "world" } // any json payload
}
```

## Response

The API returns 
* HTTP Status 200 (OK) if the event has been processed correctly and there are active registrations for the event,
* HTTP Status 204 (No Content) if there are no registrations for the event, 
* HTTP Status 429 (Too Many Requests) with a `Retry-After` response header if your api-key is being throttled (read our [Events Publishing API guide](../api/eventsingress-api.md) for more details).
* as well as the usual (4xx/5xx) error codes if there was an issue in processing the request.

