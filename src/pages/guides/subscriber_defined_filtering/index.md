---
keywords:
  - Subscriber Defined Filtering
  - SDF
  - Event Filtering
  - CloudEvents
  - Filter Validation
  - Filter API
  - Create Filter
  - Update Filter
  - Delete Filter
  - Get Filters
  - Filter Examples
  - Event Volume Reduction
  - Cost Optimization
title: Subscriber Defined Filtering
---

# Adobe I/O Events Subscriber Defined Filtering

Adobe I/O Events Subscriber Defined Filtering (SDF) empowers you to create custom filters that specify exactly which events you want to receive. Instead of receiving all events for a given event type, you can now define precise filtering criteria using [JSON-based filter definitions](dsl.md), allowing you to reduce noise and focus on the events that matter most to your application.

By leveraging this feature, you can significantly reduce the number of irrelevant events your application receives, improving performance and reducing costs associated with processing unwanted events.

## What is Subscriber Defined Filtering?

SDF allows you to specify custom filter criteria for each event registration. These filters are evaluated on Adobe’s servers before events are delivered to your webhook or journal. You only receive events that match your filter, reducing the need for post-processing and minimizing unwanted traffic.

Key benefits include:
- **Reduced Event Volume**: Only receive events that match your specific criteria, filters are applied on Adobe's servers
- **Cost Optimization**: Lower processing costs by filtering out irrelevant events at the source
- **Improved Performance**: Reduce network traffic and application load

## Prerequisites

- An active Adobe I/O Events registration which is compatible with SDF:
  - Only includes [CloudEvents](https://cloudevents.io) deliveries.
  - [AWS EventBridge](../amazon_eventbridge/index.md) is not configured among the delivery methods.
- Access to the Adobe I/O Events API with proper authentication
  - You can either use the Developer Console or add your filters through the [Registration APIs](../api/registration-api.md) 
- Understanding of JSON syntax and your event payload structure
  - Check the [filtering language details](dsl.md)

## Getting Started

We assume you already have a Registration for which [SDF is applicable](#prerequisites).

### Creating Your First Filter (API)

To create a subscriber filter, you'll need to make a POST request to the Adobe I/O Events API. If you didn't already configure your environment variables, please follow the documentation [here](#prerequisites-1). 
Here's the basic structure to [add a filter to an existing registration](../../api.md#operation/createSubscriberFilter):

```bash
curl -X POST \
  "https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations/${registration_id}/filters" \
  -H "Authorization: Bearer ${oauth_s2s_token}" \
  -H "x-api-key: ${api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My First Filter",
    "description": "Filter for specific asset events",
    "subscriber_filter": "{\"type\":[\"asset_created\"], \"data\":{\"asset_type\":[\"image\"]}}"
  }'
```

This will add the SDF to the registration identified by `registration_id`.

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

Before creating a filter, you can validate it against your registered event types and custom sample events. See the [DSL reference](./dsl.md) for supported operators and syntax.

```bash
curl -X POST \
  "https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations/${registration_id}/filter/validate" \
  -H "Authorization: Bearer ${oauth_s2s_token}" \
  -H "x-api-key: ${api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriber_filter": {
      "name": "Test Filter",
      "description": "Filter validation test",
      "subscriber_filter": "{\"data\":{\"asset_type\":[\"image\"]}}"
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

For your convenience, here is an overview of the Subscriber Defined Filtering related APIs with example curl commands. 

### Prerequisites

Before using these examples, you need to set up your environment variables. See the [Registration API prerequisites](../api/registration-api.md#prerequisites) for detailed instructions on how to obtain these values:

```bash
# Set up environment variables (replace with your actual values)
export oauth_s2s_token="your_oauth_s2s_token"
export api_key="your_client_id"
export consumer_id="your_consumer_org_id"
export project_id="your_project_id"
export workspace_id="your_workspace_id"
export registration_id="your_registration_id"
```

You can also [generate an OAuth Server-to-Server token](https://developer.adobe.com/developer-console/docs/guides/credentials) if you haven't already.

### Create Filter
**POST** `/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filters`

Creates a new subscriber filter for the specified registration.

```bash
curl -X POST \
  "https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations/${registration_id}/filters" \
  -H "Authorization: Bearer ${oauth_s2s_token}" \
  -H "x-api-key: ${api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Asset Filter",
    "description": "Filter for image and video assets",
    "subscriber_filter": "{\"data\":{\"asset_type\":[\"image\", \"video\"]}}"
  }'
```

### Get All Filters
**GET** `/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filters`

Retrieves all subscriber filters for a given registration.

```bash
curl -X GET \
  "https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations/${registration_id}/filters" \
  -H "Authorization: Bearer ${oauth_s2s_token}" \
  -H "x-api-key: ${api_key}"
```

### Get Filter by ID
**GET** `/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filters/{subscriberFilterId}`

Retrieves a specific subscriber filter by its ID.

```bash
# Set the filter ID you want to retrieve
export subscriber_filter_id="your_filter_id"

curl -X GET \
  "https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations/${registration_id}/filters/${subscriber_filter_id}" \
  -H "Authorization: Bearer ${oauth_s2s_token}" \
  -H "x-api-key: ${api_key}"
```

### Update Filter
**PUT** `/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filters/{subscriberFilterId}`

Updates an existing subscriber filter.

```bash
# Set the filter ID you want to update
export subscriber_filter_id="your_filter_id"

curl -X PUT \
  "https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations/${registration_id}/filters/${subscriber_filter_id}" \
  -H "Authorization: Bearer ${oauth_s2s_token}" \
  -H "x-api-key: ${api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Asset Filter",
    "description": "Updated filter for image assets only",
    "subscriber_filter": "{\"data\":{\"asset_type\":[\"image\"]}}"
  }'
```

### Delete Filter
**DELETE** `/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filters/{subscriberFilterId}`

Deletes a subscriber filter by its ID.

```bash
# Set the filter ID you want to delete
export subscriber_filter_id="your_filter_id"

curl -X DELETE \
  "https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations/${registration_id}/filters/${subscriber_filter_id}" \
  -H "Authorization: Bearer ${oauth_s2s_token}" \
  -H "x-api-key: ${api_key}"
```

### Validate Filter
**POST** `/{consumerOrgId}/{projectId}/{workspaceId}/registrations/{registrationId}/filter/validate`

Validates a subscriber filter against the registration and optional custom sample events.

```bash
curl -X POST \
  "https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations/${registration_id}/filter/validate" \
  -H "Authorization: Bearer ${oauth_s2s_token}" \
  -H "x-api-key: ${api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriber_filter": {
      "name": "Test Filter",
      "description": "Filter validation test",
      "subscriber_filter": "{\"data\":{\"asset_type\":[\"image\"]}}"
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

## Best Practices

### Filter Design

1. **Start Simple**: Begin with basic filters and gradually add complexity
2. **Test Thoroughly**: Always validate filters before deploying to production. Remember that the filter will be applied to all delivery methods, journal included.
3. **Use Specific Patterns**: More specific filters are generally more efficient
4. **Consider Performance**: Complex filters may impact processing time, so do not add unneed operators in your definitions.

### Error Handling

- Invalid filter syntax will return a 400 error with a detailed explanation to guide you to resolution. 
- Use the validation endpoint to catch issues before deployment

## Output Event Format

Events that pass your subscriber filters maintain the same format as unfiltered events, they are not modified (Cloud Events).

## Troubleshooting

### Common Issues

**Filter Not Working**
- Verify the filter syntax is valid JSON. See [Restrictions](./dsl.md#restrictions)
- Check that field names match the event payload structure
- Ensure the filter logic matches your intended behavior. See [Practical Filter Examples](./dsl.md#practical-filter-examples)

**Performance Issues**
See [Best Practices](./dsl.md#best-practices):
- Simplify complex filters
- Avoid overly broad pattern matching
- Consider breaking complex filters into multiple simpler ones

**Validation Errors**
- Review the error message for specific syntax issues
- Use the validation endpoint to test filters
- Verify that sample events match your expected payload structure

### Support

- Check the [Adobe Developer Community forums](https://forums.adobe.com/community/developers)
- Contact [Adobe Developer Support](https://developer.adobe.com/support/)

## Migration Guide

If you're currently using event type filtering only, here's how to migrate to subscriber defined filtering:

1. **Analyze Current Usage**: Identify which events you currently discard in your application
2. **Design Filters**: Create filters that match only the events you actually process
3. **Test Filters**: Use the validation endpoint to ensure filters work correctly
4. **Deploy Gradually**: Start with non-critical registrations to test the functionality or create a copy registration and use the Journalling API to check for the correct logic of your filter without incurring additional infrastructure costs
5. **Monitor Performance**: Watch for any impact on event processing times.

This approach ensures a smooth transition while maximizing the benefits of more precise event filtering. 

### In case your registration is not compatible with SDF:

![Unsupported registration](../img/subsriber_defined_filtering/sf_incompatible_registration.png)

#### Mixed delivery formats in the Registration (Cloud Events and Adobe I/O)

You can split the registration and move all Adobe I/O event deliveries to a separate registration. Now you can add a SDF for all events in Cloud Events format.

#### AWS EventBridge enabled registrations

We currently do not support registrations delivering events to EventBridge to add SDF. Please add the filtering logic in AWS.

