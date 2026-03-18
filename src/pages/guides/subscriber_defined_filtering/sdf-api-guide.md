---
keywords:
  - Subscriber Defined Filtering API Guide
  - SDF
  - Event Filtering
  - Filter Validation
  - Filter API
  - Create Filter
  - Update Filter
  - Delete Filter
  - Get Filters
  - Filter Examples
  - JSON Filter
  - Filter Definition
  - Custom Sample Events
  - API Prerequisites
  - Filter Testing
title: Subscriber Defined Filtering API Guide
---

# Subscriber Defined Filtering API Guide

<Fragment src="../../common/sdf-getting-started.md"/>

## Creating Your First Filter (API)

To create a subscriber filter, you'll need to make a POST request to the Adobe I/O Events API. If you haven't already configured your environment variables, please follow the documentation [here](#api-prerequisites).

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

This will add the filter to the registration identified by `registration_id`.

## Filter Definition Format

Subscriber filters use [JSON-based filter definitions](./dsl.md). Here are some examples:

### Basic Event Type Filter

```json
{
  "type": ["asset_created", "asset_updated"]
}
```

### Field-based Filtering

```json
{
  "type": ["asset_created"],
  "data": {
    "asset_type": ["image", "video"],
    "size": [{"numeric": [">", 1024]}]
  }
}
```

### Advanced Pattern Matching

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

## Validating Filters

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

For your convenience, here is an overview of the Subscriber Defined Filtering APIs with example curl commands.

### API Prerequisites

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
