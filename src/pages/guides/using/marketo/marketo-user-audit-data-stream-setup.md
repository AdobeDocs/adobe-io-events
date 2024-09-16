---
title: Setting up Marketo User Audit Data Stream with Adobe I/O Events
---

import DeveloperGuidelines from '/src/pages/guides/using/marketo/marketo-data-streams-developer-guidelines.md'
import Debug from '/src/pages/guides/using/marketo/marketo-data-streams-debug.md'

# Setting up Marketo User Audit Data Stream with Adobe I/O Events

These instructions describe how to set up and get started using Adobe I/O Events for Marketo user driven change events.  You can use Adobe I/O for streaming Marketo user driven change events such as the modification of emails, campaigns, and landing pages.

## Introduction

User Audit Data Stream provides all the user driven change events that are shown in the MLM Audit Trail as an event stream to which you can subscribe.

## Setup User Audit Data Stream in Marketo

User Audit Data Stream is currently a Beta Product and thus cannot be enabled in Marketo without a Beta agreement.  After a Beta agreement is in place, work with your TAM and Customer Engineering team to enable User Audit Data Stream for your subscription.

## Setup Adobe I/O

See [Getting Started with Adobe I/O Events](/src/pages/index.md)

For basic instructions for this use case, starting from [console.adobe.io](/console/):

*When prompted, click the designated button to proceed*

- Select `Create new project`

  ![Create new project](../../img/console_create_new_project.png "Quick Start")

- Select `Add event`

  ![Add event](../../img/UserAuditDataStreamIOSetup2.png "Get started with your new project by adding an event subscription")

- Filter by `Experience Cloud`
- Select `Marketo User Audit Data Stream`

  ![Provider selection](../../img/UserAuditDataStreamIOSetup3.png "Select event provider")

- Subscribe to the user driven change events of your choosing

  ![Event selection](../../img/UserAuditDataStreamIOSetup4.png "Select event subscriptions")

- Set up OAuth Server-to-Server Credentials

  ![Set up credentials](../../img/UserAuditDataStreamIOSetup5.png "Set up credentials")

- Set up Event Registration

  ![Complete registration](../../img/UserAuditDataStreamIOSetup6.png "Complete registration")

  - Provide a name and description for this event subscription
  - Optionally choose whether to enable Webhook or Runtime action
    - Enable Webhook
      - We recommend batch over single webhooks
      - For `Webhook URL` a public https endpoint must be provided
      - The endpoint must be able to handle get and post requests
      - The get request must respond with the challenge query if it exists
      - The post request must respond that it received the message or the webhook will re-attempt to send several times before giving up and automatically disabling the webhook sends
    - Enable Runtime action
      - [See Setting up your Runtime Environment](/runtime/docs/guides/getting-started/)
      - Select a pre-made runtime action/runtime namespace
- After Saving

  ![Verify setup](../../img/UserAuditDataStreamIOSetup7.png "Verify setup")
  
  - Verify that the Status is `Active`
  - If Webhook was selected, verify that it successfully passed the challenge without errors

<DeveloperGuidelines/>

### Event Data Structure

*We are still finalizing the data structure as we prepare for Beta release.  While we don't expect any major changes, there may be some minor modifications.*

Events are structured in JSON format using the [CloudEvents](https://cloudevents.io/) spec

*Example Event (batch)*

````json
[
    {
        "event_id": "cf904f43-56bc-4f80-935d-a484de6e4181",
        "event": {
            "body": {
                "specversion": "1.0",
                "type": "com.adobe.platform.marketo.audit.user.email",
                "source": "https://www.marketo.com",
                "time": "2024-07-11 13:20:42.755",
                "datacontenttype": "application/json",
                "dataschema": "V2.0",
                "data": {
                    "componentId": 232459,
                    "componentType": "Email",
                    "eventAction": "approve",
                    "munchkinId": "123-ABC-456",
                    "imsOrgId": "<your_ims_org_id>@AdobeOrg",
                    "userId": "user@marketo.com"
                }
            }
        },
        "recipient_client_id": "<your_client_id>"
    },
    {
        "event_id": "e931c3ec-9d76-406b-ac89-626e9650813a",
        "event": {
            "body": {
                "specversion": "1.0",
                "type": "com.adobe.platform.marketo.audit.user.landingpage",
                "source": "https://www.marketo.com",
                "time": "2024-07-11 13:20:42.755",
                "datacontenttype": "application/json",
                "dataschema": "V2.0",
                "data": {
                    "componentId": 123321,
                    "componentType": "Landing Page",
                    "eventAction": "approve",
                    "munchkinId": "123-ABC-456",
                    "imsOrgId": "<your_ims_org_id>@AdobeOrg",
                    "userId": "user@marketo.com"
                }
            }
        },
        "recipient_client_id": "<your_client_id>"
    }
]
````

*Example Event (single)*

````json
{
    "event_id": "a9ef9c3c-bafe-48b8-9eae-bc63dfaed28c",
    "event": {
        "body": {
            "specversion": "1.0",
            "type": "com.adobe.platform.marketo.audit.user.email",
            "source": "https://www.marketo.com",
            "time": "2024-07-11 13:20:42.755",
            "datacontenttype": "application/json",
            "dataschema": "V2.0",
            "data": {
                "componentId": 232459,
                "componentType": "Email",
                "eventAction": "approve",
                "munchkinId": "123-ABC-456",
                "imsOrgId": "<your_ims_org_id>@AdobeOrg",
                "userId": "user@marketo.com"
            }
        },
        "recipient_client_id": "<your_client_id>"
    }
}
````

*Data Field Definitions:*

Field | Description
--- | ---
event_id | Unique UUID generated per event
specversion | CloudEvents version specification being used
id | Unique UUID generated per event
type | Type of event used for event subscription routing
source | Context in which an event happened
time | Timestamp of the completion of the action
datacontenttype | Content type of the data object
dataschema | User Audit Data Stream event schema version
data | Event data object
componentId | ID of the asset in Marketo
componentType | Type of the asset in Marketo
eventAction | Asset action that occurred in Marketo
munchkinId | Internal Marketo subscription identifier
imsOrgId | Internal Adobe organization identifier
userId | Email ID of the user in Marketo who completed the action

### Event List

*Note - This is a snapshot listing of most available events.  There may be some events that don't show up or no longer exist.*

Component | Event Type List
--- | ---
Default Program | clone, create, delete, edit channel, export, modify program setup, modify program token, rename
Email | approve, clone, create, delete, edit, move, rename, unapprove
Email Batch Program | approve, childUpdate, clone, create, delete, edit, edit channel, modify program schedule, modify program setup, modify program token, rename, unapprove
Email Template | approve, clone, create, delete, draftCreate, draftDiscard, edit, rename, unapprove
Engagement Program | clone, create, delete, edit channel, modify program setup, modify program stream, modify program token, rename
Event Program | clone, create, delete, edit channel, modify program schedule, modify program setup, modify program token, rename
Folder | create, delete, edit
Form | approve, clone, create, delete, draftCreate, edit, move, rename
Landing Page | approve, clone, create, delete, draftDiscard, edit, move, rename, unapprove
Landing Page Template | approve, clone, create, delete, draftCreate, draftDiscard, edit, rename, unapprove
List | clone, create, delete, rename
Marketing Folder | create, delete, edit
Nurture Program | clone, create, delete, edit channel, modify program setup, modify program stream, modify program token, rename
Segment | create, delete, edit, rename
Segmentation | approve, create, delete, draftCreated, draftDiscarded, rename, unapprove
Smart Campaign | abort, activate, clone, create, deactivate, delete, edit, modify campaign schedule, modify flow step action, modify smart list setup, move, rename
Smart List | clone, create, delete, edit, export, modify smartlist setup, rename
Snippet | approve, approve with no-draft, clone, create, delete, edit, rename, unapprove

The following events are related to access control and security:

Component | Event Type List
--- | ---
Login | login success, login failure
Role | create, delete, edit
User | create, delete, edit

<Debug/>
