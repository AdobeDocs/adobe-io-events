---
title: Registration API
---

# Adobe I/O Events Registration API

## Prerequisites

* Create a project in the [Adobe Developer Console](/developer-console/docs/guides/projects/projects-empty/)
* Add the `I/O Management API` in your Adobe Developer Console project
  * Click on `Add to Project` > `API`
  * Select `I/O Management API`
  * On the `Add Credential` screen, create a new OAuth server-to-server credential
  * Save
  * Bookmark your workspace, as you might need to come back to it more than once, to fine tune or troubleshoot your configurations.
  * Once done, note you have an OAuth server-to-server credential defined
* Note all your org, api-key and other contextual Ids
  * Browse to your `Adobe Developer Console` > `Project overview`
  * Click on `Download`, open the downloaded `json` file with your favorite editor, in there you'll find:
    * your consumer Org Id (also called `consumer id`) (at `project.org.id`)
    * your IMS Org Id (at `project.org.ims_org_id`)
    * your credential Id (also called `application id`) (at `project.workspace.details.credentials[0].id`, note that `credentials` is an array,
       if you have more than one, pick the one where you defined your OAuth server-to-server credential
    * your client_id (also called `x-api-key`) (at `project.workspace.details.credentials[0].oauth_server_to_server.client_id`
* Define your event registration. You will need:
  * either a webhook url (accessible from the internet, reachable over HTTPS and that correctly responds to a [challenge request](/guides/index.md#the-challenge-request)), refer our [guide on getting started with I/O Events webhooks](/guides/).
  * or you can also define your [runtime action](/guides/runtime_webhooks/).<br/>
    **Note** - Do not define both.
  * a name (a user-friendly name, used for display in the Adobe Developer Console)
  * an array of events of interests, that are defined with 2 ids
    * a `provider_id`: defining one of the events source system (the events provider) your organization is entitled to,
    * a `event_code`: defining a type of the events the above system (the events provider) is emitting.

* [Generate an OAuth Server-to-Server token](/developer-console/docs/guides/credentials/)

## Test Drive

Once the above are defined (and stuffed as environment variables),
you are ready to use our [registration API](/api#operation/createRegistration)

To help you further and document the typical `Webhook Registration Payload`,
here is a sample `POST` `curl` query that will create a new Webhook Registration against `https://your.webhook`.

```bash
curl -v --request POST \
  --url https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations \
  --header "x-api-key: $api_key" \
  --header "Authorization: Bearer $oauth_s2s_token" \
  --header 'content-type: application/json' \
  --header 'Accept: application/hal+json' \
  --data '{
            "client_id": "${api_key}",
            "webhook_url": "https://your.webhook",
            "name": "a user friendly name",
            "description": "description for the registration",
            "delivery_type": "webhook",
            "events_of_interest": [{
              "provider_id": "some_provider",
              "event_code": "some_event_code"
            }]
          }'
```

Or, this `curl` query to create `Webhook Registration` with a `runtime_action`

```bash
curl -v --request POST \
  --url https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations \
  --header "x-api-key: $api_key" \
  --header "Authorization: Bearer $oauth_s2s_token" \
  --header 'content-type: application/json' \
  --header 'Accept: application/hal+json' \
  --data '{
            "client_id": "${api_key}",
            "runtime_action": "your_app/your-runtime-action",
            "name": "a user friendly name",
            "description": "description for the registration",
            "delivery_type": "webhook",
            "events_of_interest": [{
              "provider_id": "some_provider",
              "event_code": "some_event_code"
            }]
          }'
```

Once the request is successfully completed with a status of `200`, your specified webhook or runtime action will start receiving events with the specified event code as and when it is published by the specified event provider via HTTP `POST` requests.

Below is a sample `POST` `curl` query that will create a new Journal Registration:

```bash
curl -v --request POST \
  --url https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations \
  --header "x-api-key: $api_key" \
  --header "Authorization: Bearer $oauth_s2s_token" \
  --header 'content-type: application/json' \
  --header 'Accept: application/hal+json' \
  --data '{
            "client_id": "${api_key}",
            "name": "a user friendly name",
            "description": "description for the registration",
            "delivery_type": "journal",
            "events_of_interest": [{
              "provider_id": "some_provider",
              "event_code": "some_event_code"
            }]
          }'
```

Once successfully registered, events from the journal can then be retrieved using the [Journaling API](journaling_api.md).

If you wonder how to fetch the valid provider ids and event codes, look at our [Provider API](provider_api.md).
