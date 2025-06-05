---
title: Providers | Adobe I/O Events SDK
---

# Providers

For information on installing and using the SDK, please begin by reading the [getting started guide](sdk-getting-started.md).

## List All Providers

Get the list of all providers that are applicable to the organization.

### Method

```javascript
getAllProviders(consumerOrgId) ⇒ Promise.<object>`
```

|Parameters	|Type	|Description|
|---|---|---|
|`consumerOrgId`	|string	|Consumer Organization Id from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|

### Sample Response

Returns a list of all providers. This response has been truncated to show only the first provider returned.

```json
{
  "_links": {
    "self": {
      "href": "https://api.adobe.io/events/<consumerOrgId>/providers"
    }
  },
  "_embedded": {
    "providers": [
      {
        "_links": {
          "rel:event_metadata": {
            "href": "https://api.adobe.io/events/providers/<providerId>/eventmetadata"
          },
          "rel:update": {
            "href": "https://api.adobe.io/events/<consumerId>/<projectId>/<workspaceId>/providers/<provider_id>"
          },
          "self": {
            "href": "https://api.adobe.io/events/providers/<providerId>"
          }
        },
        "id": "<providerId>",
        "label": "<label>",
        "source": "<providerId>",
        "publisher": "<Publisher_Org>"
      },
     ...
    ]
  }
}
```

## Create a Provider

Create a new provider based on the given provider details.

### Method

```javascript
createProvider(consumerOrgId, projectId, workspaceId, body) ⇒ Promise.<object>
```

|Parameter	|Type	|Description|
|---|---|---|
|`consumerOrgId`	|string	|Consumer Organization ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`projectId`	|string	|Project ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`workspaceId`	|string	|Workspace ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`providerId`	|string	|Provider ID for which the event metadata is to be added.|
| [body](#sample-request-body)	|object	|JSON data that describes the event metadata.|

### Sample Request Body

Creating a provider requires a unique label for the provider which will be the name that appears in [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).

```json
{
  "label":  "<Label for provider>",
  "docs_url": "<link to documentation if present>",
  "description": "<description>"
}
```

### Response

Returns the details of the newly created provider.

## Get Provider Details

Get the details of the provider with the specified provider Id. The "source" is the URI to be used while publishing events to the event receiver. There is an optional boolean event metadata parameter that can be set to `true` or `false`. By default it is `false`. If set to `true`, it fetches all the event metadata for the provider.  

### Method

```javascript
getProvider(providerId, fetchEventMetadata? :false) ⇒ Promise.<object>
```

|Parameters|Type	|Default	|Description|
|---|---|---|---|
|`providerId`	|string		||The ID that uniquely identifies the provider to be fetched.|
|[fetchEventMetadata]	|boolean	|`false`	|Set this to `true` if you want to fetch the associated event metadata of the provider.|

### Sample Response without Metadata

Returns the details of the provider specified by the provider ID. The "source" value is the URI to be used while publishing events to I/O Events.

```json
{ 
  "_links":
    { 
      "rel:eventmetadata": {
        "href":  "https://api.adobe.io/events/providers/<providerId>/eventmetadata"
      },
      "rel:update": {
        "href": "https://api.adobe.io/events/<consumerId>/<projectId>/<workspaceId>/providers/<provider_id>"
      },
      "self": {
        "href":  "https://api.adobe.io/events/providers/<providerId>"
      }
    },
    "id": "<provider_id>",
    "label": "<label>",
    "description": "A Custom IO Events Provider",
    "source": "urn:uuid:<provider_id>",
    "publisher": "<Publisher_Org>"
}
```

### Sample Response with Metadata

Returns the details of the provider specified by the provider ID along with event metadata. The "source" value is the URI to be used while publishing events to I/O Events.

```json
{
  "_links": {
    "rel:eventmetadata": {
      "href": "https://api.adobe.io/events/providers/<provider_id>/eventmetadata"
    },
    "rel:update": {
      "href": "https://api.adobe.io/events/<consumerId>/<projectId>/<workspaceId>/providers/<provider_id>"
    },
    "self": {
      "href": "https://api.adobe.io/events/providers/<provider_id>"
    }
  },
  "_embedded": {
    "eventmetadata": [
      {
        "_links": {
          "rel:sample_event": {
            "href": "https://api.adobe.io/events/providers/<provider_id>/eventmetadata/<event_code>/sample_event"
          },
          "rel:update": {
            "href": "https://api.adobe.io/events/<consumerId>/<projectId>/<workspaceId>/providers/<provider_id>/eventmetadata/<event_code>"
          },
          "self": {
            "href": "https://api.adobe.io/events/providers/<provider_id>/eventmetadata/<event_code>"
          }
          },
        "description": "<description of the event code>",
        "label": "<event code label>",
        "event_code": "<event_code>"
      }, ...
    ]
  },
  "id": "<provider_id>",
  "label": "<label>",
  "description": "A custom events provider.",
  "source": "urn:uuid:<provider_id>",
  "publisher": "<Publisher_Org>"
}
```

## Update Provider 

Update the label of a provider based on its ID.

### Method

```javascript
updateProvider(consumerOrgId, projectId, workspaceId, providerId, body) ⇒ Promise.<object>
```

|Parameter	|Type	|Description|
|---|---|---|
|`consumerOrgId`	|string	|Consumer Organization ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`projectId`	|string	|Project ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`workspaceId`	|string	|Workspace ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`providerId`	|string	|The ID that identifies the provider to be updated.|
| [body](#sample-request-body)	|object	|JSON data that describes the provider.|

### Response

Returns the details of the updated provider.

## Delete a Provider

You can delete a provider by specifying a provider ID.

### Method

```javascript
deleteProvider(consumerOrgId, projectId, workspaceId, providerId) ⇒ Promise.<object>
```

|Parameter	|Type	|Description|
|---|---|---|
|`consumerOrgId`	|string	|Consumer Organization ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`projectId`	|string	|Project ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`workspaceId`	|string	|Workspace ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`providerId`	|string	|The ID that identifies the provider to be deleted.|

### Response

Returns HTTP Status 204 (No Content) once the deletion is successful. If the provider does not exist, HTTP Status 404 (Not Found) is returned. 