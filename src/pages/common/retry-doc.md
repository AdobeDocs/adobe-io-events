If `Adobe I/O Events` fails to receive a successful response code from your webhook within 10 seconds, it retries the request, including a special header `x-adobe-retry-count`. This header indicates how many times the delivery of an event or a batch of events has been attempted.

<InlineAlert variant="info" slots="text"/>

Please note that if an event delivery fails with a response status code of [429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429), or with any response status code in the range of 500 to 599 except for [505 HTTP Version Not Supported](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505), then those events are retried. Events that fail with any other response status codes are **not retried**.

`Adobe I/O Events` will keep on retrying delivery to your webhook for **24 hours** using exponential and fixed backoff strategies. The first retry is attempted after 1 minute and the period between retries doubles after each attempt, but is at most 15 minutes (see below table outlining the retry pattern).
<br/>

| Retry Attempt        | 1  | 2  | 3  | 4  | 5   | 6   | 7   | ... |
|----------------------|----|----|----|----|-----|-----|-----|-----|
| Retry After Interval | 1m | 2m | 4m | 8m | 15m | 15m | 15m | ... |

*Please note that above retry intervals are not guaranteed and may vary in few exception scenarios.*

`Adobe I/O Events` changes the state of an event registration based on the below criteria:

 - **UNSTABLE** - Event registration is marked as unstable if, in the last 30 minutes, over 80% of at least 10 deliveries were unsuccessful.
 - **DISABLED** - Event registration is marked as disabled if, in the last 24 hours, over 80% of at least 10 deliveries were unsuccessful.
 - **ACTIVE**  - Event registration is marked as active if, in the last 30 minutes, over 80% of at least 10 deliveries were successful.

For an **Unstable** event registration `Adobe I/O Events` still keeps on attempting delivery. This gives you sufficient time to restore your webhook, and avoid it from getting marked as Disabled. Once restored, it will be marked as **Active** on the next successful event delivery.

If all retry attempts get exhausted and the event still isn't delivered (webhook not responding or responding with a non `2XX` response) or the registration is still in **Unstable** state, `Adobe I/O Events` drops the events, marks the event registration as **Disabled**, and stops sending any further events.

An email notification is sent to the admins of the organization when a webhook endpoint is marked as **Unstable** or **Disabled**.

Here you can see a sample email notification sent when a registration is marked as **Unstable**:
<img src="../guides/img/email-verified-unstable.png" alt="Unstable Event Registration Email Notification" style="float: left; border: 1px solid #000;" />

A similar email notification is sent when a registration is marked as **Disabled**.
