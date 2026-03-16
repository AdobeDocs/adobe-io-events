---
title: Adobe Admin Console Audit Logs Event Format
---

# Admin Console Audit Logs Event Format

The event format is defined by the industry standard [Open Cybersecurity Schema Format (OCSF)](https://ocsf.io),
using [v1.6 of the schema](https://schema.ocsf.io/1.6.0/). No schema extensions are used, but the
*Cloud*, *Date/Time* and *Host* profiles are used. 

Currently, the audit events for Admin Console will fall into two of the standard OCSF categories: 

1. [Identity & Access Management](https://schema.ocsf.io/1.6.0/categories/iam)
2. [Application Activity](https://schema.ocsf.io/1.6.0/categories/application)

As new features and capablities are added to Admin Console, and as we work to capture events not
currently captured in the audit log, you should expect that new events will appear as they are
released. Using the OCSF format provides a standard way for us to capture all the different event
types that exist today and in the future. 

The OCSF format is already supported by a broad range of tools, making it easier for you to
connect with your existing systems.

## Cloud Events Wrapper

As with other event providers in I/O Events, the audit log payload is wrapped in a standard [Cloud
Events](https://cloudevents.io/) 1.0.2 event. The `data` field contains the full OCSF audit log
event itself. A full example event is shown at the end of this page for reference.

The `source` and `subject` attributes can be used to identify which Admin Console and allows for
filtering and routing of events without inspecting the `data` payload. This also allows you
to match events to the respective Admin Console in the case you have multiple consoles (e.g., with 
Global Admin Console).


```json
{
  "datacontenttype": "application/json",
  "id": "385eedd5-1175-4cc2-9983-cd5058d69763",
  "source": "https://adminconsole.adobe.com/33911245002965270A49422F@AdobeOrg",
  "specversion": "1.0",
  "subject": "33911245002965270A49422F@AdobeOrg",
  "time": "1732021086000",
  "type": "com.adobe.adminconsole.auditlogs.v1",
  "data": {
    ...
  },
}
```

## Standard Data

OCSF provides a standard structure for the events, much of which is self-explanatory. All events
will come with additional data as standard, so you can match events back to your consoles in the
case you have multiple consoles (e.g., in a Global Admin structure).

### Actor

[OCSF Definition for Actor Object](https://schema.ocsf.io/1.6.0/objects/actor)

> The Actor object contains details about the user, role, application, service, or process that initiated or performed a specific activity. Note that Actor is not the threat actor of a campaign but may be part of a campaign.

##### 

```json
"actor": {
    "user": {
      "email_addr": "first.last@example.com",
      "uid": "93EF56A00D449C80A494229@c62f24c00b5b7e0e0a494004",
      "type": "User",
      "type_id": 1
    }
},
```

##### Adobe Employee (e.g., agent)

```json
"actor": {
    "user": {
      "name": "Adobe Employee",
      "type": "Adobe Employee",
      "type_id": 99
    }
},
```

##### System

For scenarios that rely on Adobe making changes to your org in an automated fashion, the actor
will be categorised as `System`. Typically, these actions are carried out by internal
provisioning systems (e.g,. when you purchase a new product that performs some initial set up). 
In the future, we plan to enhance these System events with more information for improved
transparency around these changes, but there is no timeline on this at present.

```json
"actor": {
    "user": {
      "name": "System",
      "type": "System",
      "type_id": 3
    }
},
```

### Cloud

[OCSF Definition for Cloud Object](https://schema.ocsf.io/1.6.0/objects/cloud)

> The Cloud object contains information about a cloud or Software-as-a-Service account or similar construct, such as AWS Account ID, regions, organizations, folders, compartments, tenants, etc.

Every event will have the `cloud` stanza populated with the name and ID of your console -
the ID is the same as you see in the browser URL. The `provider` will always be `Adobe`.

```json
"cloud": {
  "org": {
    "name": "Your Org Name",
    "uid": "33911245002965270A49422F@AdobeOrg"
  },
  "provider": "Adobe"
}
```

### Device

[OCSF Definition for Device Object](https://schema.ocsf.io/1.6.0/objects/device)

> The Device object represents an addressable computer system or host, which is typically connected to a computer network and participates in the transmission or processing of data within the computer network.

Every event will have the `device` stanza populated with information about the device the action
was taken from. For users of Admin Console, this will include the IP address of the machine where
available.
The `type` will always map to `Unknown`. The IP address will be available in the `ip` field:

```json
"device": {
    "ip": "198.51.100.0",
    "type": "Unknown",
    "type_id": 0
},
```

Note that in the case of actions taken by Adobe employees or via internal systems
(see [Actor](#actor) above), there will be **no** `ip` address available, and the `name` field will be
populated with `Adobe Premises`:

```json
"device": {
    "name": "Adobe Premises",
    "type": "Unknown",
    "type_id": 0
},
```

### Metadata

[OCSF Definition for Metadata Object](https://schema.ocsf.io/1.6.0/objects/metadata)

> The Metadata object describes the metadata associated with the event.

The `event_code` field maps to the *Event Type* and *Event Sub Type* values that you see in the
Admin Console Audit Log view and CSV export today. This allows you to map what you see in this
event format back to what you see in the CSV, for example. The OCSF fields for `category`, `class`
and `activity` are the ways SIEM tools will classify the events, however.

As above, the `tenant_uid` will be your org/console ID. 

The `version` value is the internal version - you can review the Changelog for more information, but this indicates that we've addressed bugs, added support for new events, etc. The overall output will remain in the OCSF payload format.

```json
"metadata": {
  "event_code": "{eventType}:{eventSubType}",
  "product": {
    "name": "Adobe Admin Console Audit Log",
    "vendor_name": "Adobe"
  },
  "profiles": [
    "cloud",
    "datetime",
    "host"
  ],
  "tenant_uid": "23911245002965270A49422F@AdobeOrg",
  "uid": "ddfd86f1-363b-4ca8-a1bb-d47d6f148a4f",
  "version": "2026.02.07"
}
```

### Other Fields

There are a few other fields at the top level of the event that are standardised by OCSF. The descriptions below are all taken from the OCSF 1.6 Schema definition.

| Field    | Description                                                                     |
|------------|---------------------------------------------------------------------------------|
| `activity_id` | The normalized identifier of the activity that triggered the event. |
| `activity_name` | The event activity name, as defined by the activity_id. |
| `category_name` | The event category name, as defined by category_uid value. |
| `category_uid` | The category unique identifier of the event. |
| `class_name` | The event class name, as defined by class_uid value. |
| `class_uid` | The unique identifier of a class. A class describes the attributes available in an event. |
| `severity` | The event/finding severity, normalized to the caption of the severity_id value. This will always be `Informational`, as the audit logs simply capture events, and make no attempt to interpret them. |
| `severity_id` | The normalized identifier of the event/finding severity. This will always have the value `1`. |
| `time` | The normalized event occurrence time or the finding creation time (in milliseconds since epoch). |
| `time_dt` | The normalized event occurrence time or the finding creation time (in ISO-8601 format). |
| `type_name` | The event/finding type name, as defined by the type_uid. |
| `type_uid` | The event/finding type ID. It identifies the event's semantics and structure. The value is calculated by the logging system as: class_uid * 100 + activity_id. |


## Full Example Event

This event shows a user being granted the **System Admin** role in the given Admin Console:

```json
{
    "specversion": "1.0",
    "type": "com.adobe.adminconsole.auditlogs.v1",
    "id": "385eedd5-1175-4cc2-9983-cd5058d69763",
    "source": "https://adminconsole.adobe.com/33911245002965270A49422F@AdobeOrg",
    "subject": "33911245002965270A49422F@AdobeOrg",
    "time": "1732021086000",
    "datacontenttype": "application/json",
    "data": {
        "activity_id": 1,
        "activity_name": "Assign Privileges",
        "actor": {
            "user": {
                "email_addr": "first.last@example.com",
                "uid": "93EF56A00D449C80A494229@c62f24c00b5b7e0e0a494004",
                "type": "User",
                "type_id": 1
            }
        },
        "category_name": "Identity & Access Management",
        "category_uid": 3,
        "class_name": "User Access Management",
        "class_uid": 3005,
        "cloud": {
            "org": {
                "name": "Your Org Name",
                "uid": "33911245002965270A49422F@AdobeOrg"
            },
            "provider": "Adobe"
        },
        "device": {
            "ip": "198.51.100.0",
            "type": "Unknown",
            "type_id": 0
        },
        "metadata": {
            "event_code": "ADMIN_ROLE_ASSIGN_USER:ORG_ADMIN",
            "product": {
                "name": "Adobe Admin Console Audit Log",
                "vendor_name": "Adobe"
            },
            "profiles": [
                "cloud",
                "datetime",
                "host"
            ],
            "tenant_uid": "33911245002965270A49422F@AdobeOrg",
            "uid": "385eedd5-1175-4cc2-9983-cd5058d69763",
            "version": "2025.11.09"
        },
        "privileges": [
            "ORG_ADMIN"
        ],
        "severity": "Informational",
        "severity_id": 1,
        "time": 1732021086000,
        "time_dt": "2024-11-19T12:58:06Z",
        "type_name": "User Access Management: Assign Privileges",
        "type_uid": 300501,
        "user": {
            "email_addr": "new.user@example.com",
            "uid": "93CC23A00D449C80A494229@c62f24c00b5b7e0e0a494004.e"
        }
    }
}
```