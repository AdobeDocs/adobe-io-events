---
title: Tracing Adobe I/O Events
---

# Tracing Adobe I/O Events

To troubleshoot issues with event-registrations, Adobe offers Debug Tracing feature. Using Debug Tracing, you can inspect the activity between the Adobe service and your integration to see what data is being sent and how your integration is responding.
Each trace comprises of the event delivery HTTP request (sent by I/O Events), and response by the consumer application. This information can be of critical importance to your debugging efforts.

<InlineAlert variant="info" slots="text"/>
Note that the maximum size of 'request-body' and 'response-body' in a trace is 2 KB. If any of these fields are larger than 2 KB, then they are trimmed at 2 KB boundary. The event payload that is delivered to your webhook is not trimmed.

**To access Debug Tracing:**

1. Log into [Adobe Developer Console](https://developer.adobe.com/console/) and select the project containing the event registration.

2. From the *Project Overview*, select the event under *Events* in the left navigation.

3. From the *Registration Details*, select the *Debug Tracing* tab. You will see a list of events, beginning with the most recent.

4. The *Debug Tracing* tab shows last 100 traces for your webhook registration. 

5. Select any trace in the list to expand its view and see more details. By default, the request (sent by Adobe) is shown, with headers and body. Select *Response* to view your integration's response to the event.

By inspecting the details of the request and response, you can examine the communication loop between Adobe and your integration to diagnose any breakdown in the flow or processing of events.  

![](./img/events-debug-tracing.png)

![](./img/events-debug-tracing-expanded.png)

### Filters

1. Use the "delivery status" dropdown to selectively fetch "success" or "error" traces only.

![](./img/events-debug-tracing-by-status.png)

2. Use the "Add Filter" button to filter traces by one or more granular metrics, like response-time, response-code and retry-deliveries. These filtering options work seamlessly offline without fetching new data from the server. 

![](./img/events-debug-tracing-filters.png)

### Retention of Traces

1. All traces older than 7 days are deleted for GDPR compliance.
 
2. Traces from last 100 'success' and 'error' deliveries are retained. All older traces are automatically deleted. 