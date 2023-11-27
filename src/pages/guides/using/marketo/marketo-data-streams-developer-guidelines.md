## Developer Guidelines

When setting up a project to subscribe to events, there are three ways to interact with those event subscriptions in order to receive the events.  The first is Journaling, which provides a pull model in which events can be pulled via API and stores up to 7 days of past events.  The second is Webhooks, which can be configured to send events either as single events or batched to a webhook endpoint in near real-time with the event occurrence.  Third is Runtime, where you can set up your own custom function within Adobe that events will automatically run through near-real time.

### Journaling

[Getting Started with Journaling](../../journaling_intro.md)

Important Takeaways:

- Stores up to 7 days of history
- Can be iterated through from any previous event within the history
- Will still receive and store events even if webhook is failing
- Useful for fetching events that were missed due to webhook issues or for a pulling mechanism instead of webhook push

### Webhooks

[Getting Started with Adobe I/O Events Webhooks](/src/pages/guides/)

Webhook Endpoint Requirements:

- Handle GET and POST requests
- Respond with a 200-type response within a reasonable time period
- Challenge Request
    - GET request with challenge query parameter
    - Must respond with value of challenge query parameter
- Webhook Events
    - POST request with JSON data body with one or more events
    - *Recommended to set up webhook as batch*
