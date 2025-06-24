---
title: Subscribe to Events Using Journaling | Adobe I/O Events SDK
---

# Subscribe to Events Using Journaling

Journaling is a *pull* model of consuming events, unlike [webhooks](sdk-webhooks.md) which use a *push* model. In journaling, your application will issue a series of API calls to pull batches of one or more events from the journal.

The Adobe I/O Events Journaling API response contains event data and the unique position in the journal for every event returned in that batch, and enables applications to consume events according to their own cadence and process them in bulk.

Unlike webhooks, no additional registration or other configuration is required; every application that is registered for events is automatically enabled for journaling. Journaling data is retained for 7 days.

For information on installing and using the SDK, see:

* our [getting started guide](sdk-getting-started.md)
* our [Journaling API](../api/journaling-api.md) documentation
* our [Journaling API FAQ](../../support/faq.md#journaling-faq)

## Configuration Options

The following options can be configured while calling the journaling API:

### EventsJournalOptions

| Name | Type | Description |
|---|---|---|
| [latest] | boolean | *Optional.* By default, the latest is set to false and all events are read from the first valid position in the journal. If set to true, Messages will be read from the latest position. |
| [since] | string | *Optional.* Provide the position in the journal from where events must be fetched. If not specified and latests=false, messages are fetched from the first valid position in the journal. |
| [limit] | number | Maximum number of events returned in the response. Note: unless the events are created at a high frequency, chances are the number of messages will be less than the specified limit value (see our [Journaling API](../api/journaling-api.md#limiting-the-size-of-the-batch) for more details) |

### EventsJournalPollingOptions

| Name | Type | Description |
|---|---|---|
| [interval] | number | *Optional.* Interval at which to poll the journal; If not provided, a default value will be used. The default value is 2s and is used only in case there are no new events in the journal or in case of error. Otherwise, the new event is fetched immediately after the previous call. |

## Get Events from a Journal

The `getEventsFromJournal` SDK expects a journal URL as input and `eventsJournalOptions` if required. If no parameters are specified, messages are fetched from the first valid position in the journal, and the `link.next` header in the response provides the position for the next event in the journal. Following the `link.next` link from each response will help fetch all events in order from the journal.

You can also rewind to start reading from a different position in the journal by providing the `since` query parameter in the options or as part of the journal URL.

### Method

```shell
getEventsFromJournal(journalUrl, [eventsJournalOptions]) ⇒ Promise
```

| Parameter | Type | Description |
|---|---|---|
| `journalUrl` | string | ***Required.*** URL of the journal or 'next' link to read from. `journalUrl` can be fetched by fetching the registration details. In the response body, it is the `events_url`. |
| [eventsJournalOptions] | [EventsJournalOptions](#eventsjournaloptions) | Query options to send with the URL. |

#### Sample Response

The response from the SDK contains the following as part of the json result:

|Property|Description|
|---|---|
|`events`| Array of events retrieved from the journal.|
|`links`| Links to the next/latest/current position from where the event is to be fetched.|
|`retryAfter`| If the call to journal returned 204, it means that there are no more events to be read from the journal. The `retryAfter` value extracted from the `retry-after` header in the response specifies the time in seconds after which one can try again to look for more events. *It is recommended to honor this `retryAfter` value.*|

```json
{ "events":
   [ {
       "position":"<cursor_position_of_this_event>",
       "event":
        {
            "header": "<headers_map>"
        },
          "body":
           "<json_payload>"
    } ],
  "_page":
   {
      "last": "<cursor_position_of_this_event>",
      "count": 1
   },
  "link":
   { "events":
      "https://events-va6.adobe.io/events/organizations/<consumerOrgId>/integrations/<credentialId>/<registrationId>",
     "next":
      "https://events-va6.adobe.io/events-fast/organizations/<consumerOrgId>/integrations/<credentialId>/<registrationId>?since=<cursor_to_position_of_next_event>",
     "count":
      "https://events-va6.adobe.io/count/organizations/<consumerOrgId>/integrations/<credentialId>/<registrationId>?since=<cursor_position_of_this_event>",
     "latest":
      "https://events-va6.adobe.io/events/organizations/<consumerOrgId>/integrations/<credentialId>/<registrationId>?latest=true",
     "page":
      "https://events-va6.adobe.io/events/organizations/<consumerOrgId>/integrations/<credentialId>/<registrationId>?since={position}&limit={count}",
     "seek":
      "https://events-va6.adobe.io/events/organizations/<consumerOrgId>/integrations/<credentialId>/<registrationId>?seek={duration}&limit={count}" 
    }
}
```

## Get Events Observable from Journal

Polling the journal for events and taking action on each event such as mapping, transformations,
and filtering are some common functionalities that are most useful using the Journaling API.

This method encapsulates all of the complexities of fetching events by following the `link.next` and `retry-After` headers
while you can focus on implementing the business logic of taking action on receiving events
(and as mentioned in our [Journaling API documentation](../api/journaling-api.md#fetching-the-next-batch-of-newer-events-from-the-journal),
utilizing this link is **strongly recommended**).

### Method

```shell
getEventsObservableFromJournal(journalUrl, [eventsJournalOptions], [eventsJournalPollingOptions]) ⇒ Observable
```

| Parameter | Type | Description |
|---|---|---|
| `journalUrl` | string | ***Required.*** URL of the journal or 'next' link to read from. `journalUrl` can be fetched by fetching the registration details. In the response body, it is the `events_url`. |
| [eventsJournalOptions] | [EventsJournalOptions](#eventsjournaloptions) | Query options to send with the URL. |
| [eventsJournalPollingOptions] | [EventsJournalPollingOptions](#eventsjournalpollingoptions) | Journal polling options. |

#### Sample Code

This method returns an [RxJS Observable](https://rxjs.dev/guide/observable) which you can fetch and subscribe to in order to listen to events. The following code explains how to get started with journaling:

```javascript
const sdk = require('@adobe/aio-lib-events')
 
async function sdkTest() {
  // initialize sdk
  const client = await sdk.init('<organization id>', 'x-api-key', '<valid auth token>', '<http options>')
  // get the journaling observable
  const journaling = client.getEventsObservableFromJournal('<journal url>', '<journaling options>')
```

The simplest way to subscribe and take action on the next event is as follows:

```javascript
journaling.subscribe(
    x => console.log('onNext: ' + x), // any action onNext event
    e => console.log('onError: ' + e.message), // any action onError
    () => console.log('onCompleted')) //action onComplete
```

RxJS provides a lot of flexibility in handling events. You can compose functions declaratively in sequence to work on the emitted data.

For more complicated use cases, you can make use of [RxJS operators](https://rxjs.dev/guide/operators) to filter certain events, transform the events, etc. Such an implementation would look something like:

```javascript
const { filter, map } = require('rxjs/operators')

...
const subscription = journaling.pipe(
    filter(e => e.event.header.msgType === '<message_type>'),// any filtering predicate that returns a boolean
    takeWhile(e => e.event.header.msgId !== '<message_id>'),// if they wish to read messages from start till a particular position or any other condition
    map(e => e.event.body) // transform the event or any other mapping
  ).subscribe({
    next: (v) => {
      console.log(JSON.stringify(v)) // any actions they want to take with event can be implemented here
    },
    error: (e) => console.log(e),
    complete: () => console.log('Observer A is complete')
  })
  
setTimeout(() => {
  subscription.unsubscribe()
}, 10000)
```

You can also have multiple subscriptions to a single observable, each transforming and filtering events on different criteria or applying any other operators as follows:

```javascript
const { filter, map } = require('rxjs/operators')
 
 
...
const subscription1 = journaling.pipe(
    filter(e => e.event.header.msgType === '<message_type_1>'),
    map(e => <transformed_event_1>)
  ).subscribe({
    next: (v) => {
      // action to be executed on receving events of message_type_2
    },
    error: (e) => console.log(e),
    complete: () => console.log('Observer A is complete')
  })
  
setTimeout(() => {
  subscription1.unsubscribe()
}, 10000)
 
 
const subscription2 = journaling.pipe(
    filter(e => e.event.header.msgType === '<message_type_2>',
    map(e => <transformed_event_2>)
  ).subscribe({
    next: (v) => {
      // action to be executed on receving events of message_type_2
    },
    error: (e) => console.log(e),
    complete: () => console.log('Observer B is complete')
  })
  
setTimeout(() => {
  subscription2.unsubscribe()
}, 20000)
 
...
```
