---
title: Getting Started with the Adobe I/O Events SDK
---

# Getting Started with the Adobe I/O Events SDK

The Adobe I/O Events SDK is an open-source SDK for interacting with Events. I/O Events provide a powerful way to integrate your applications with Adobe services and solutions. Events are triggered by an Event Provider, like Adobe Creative Cloud Assets, whenever a certain real-world action occurs, such as creating a new asset.

## Installation

```bash
npm install @adobe/aio-lib-events
```

## Usage

### Initialize the SDK

```javascript
const sdk = require('@adobe/aio-lib-events')

async function sdkTest() {
  //initialize sdk
  const client = await sdk.init('<organizationId>', '<x-api-key>', '<accessToken>', '<httpOptions>')
}
```

### Call methods using the SDK

Once the SDK has been initialized, you can then call methods provided by the `EventsCoreAPI` class to call ADobe I/O Events APIs.

When a method is called, a promise is returned. The promise represents the eventual completion of the command.

In the example below, a `catch` method is used to log errors if a command fails.

```javascript
const sdk = require('@adobe/aio-lib-events')

async function sdkTest() {
  // initialize sdk
  const client = await sdk.init('<organization id>', 'x-api-key', '<valid auth token>', '<http options>')

  // call methods
  try {
    // get profiles by custom filters
    const result = await client.getSomething({})
    console.log(result)

  } catch (e) {
    console.error(e)
  }
}
```

### Use the poller for journaling

```javascript
const sdk = require('@adobe/aio-lib-events')

async function sdkTest() {
  // initialize sdk
  const client = await sdk.init('<organization id>', 'x-api-key', '<valid auth token>', '<http options>')
  // get the journaling observable
  const journaling = client.getEventsObservableFromJournal('<journal url>', '<journaling options>')
  // call methods
  const subscription = journaling.subscribe({
    next: (v) => console.log(v), // Action to be taken on event
    error: (e) => console.log(e), // Action to be taken on error
    complete: () => console.log('Complete') // Action to be taken on complete
  })
 
  // To stop receiving events from this subscription based on a timeout
  setTimeout(() => this.subscription.unsubscribe(), <timeout in ms>)
}
```

This returns an [RxJS Observable](https://rxjs.dev/guide/observable). For more information on how to subscribe to an observable and take action on next, on error, and on complete, please refer to the RxJS documentation.

One observable can have multiple subscribers. Each subscription can be handled differently. For more details on using the poller for journaling, check `getEventsObservableFromJournal` in the [journaling documentation](sdk_journaling.md).

## Classes

### `EventsCoreAPI`

The `EventsCoreAPI` class provides methods to call your Adobe I/O Events APIs.

Before calling any method initialize the instance by calling the `init` method on it with valid values for `organizationId`, `apiKey`, `accessToken` and optional HTTP Options such as `timeout` and max number of `retries`.

## Functions

```javascript
init(organizationId, apiKey, accessToken, [httpOptions]) ⇒ Promise.<EventsCoreAPI>
```

A global function that returns a Promise that resolves with a new `EventsCoreAPI` object.

|Parameters	|Type	|Description|
|---|---|---|
|`organizationId`	|string	|The IMS Organization Id for which the provider, event metadata, etc are to be created which can be obtained using the Adobe Developer Console or Transporter API. |
|`apiKey`	|string	|The API Key (Client ID) for the project or workspace.|
|`accessToken`	|string	|An OAuth Server-to-Server Token. I/O Management Service needs to be enabled for the project or workspace. Must be created with `adobeio_api` scope, which is required for all the API calls.|
|[httpOptions]	|[EventsCoreAPIOptions](#eventscoreapioptions)	|Options to configure API calls, as shown in the table below.|

## Configuration Options

### EventsCoreAPIOptions

One can configure the following HTTP Options for the SDK. These options will be applied while making the respective API.

|Name|	Type|	Description|
|---|---|---|
|[timeout]	|number	|*Optional.* HTTP request timeout in ms. Timeout resets on redirect. 0 to disable (OS limit applies).|
|[retries]	|number	|*Optional.* The maximum number of retires that should be attempted for all APIs in case of a network error or 5xx / 429 error. By default, retries are disabled. In other words, retries = 0. Retries can be enabled by setting this option while initializing the SDK.|

### EventsJournalOptions

|Name	|Type	|Description|
|---|---|---|
|[latest]	|boolean	|*Optional.* By default, the latest is set to false and all events are read from the first valid position in the journal. If set to true, Messages will be read from the latest position. |
|[since]	|string	|*Optional.* Provide the position in the journal from where events must be fetched. If not specified and latests=false, messages are fetched from the first valid position in the journal.|
|[limit]	|number	|Maximum number of events returned in the response. The number of messages can be less than the specified limit value but will never exceed this value.|

### EventsJournalPollingOptions

|Name	|Type	|Description|
|---|---|---|
|[interval]	|number	|*Optional.* Interval at which to poll the journal; If not provided, a default value will be used. The default value is 2s and is used only in case there are no new events in the journal or in case of error. Otherwise, the new event is fetched immediately after the previous call.|

## Next steps

To begin working with `EventsCoreAPI` class methods and calling Adobe I/O Events APIs, please select from the following guides:

* [Providers](sdk_providers.md)
* [Event Metadata](sdk_event_metadata.md)
* [Publish Events](sdk_publish_events.md)
* [Webhooks](sdk_webhooks.md)
* [Journaling](sdk_journaling.md)
* [Signature verification](sdk_signature_verification.md)
