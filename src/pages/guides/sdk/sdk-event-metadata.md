---
title: Event Metadata | Adobe I/O Events SDK
---

# Event Metadata

For information on installing and using the SDK, please begin by reading the [getting started guide](sdk_getting_started.md).

## Get All Event Metadata for Provider

This method returns a list of all event metadata for a given provider.

#### Method

```javascript
getAllEventMetadataForProvider(providerId) ⇒ Promise.<object>
```

|Parameter	|Type	|Description|
|---|---|---|
|`providerId`	|string	|The ID that uniquely identifies the provider whose event metadata is to be fetched.|

#### Sample Response

```json
{ "_links":
        { "self":
            {
                "href": "https://api.adobe.io/events/providers/<provider-id>/eventmetadata"
            }
        },
        "_embedded":
        {
            "event_metadata":  [
                {  "_links": {
                    "rel:sample_event": {
                         "href": "https://api.adobe.io/events/providers/<provider-id>/eventmetadata/<event-code-1>/sample_event"
                    },
                     "rel:update": {
                        "href": "https://api.adobe.io/events/<consumerId>/<projectId>/<workspaceId>/providers/<provider-id>/eventmetadata/<event-code-1>"
                    },
                    "self": {
                        "href": "https://api.adobe.io/events/providers/<provider-id>/eventmetadata/<event-code-1>"
                    }
                 },
                "description": "<description>",
                "label": "<label>",
                "event_code": "<event-code-1>",
            },
            ...
         ]
    }
}
```

## Get Event Metadata for Given Provider and Event Code

You can return metadata for a single event by providing a provider ID and an event code.

#### Method

```javascript
getEventMetadataForProvider(providerId, eventCode) ⇒ Promise.<object>
```

|Parameter|	Type	|Description|
|---|---|---|
|`providerId`	|string|The ID that uniquely identifies the provider whose event metadata is to be fetched.|
|`eventCode`	|string	|The specific event code for which the details of the event metadata is to be fetched.|

#### Sample Response

```json
{
  "_links": {
    "rel:sample_event": {
      "href": "https://api.adobe.io/events/providers/<provider-id>/eventmetadata/<event-code>/sample_event"
    },
    "rel:update": {
      "href": "https://api.adobe.io/events/<consumerId>/<projectId>/<workspaceId>/providers/<provider-id>/eventmetadata/<event-code>"
    },
    "self": {
      "href": "https://api.adobe.io/events/providers/<provider-id>/eventmetadata/<event-code>"
    }
  },
  "description": "<description>",
  "label": "<label>",
  "event_code": "<event-code>"
}
```

## Create Event Metadata for a Provider

This function is used to add various event types for a provider.

#### Method

```javascript
createEventMetadataForProvider(consumerOrgId, projectId, workspaceId, providerId, body) ⇒ Promise.<object>
```

|Parameter	|Type	|Description|
|---|---|---|
|`consumerOrgId`	|string	|Consumer Organization ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`projectId`	|string	|Project ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`workspaceId`	|string	|Workspace ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`providerId`	|string	|Provider ID for which the event metadata is to be added.|
| [body](#sample-creation-request-body)	|object	|JSON data that describes the event metadata.|

#### Sample Creation Request Body

```json
{
    "label": "test-label",
    "description": "Test for SDK 1",
    "event_code": "event_code_1"
}
```

## Update Event Metadata for a Provider

You can update the description and label of the event metadata by providing the event code of the event metadata to be updated. 

#### Method

```javascript
updateEventMetadataForProvider(consumerOrgId, projectId, workspaceId, providerId, eventCode, body) ⇒ Promise.<object>
```

|Parameter	|Type	|Description|
|---|---|---|
|`consumerOrgId`	|string	|Consumer Organization ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`projectId`	|string	|Project ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`workspaceId`	|string	|Workspace ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`providerId`	|string	|Provider ID for which the event metadata is to be added.|
|`eventCode`| string|Event Code of the event metadata to be updated.|
| [body](#sample-update-request-body)	|object	|JSON data that describes the updated event metadata.|

#### Sample Update Request Body

```json
{
    "label": "new-label",
    "description": "Updated description for SDK 1",
    "event_code": "event_code_1"
}
```

## Delete Event Metadata

You can delete metadata for a specific event by providing the event code along with the associated provider ID.

#### Method

```javascript
deleteEventMetadata(consumerOrgId, projectId, workspaceId, providerId, eventCode) ⇒ Promise
```

|Parameter	|Type	|Description|
|---|---|---|
|`consumerOrgId`	|string	|Consumer Organization ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`projectId`	|string	|Project ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`workspaceId`	|string	|Workspace ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`providerId`	|string	|Provider ID for which the event metadata is to be deleted.|
|`eventCode`| string|Event Code of the event metadata to be deleted.|

#### Response

Returns HTTP Status 204 (No Content) once the deletion is successful. If the `eventCode` or `providerId` does not exist, HTTP Status 404 (Not Found) is returned.

## Delete All Event Metadata

You can delete all event metadata for a provider by specifying a provider ID.

#### Method

```javascript
deleteAllEventMetadata(consumerOrgId, projectId, workspaceId, providerId) ⇒ Promise
```

|Parameter	|Type	|Description|
|---|---|---|
|`consumerOrgId`	|string	|Consumer Organization ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`projectId`	|string	|Project ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`workspaceId`	|string	|Workspace ID from [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`providerId`	|string	|Provider ID for which the event metadata is to be deleted.|

#### Response

Returns HTTP Status 204 (No Content) once the deletion is successful. If the `providerId` does not exist, HTTP Status 404 (Not Found) is returned.