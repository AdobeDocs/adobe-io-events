# Adobe I/O Events Frequently Asked Questions (FAQ)

## General questions

### Which events are currently supported by `Adobe I/O Events`?

We are adding new events providers regularly, at the time of writing, the following Adobe solutions are supported via I/O Events:

* [Creative Cloud Assets](https://www.adobe.com/go/devs_events_cc_docs) (deprecated) 
* Creative Cloud Libraries (replacing the above)
* Imaging API
* Adobe XD

* Adobe Document Cloud

* [Platform notifications](https://www.adobe.com/go/devs_events_aep_docs)
* [Analytics Triggers](https://www.adobe.com/go/devs_events_triggers_docs)
* [Marketo User Audit Data Stream](../guides/using/marketo-user-audit-data-stream-setup.md)
* [Privacy Service](https://www.adobe.com/go/devs_events_privacy_docs) 
* [Cloud Manager](https://www.adobe.com/go/devs_events_cloudmanager_docs) 
* Asset Compute
* [AEM authors](../guides/using/aem/index.md) 
* Adobe Campaign Standard

You can also register [your own `Custom Events Provider`](../guides/using/custom_events.md)

### What is the guarantee of events delivery? 

`Adobe I/O Events` provides durable delivery. **It delivers each event at least once for each registration**. 
If the webhook endpoint doesn't acknowledge receipt of an event, `Adobe I/O Events` retries the delivery of the event (see the [webhook FAQ](#webhook-faq) section below).

Note that `Adobe I/O Events`:
* Currently doesn't guarantee the order of events delivery, so subscribers may receive them out of order (this applies to our Journaling API as well).
* May send the same events more than once.
* Is adding a unique event uuid in the event payload.
* Is passing the same uuid in the `x-adobe-event-id` header of the webhook request.

### Do you guarantee the order of events delivery? 

No, see the paragraph above for details.

### What permissions are required to use I/O Events?  

The various required permissions and entitlements vary according to the events provider, (see the list above) some are opened to all Adobe customers, others to enterprise developers or administrators only.
Some of these events providers will require licensing, while others will be available to all. 
Please reach out to your Adobe account manager for licensing related questions.

### Which subscription types do I/O Events support?  

I/O Events supports [webhooks](../guides/index.md) for near-real time notifications (push) as well as [a Journaling API](../guides/journaling_intro.md) (pull) to grab groups of events at a time.

### Are there other ways to access I/O Events?

Yes: 
- [Azuqua](https://www.azuqua.com) provides connectors for both AEM events and Analytics Triggers events.
- [Microsoft Flow](https://flow.microsoft.com) has a connector for Creative Cloud Asset events.

## Webhook FAQ

### What happens if my webhook is down? Why is my event registration marked as `Unstable`?

If `Adobe I/O Events` fails to receive a successful response code from your webhook within 10 seconds, it retries the request, including a special header `x-adobe-retry-count`. This header indicates how many times the delivery of an event or a batch of events has been attempted.

`Adobe I/O Events` will keep on retrying delivery to your webhook for **24 hours** using exponential and fixed backoff strategies. The first retry is attempted after 1 minute and the period between retries doubles after each attempt, but is at most 15 minutes (see below table outlining the retry pattern).
<br/>

| Retry Attempt        | 1  | 2  | 3  | 4  | 5   | 6   | 7   | ... |
|----------------------|----|----|----|----|-----|-----|-----|-----|
| Retry After Interval | 1m | 2m | 4m | 8m | 15m | 15m | 15m | ... |

If an event isn't delivered after 2 hours of retries, `Adobe I/O Events` marks the event registration as **Unstable**, but still keeps on attempting delivery. This gives you sufficient time to restore your webhook, and avoid your event registration from getting marked as Disabled. Once restored, it will be marked as **Active** on the next successful event delivery.

If all retry attempts get exhausted and the event still isn't delivered (webhook not responding or responding with a non `2XX` response), `Adobe I/O Events` drops the events, marks the event registration as **Disabled**, and stops sending any further events.

Note: You can then use the [Journaling API](../guides/journaling_intro.md) to **retrieve** events that were published while your webhook was down. Once your webhook gets restored, you can re-enable your event registration (see the question below).

### How can I re-enable my event registration (disabled after a downtime)? How can I retrieve the events I missed?

To restart the flow of requests, fix the problem preventing your webhook from responding. Then, log into the `Adobe Developer Console` and edit your event registration. This re-triggers a webhook challenge request, and eventually a re-activation of your event registration.

While your event registration is marked `Disabled`, Adobe will continue to log events in your Journal, allowing you to retrieve all events for the past 7 days (see our [Journaling documentation](../guides/journaling_intro.md)).

### What happens if my webhook is unable to handle a specific event but handles all other events gracefully?

In this case, we will continue to retry the event delivery for 24 hours, but if all retry attempts get exhausted and the event still isn't delivered, then the event will be dropped.
However, do note that the event registration will remain as **Active** and shall continue to process events.

### Does every Adobe I/O Events webhook HTTP request come with a signature? 
     
Yes, to allow your webhook to reject forged requests, Adobe I/O Events adds a [`x-adobe-signature`](../guides/index.md#security-considerations) header to every single HTTP request it makes to your webhook URL (even the first `challenge` GET request).
      
### Do Adobe I/O Events notifications come from a range of static IPs? 

We had a few customers asking this in the context of securing their endpoint;  their requirement: accepting traffic only from a range of static IPs.

The answer is **no**. Adobe I/O Events notifications services are hosted on AWS and Azure, their IPs change over time.

*Reminder*: Each Adobe I/O Events HTTP request holds a signature header (see the previous question), however if this is not enough and if the above is a non-negotiable requirement, you may choose to use the pull model instead, and leverage our [Journaling API](../guides/journaling_intro.md).

### What is the size of notifications when in batch delivery style?
     
When registering a webhook to receive Adobe I/O Events notifications, you can select the delivery style:
* Either receiving one event at a time ("Single"): each event resulting in an HTTP request to the webhook URL.
* Or multiple events together ("Batch"): in this case, HTTP requests will still remain near-real time, the batch size will vary depending on the incoming traffic and the batch size will be at max 2MB bytes and will contain a maximum of 100 events.

## Journaling FAQ

### How far back are I/O Events available via the Journaling API?

Adobe I/O stores 7 days of subscribed events that can be retrieved via the Journaling API.

### Why do I only get one event, irrespective of the `limit` I use?

Our Journaling API `limit` parameter is used to specify the “maximum” number of events that may be returned by the API.
It is used to specify an upper bound to the number of events to ensure that the consumer can handle the response gracefully. The behavior you observe is expected. 
It is perfectly ok to get 1 event when you specify a limit greater than 1. 
The number of events that gets returned in a response can vary depending on the incoming traffic (upper bound being equal to the limit parameter).
See our [Journaling API documentation](../guides/api/journaling_api.md#limiting-the-size-of-the-batch) for more details.
     
### Is there a way to get the list of events all together at once?
     
No, this query is not supported in our journaling API, however, using the `since` parameter you can follow the journal [rel=next Link](../guides/api/journaling_api.md#fetching-the-next-batch-of-newer-events-from-the-journal) response header till the end.     
     
## Custom Events FAQ

### I created a `Custom Events Provider`, why is it not showing up in the `Adobe Developer Console`?

If you successfully create a `Custom Events Provider` using our [Provider API](../guides/api/provider_api.md), it will only appear in the `Adobe Developer Console` once you create at least one `Event Metadata` associated with it.

Once associated with its `Event Metadata`, your `Custom Events Provider` will be ready to be used:
1. It will appear in your (refreshed) `Adobe Developer Console` project.
2. You will be able to register against it.
3. And to start emitting events on its behalf use our [Events Publishing API](../guides/api/eventsingress_api.md).
     
## JWT FAQ

### What is JWT and what is it used for? 

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. 
For more information on JSON Web Tokens, see [Introduction to JSON Web Tokens](https://jwt.io/introduction/) on JWT.io.

To establish a secure service-to-service session with the `Adobe I/O Events` API, you must create a JSON Web Token (JWT) that encapsulates the identity of your integration, and then exchange it for an access token.

Every request to an `Adobe I/O Events` API must then include this (JWT exchange originated) access token in the Authorization header, along with the API Key that was generated when you created the Service Account Integration in the Adobe Developer Console (see our [JWT Service Account Authentication](/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md) documentation for more details).

Note that you should pay special attention to your [JWT Metascopes](/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/Scopes.md) describing the set of authorization scopes you want to claim with this jwt token (see next question for details)

### What are the metascopes my JWT token should claim? What are the access token authorization scopes expected by `Adobe I/O Events` APIs?

* Our [AEM](../guides/using/aem/index.md) connector leverages an API that requires your access token to hold a `event_receiver_api` scope; for this you need to add the `I/O Events` API in your `Adobe Developer Console` workspace adding `/s/event_receiver_api` metascope to your JWT claim (see the [AEM console setup documentation](../guides/using/aem/aem_console_setup.md))
* For all the other [`Adobe I/O Events` APIs](../guides/api/index.md), they require your access token to hold a `adobeio_api` scope coming with the `I/O Management API`, adding a `s/ent_adobeio_sdk` metascope to the JWT claim.

### Where can I find more documentation on JWT Service accounts and how to set them up? 

See our [JWT (Service Account) Authentication](/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md) documentation.

### Do you have sample libraries for JWT? 

Yes:
- Python: https://pyjwt.readthedocs.io/en/latest/
- .Net: https://github.com/jwt-dotnet/jwt
- Java: https://github.com/jwtk/jjwt
- Objective C: https://github.com/yourkarma/JWT
- Node.js: https://github.com/auth0/node-jsonwebtoken
- Node.js: https://www.npmjs.com/package/jsonwebtoken
- Node.js: https://www.npmjs.com/package/jwt-simple
- JavaScript tutorial: - https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html
- Javascript: http://kjur.github.io/jsrsasign/

## Analytics Triggers Events

### Where can I find instructions on setting up Analytics Triggers for I/O?

You'll find it in this guide at [Integrate Analytics Triggers with Adobe I/O Events](../guides/using/analytics-triggers-event-setup.md). 

### Where do I configure Analytics Triggers for I/O? 

Analytics Triggers are set up and managed via the Experience Cloud Activation UI. Once a Trigger has been created, it will appear in the `Adobe Developer Console` under the available I/O Events list.

### What does an Analytics Triggers payload look like?

Here is a sample:

```json
{
  "event_id": "52ebf673-8aeb-4347-8852-bf86a18292e4",
  "event": {
    "envelopeType": "DATA",
    "partition": 13,
    "offset": 438465548,
    "createTime": 1516324157242,
    "topic": "triggers",
    "com.adobe.mcloud.pipeline.pipelineMessage": {
      "header": {
        "messageType": "TRIGGER",
        "source": "triggers",
        "sentTime": 1516324157228,
        "imsOrg": "C74F69D7594880280A495D09@AdobeOrg",
        "properties": [
          {
            "name": "trace",
            "value": "false"
          },
          {
            "name": "sourceFirstTimestamp",
            "value": "1516324106"
          },
          {
            "name": "sourceLastTimestamp",
            "value": "1516324128"
          },
          {
            "name": "triggerFiredTimestamp",
            "value": "1516324153995"
          }
        ],
        "messageId": "1a69fc40-7600-4928-b7bb-d66588a045f3"
      },
      "com.adobe.mcloud.protocol.trigger": {
        "triggerId": "697514a8-3337-4efc-ba75-1f0ba896c288",
        "triggerTimestamp": 1516324157228,
        "mcId": "00000000000000000000000000000000000000",
        "enrichments": {
          "analyticsHitSummary": {
            "dimensions": {
              "eVar3": {
                "type": "string",
                "data": [
                  "localhost:4502/content/we-retail.html",
                  "localhost:4502/content/we-retail/us/en/men.html",
                  "localhost:4502/content/we-retail.html",
                  "localhost:4502/content/we-retail/us/en.html",
                  "localhost:4502/content/we-retail/us/en.html",
                  "localhost:4502/content/we-retail/us/en/products/men/shirts/eton-short-sleeve-shirt.html",
                  "localhost:4502/content/we-retail/us/en/products/men/shirts/eton-short-sleeve-shirt.html",
                  "localhost:4502/content/we-retail/us/en/men.html",
                  "localhost:4502/content/we-retail/us/en/user/cart.html"
                ],
                "name": "eVar3",
                "source": "session summary"
              },
              "pageURL": {
                "type": "string",
                "data": [
                  "http://localhost:4502/content/we-retail.html",
                  "",
                  "",
                  "http://localhost:4502/content/we-retail/us/en.html",
                  "",
                  "",
                  "http://localhost:4502/content/we-retail/us/en/products/men/shirts/eton-short-sleeve-shirt.html",
                  "http://localhost:4502/content/we-retail/us/en/men.html",
                  "http://localhost:4502/content/we-retail/us/en/user/cart.html"
                ],
                "name": "pageURL",
                "source": "session summary"
              }
            },
            "products": {}
          }
        },
        "triggerPath": [
          {
            "timestamp": 1516324118010,
            "stateId": "start_and_and",
            "transition": "null"
          },
          {
            "timestamp": 1516324148711,
            "stateId": "vmi_and_1",
            "transition": "conditional -> select * where evars.evars.eVar3 like 'localhost:4502/content/we-retail/us/en/user/cart.html'"
          },
          {
            "timestamp": 1516324148711,
            "stateId": "notify_wait",
            "transition": "states visited -> [StateVisitedNode [stateId=vmi_and_1, count=1, operator=GE]]"
          },
          {
            "timestamp": 1516324153994,
            "stateId": "notify",
            "transition": "inactive_timeout -> 5"
          }
        ]
      }
    }
  }
```
  
**I receive errors trying to access Triggers.**  

The company/org is entitled for Analytics Triggers but I receive the following errors when trying to set up a Trigger:

![Report Suite null](./img/events_FAQ_01.png "Report Suite null")

![Error fetching Report Suites](./img/events_FAQ_02.png "Error fetching Report Suites")

**To fix:**  Ensure that Triggers is enabled in the Analytics Product Profile in the Admin Console. 

![Enabling Triggers in Admin Console](./img/events_FAQ_03.png "Enabling Triggers in Admin Console")
