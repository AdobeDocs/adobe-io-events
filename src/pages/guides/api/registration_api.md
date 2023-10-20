---
title: Registration API
---

# Adobe I/O Events Registration API

## Prerequisites

* Create a project in the [Adobe Developer Console](/developer-console/docs/guides/projects/projects-empty/)
* Add the `I/O Management API` in your Adobe Developer Console project
  * Click on `Add to Project` > `API`
  * Select `I/O Management API`
  * Create a new service account (JWT) credential screen,
  * Save
  * Bookmark your workspace, as you might need to come back to it more than once, to fine tune or troubleshoot your configurations.
  * Once done, note you have a JWT credentials defined
* Note all your org, api-key and other contextual Ids
  * Browse to your Adobe Developer Console` > `Project overview`
  * Click on `Download`, open the downloaded `json` file with your favorite editor, in there you'll find:
    * your consumer Org Id (also called `consumer id`) (at `project.org.id`)
    * your IMS Org Id (at `project.org.ims_org_id`)
    * your credential Id (also called `application id`) (at `project.workspace.details.credentials[0].id`, note that `credentials` is an array,
       if you have more than one, pick the one where you defined your jwt
    * your client_id (also called `x-api-key`) (at `project.workspace.details.credentials[0].jwt.client_id`
* Define your webhook registration. You will need :
  * either a webhook url (accessible from the internet, reachable over HTTPS and that correctly respond to a "challenge" request) see [Webhooks](/guides/)
  * or you can also define your runtime-action. See [runtime-webhooks](/guides/runtime_webhooks/). **Note** - Do not define both.
  * a name (a user-friendly name, used for display in the Adobe Developer Console)
  * an array of events of interests, that are defined with 2 ids
    * a `provider_id`: defining one of the events source system (the events provider) your organization is entitled to,
    * a `event_code`: defining a type of the events the above system (the events provider) is emitting.

* [Generate a JWT token](/developer-console/docs/guides/credentials/)

## Test Drive

Once the above are defined (and stuffed as environment variables),
you are ready to use our [registration API](/api/#operation/createRegistrationCli).

To help you further and document the typical `Webhook Registration Payload`,
here is a sample `POST` `curl` query that will create a new Webhook Registration against `https://your.webhook`.

    curl -v --request POST \
          --url https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations \
          --header "x-api-key: $api_key" \
          --header "Authorization: Bearer $jwt_token" \
          --header 'content-type: application/json' \
          --header 'Accept: application/hal+json' \
          --data '{
                    "client_id": "'"${api_key}"'",
                    "webhook_url": "https://your.webhook",
                    "name": "a user friendly name",
                    "description": "description for the registration",
                    "events_of_interest": [
                        { "provider_id": "some_provider",
                          "event_code": "some_event_code"
                        }]
                  }'

Or, this `curl` query to create `Webhook Registration` with a `runtime_action`

    curl -v --request POST \
          --url https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations \
          --header "x-api-key: $api_key" \
          --header "Authorization: Bearer $jwt_token" \
          --header 'content-type: application/json' \
          --header 'Accept: application/hal+json' \
          --data '{
                    "client_id": "'"${api_key}"'",
                    "runtime_action": "your_app/your-runtime-action",
                    "name": "a user friendly name",
                    "description": "description for the registration",
                    "events_of_interest": [
                        { "provider_id": "some_provider",
                          "event_code": "some_event_code"
                        }]
                  }'

Once done/`200` your provided webhook/ runtime-action will be POST-ed all `some_event_code` events provided by `some_provider`.

Below is a sample `POST` `curl` query that will create a new Journal Registration:

    curl -v --request POST \
          --url https://api.adobe.io/events/${consumer_id}/${project_id}/${workspace_id}/registrations \
          --header "x-api-key: $api_key" \
          --header "Authorization: Bearer $jwt_token" \
          --header 'content-type: application/json' \
          --header 'Accept: application/hal+json' \
          --data '{
                    "client_id": "'"${api_key}"'",
                    "name": "a user friendly name",
                    "description": "description for the registration",
                    "events_of_interest": [
                        { "provider_id": "some_provider",
                          "event_code": "some_event_code"
                        }],
                    "delivery_type": "journal"
                  }'

Once successfully registered, events from the journal can then be retrieved using the [Journaling API](journaling_api.md)
If you wonder how to fetch the valid provider Ids and event codes, look at our [Provider API](provider_api.md)
