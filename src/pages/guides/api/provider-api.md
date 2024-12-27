---
title: Provider API
---

# Adobe I/O Events Provider API

Our Adobe I/O Events Management API contains endpoints allowing you to manage your `Events Providers` and their associated `Event Metadata`:

* `GET` the list of the `Events Providers` you are entitled to,
* `POST`, `PUT`, `PATCH`, `DELETE` your [`Custom Events Providers`](../using/custom-events.md)

## Prerequisites

* Create a project in the [Adobe Developer Console](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/)
* Add the `I/O Management API` in your Adobe Developer Console project
  * Click on `Add to Project` > `API`
  * Select `I/O Management API`
  * On the `Add Credential` screen, create a new OAuth server-to-server credential
  * Save
  * Bookmark your workspace, as you might need to come back to it more than once, to fine tune or troubleshoot your configurations.
  * Once done, note you have an OAuth server-to-server credential defined
* Note all your project Ids
  * Browse to your Adobe Developer Console > `Project overview`
  * Find your `IMS Org Id`, and `api-key`
  * Click on `Download`, open the downloaded `json` file with your favorite editor, in there you'll find :
    * your project Id (at `project.id`)
    * your consumer Org Id (also called `consumer id`) (at `project.org.id`)
    * your workspace Id (at `project.workspace.id`)
* [Generate an OAuth Server-to-Server token](https://developer.adobe.com/developer-console/docs/guides/credentials/)

## Test Drive

Once the above are defined (and stuffed as environment variables),
you are ready to use the API, refer to its [`swagger`/`OpenApi` documentation](../api/index.md).

To help you further, here are a few sample `curl` commands.

The one below will `GET` the list of all the `Events Providers` you are entitled to use.

```bash
curl -i -v --request GET \
--url https://api.adobe.io/events/${consumerId}/providers \
--header "x-api-key: $api_key" \
--header "Authorization: Bearer $oauth_s2s_token" \
--header "Accept: application/hal+json"
```

Now you have the `Events Providers` IDs, you can list their `Event Metadata`:

```bash
curl -i -v --request GET \
  --url https://api.adobe.io/events/providers/${providerId}?eventmetadata=true \
  --header "x-api-key: $api_key" \
  --header "Authorization: Bearer $oauth_s2s_token" \
  --header "Accept: application/hal+json"
```

To create your own [`Custom Events Provider`](../using/custom_events.md) :

```bash
curl -i -v --request POST \
  --url https://api.adobe.io/events/${consumerId}/${projectId}/${workspaceId}/providers \
  --header "x-api-key: $api_key" \
  --header "Authorization: Bearer $oauth_s2s_token" \
  --header 'content-type: application/json' \
  --header 'Accept: application/hal+json' \
  --data '{
      "label": "a label of your choice for you Custom Events Provider",
      "description": "a description of your Custom Events Provider",
      "docs_url": "https://yourdocumentation.url.if.any"
    }'
```

To associate `Event Metadata` with the above:

```bash
curl -i -v --request POST \
  --url  https://api.adobe.io/events/${consumerId}/${projectId}/${workspaceId}/providers/${providerId}/eventmetadata \
  --header "x-api-key: $api_key" \
  --header "Authorization: Bearer $oauth_s2s_token" \
  --header 'content-type: application/json' \
  --header 'Accept: application/hal+json' \
    --data '{
      "event_code": "your.reverse.dns.event_code",
      "label": "a label for your event type",
      "description": "a description for your event type"
    }'
```

With the 2 commands above, your `Custom Events Provider` is ready to be used,
you can register [webhooks](../index.md) against it;
to start emitting events on its behalf use our [Events Publishing API](eventsingress-api.md).

To delete your `Custom Events Provider`:

```bash
curl -i -v --request DELETE \
  --url https://api.adobe.io/events/${consumerId}/${projectId}/${workspaceId}/providers/${providerId} \
  --header "x-api-key: $api_key" \
  --header "Authorization: Bearer $oauth_s2s_token" \
  --header "Accept: application/hal+json"
```

The environment variables used in this `curl` commands are computed from the prerequisites documented above:

* `api_key` is the api-key associated with your workspace in theAdobe Developer Console
* `oauth_s2s_token` is an OAuth Server-to-Server token generated using the set up from the same workspace
* `projectId` is the `project.id` found the `json` model of your Adobe Developer Console project (see above)
* `consumerId` is the `project.org.id` found the `json` model of your Adobe Developer Console project (see above)
* `workspaceId` is the `project.workspace.id` found the `json` model of your Adobe Developer Console project (see above)
