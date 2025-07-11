---
title: Subscriber Defined Filtering
---

# Adobe I/O Events Subscriber Defined Filtering

Adobe I/O Events Subscriber Defined Filtering (SDF) empowers you to create custom filters that specify exactly which events you want to receive. Instead of receiving all events for a given event type, you can now define precise filtering criteria using JSON-based filter definitions, allowing you to reduce noise and focus on the events that matter most to your application.

By leveraging this feature, you can significantly reduce the number of irrelevant events your application receives, improving performance and reducing costs associated with processing unwanted events.

## What is Subscriber Defined Filtering?

SDF allows you to specify custom filter criteria for each event registration. These filters are evaluated on Adobe’s servers before events are delivered to your webhook or journal. You only receive events that match your filter, reducing the need for post-processing and minimizing unwanted traffic.

Key benefits include:
- **Reduced Event Volume**: Only receive events that match your specific criteria, filters are applied on Adobe's servers
- **Cost Optimization**: Lower processing costs by filtering out irrelevant events at the source
- **Improved Performance**: Reduce network traffic and application load

## Prerequisites

- An active Adobe I/O Events registration which is compatible with SDF:
  - Only includes Cloud Events deliveries.
  - AWS EventBridge is not configured among the delivery methods.
- Access to the Adobe I/O Events API with proper authentication
  - You can either use the Developer Console or add your filters through the APIs 
- Understanding of JSON syntax and your event payload structure

## Getting Started

We assume you already have a Registration for which SDF is applicable.

### Creating Your First Filter (API)

To create a subscriber filter, you'll need to make a POST request to the Adobe I/O Events API. Here's the basic structure:

```bash
curl -X POST \
  'https://api.adobe.io/events/consumersorgid/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filters' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "My First Filter",
    "description": "Filter for specific asset events",
    "subscriber_filter": "{\"type\":[\"asset_created\"], \"data\":{\"asset_type\":[\"image\"]}}"
  }'
```

### Filter Definition Format

Subscriber filters use [JSON-based filter definitions](./dsl.md). Here are some examples:

#### Basic Event Type Filter
```json
{
  "type": ["asset_created", "asset_updated"]
}
```

#### Field-based Filtering
```json
{
  "type": ["asset_created"],
  "data": {
    "asset_type": ["image", "video"],
    "size": [{"numeric": [">", 1024]}]
  }
}
```

#### Advanced Pattern Matching
```json
{
  "type": ["asset_created"],
  "data": {
    "path": [{"prefix": "/content/dam/"}],
    "metadata": {
      "author": [{"exists": true}]
    }
  }
}
```

### Validating Filters

Before creating a filter, you can validate it against your registered event types and custom sample events:

```bash
curl -X POST \
  'https://api.adobe.io/events/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filter/validate' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'Content-Type: application/json' \
  -d '{
    "subscriber_filter": {
      "name": "Test Filter",
      "description": "Filter validation test",
      "subscriber_filter": "{\"type\":[\"asset_created\"]}"
    },
    "custom_sample_events": [
      {
        "name": "sample_event",
        "sample_payload": {
          "specversion": "1.0",
          "type": "asset_created",
          "source": "urn:uuid:example",
          "id": "12345",
          "time": "2023-01-01T00:00:00Z",
          "data": {
            "asset_type": "image",
            "size": 2048
          }
        }
      }
    ]
  }'
```

## API Reference

### Create Filter
**POST** `/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filters`

Creates a new subscriber filter for the specified registration.

**Request Body:**
```json
{
  "name": "<your-filter-name>",
  "description": "<your-filter-description>",
  "subscriber_filter": "{\"data\": {\"asset_type\": [\"image\"]}}"
}
```

## Best Practices

### Filter Design

1. **Start Simple**: Begin with basic filters and gradually add complexity
2. **Test Thoroughly**: Always validate filters before deploying to production
3. **Use Specific Patterns**: More specific filters are generally more efficient
4. **Consider Performance**: Complex filters may impact processing time

### Error Handling

- Invalid filter syntax will return a 400 error with a detailed explanation to guide the user to resolution. 
- Use the validation endpoint to catch issues before deployment

## Output Event Format

Events that pass your subscriber filters maintain the same format as unfiltered events, they are not modified (Cloud Events):

```json
{
  "specversion": "1.0",
  "id": "4bc56dd4-8009-9893-2bc0-a65214f1ef02",
  "type": "asset_created",
  "source": "urn:uuid:example-source",
  "time": "2023-11-26T13:44:51Z",
  "data": {
    "asset_type": "image",
    "size": 2048576,
    "path": "/content/dam/marketing/banner.jpg"
  }
}
```

## Troubleshooting

### Common Issues

**Filter Not Working**
- Verify the filter syntax is valid JSON
- Check that field names match the event payload structure
- Ensure the filter logic matches your intended behavior

**Performance Issues**
- Simplify complex filters
- Avoid overly broad pattern matching
- Consider breaking complex filters into multiple simpler ones

**Validation Errors**
- Review the error message for specific syntax issues
- Use the validation endpoint to test filters
- Verify that sample events match your expected payload structure

### Support

For additional support with Subscriber Defined Filtering:
- Review the Adobe I/O Events documentation
- Check the Adobe Developer Community forums
- Contact Adobe Developer Support for technical assistance

## Migration Guide

If you're currently using event type filtering only, here's how to migrate to subscriber defined filtering:

1. **Analyze Current Usage**: Identify which events you currently discard in your application
2. **Design Filters**: Create filters that match only the events you actually process
3. **Test Filters**: Use the validation endpoint to ensure filters work correctly
4. **Deploy Gradually**: Start with non-critical registrations to test the functionality or create a copy registration and use the Journalling API to check for the correct logic of your filter without incurring additional infrastructure costs
5. **Monitor Performance**: Watch for any impact on event processing times.

This approach ensures a smooth transition while maximizing the benefits of more precise event filtering. 

In case your registration is not compatible with SDF:

### Mixed delivery formats in the Registration (Cloud Events and Adobe I/O)

You can split the registration and move all Adobe I/O event deliveries to a separate registration. Now you can add a SDF for all events in Cloud Events format.

### AWS EventBridge enabled registrations

We currently do not support registrations delivering events to EventBridge to add SDF. Please add the filtering logic in AWS.

