If `Adobe I/O Events` fails to receive a successful response code from your webhook within 10 seconds, it retries the request, including a special header `x-adobe-retry-count`. This header indicates how many times the delivery of an event or a batch of events has been attempted.

<InlineAlert variant="info" slots="text"/>

Please note that if an event delivery fails with a response status code of [400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400) or [505 HTTP Version Not Supported](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505), then those events are **not retried**.

`Adobe I/O Events` will keep on retrying delivery to your webhook for **24 hours** using exponential and fixed backoff strategies. The first retry is attempted after 1 minute and the period between retries doubles after each attempt, but is at most 15 minutes (see below table outlining the retry pattern).
<br/>

| Retry Attempt        | 1  | 2  | 3  | 4  | 5   | 6   | 7   | ... |
|----------------------|----|----|----|----|-----|-----|-----|-----|
| Retry After Interval | 1m | 2m | 4m | 8m | 15m | 15m | 15m | ... |

If an event isn't delivered after 2 hours of retries, `Adobe I/O Events` marks the event registration as **Unstable**, but still keeps on attempting delivery. This gives you sufficient time to restore your webhook, and avoid it from getting marked as Disabled. Once restored, it will be marked as **Active** on the next successful event delivery.

If all retry attempts get exhausted and the event still isn't delivered (webhook not responding or responding with a non `2XX` response), `Adobe I/O Events` drops the events, marks the event registration as **Disabled**, and stops sending any further events.