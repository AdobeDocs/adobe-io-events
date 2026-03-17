---
title: Adobe Admin Console & OCSF
---

# Adobe Admin Console & OCSF

How Adobe events map into OCSF events.

This section is not intended to be exhaustive - one of the advantages of OCSF is that many of the 
events are easily decipherable from their inherent structure. The majority of the time, there is 
a direct mapping from an action in Admin Console to an OCSF event type. 
This page only provides a guide to show how we've chosen to map these events into OCSF to make it
easier to interpret events where you receive more information than via CSV export, for example.

Actions related to users, user groups and granting access to products and roles should be 
self-explanatory. Many of the actions taken in Admin Console will map to 
[Entity Management](https://schema.ocsf.io/1.6.0/classes/entity_management)
using standard entities such as `Group`, `Organization`, and `Policy`. Information on custom
entities is provided below.


## Custom Entities

Sample entity representations appear after the table.

| Entity Name | Description |
|--- |--- |
| `Allocation` | Relates to Global Admin Console license and quota allocations |
| `Auto Assignment Rule` | From *Automatic assignment rules* in Admin Console | 
| `Certificate` | Certificates used in Directory sync process | 
| `Contract` | A Contract as seen in *Account* in Admin Console |
| `Product Access Request` | From *Product requests* in Admin Console |
| `Product Profile` | Groups used to manage access to products via Admin Console | 
| `Role` | *Roles* in Admin Console - note these are distinct from administrator roles | 
| `Terms and Conditions` | When the named terms have been accepted against a contract or org | 
| `Trial Offer` | When a trial is activated | 

### Allocation 

```json
"entity": {
    "data": {
        "product_name": "Acrobat Premium for enterprise",
        "parent_org_id": "13A21EC668D2B4850A494225@AdobeOrg",
        "request_type": "REGULAR",
        "allocation_resources": [
            {
                "type": "LICENSE",
                "grant_quantity": "10",
                "grant_unit": "LICENSE_COUNT"
            }
        ]
    },
    "uid": "GAC-APP-b545f3e0-30ac-459d-90a1-bda9c36f096f",
    "type": "Allocation",
    "type_id": 99
},
```

### Auto Assignment Rule

```json
"entity": {
    "uid": "e4c00f50995c89720199629145af004d",
    "type": "Auto Assignment Rule",
    "type_id": 99,
    "data": {
        "product_id": "7F9D4CEDE84E9D0B451B",
        "product_name": "Creative Cloud Pro",
        "product_profile_id": "551532483",
        "product_profile_name": "Creative Cloud All Apps Configuration",
        "trigger": "ON_DEMAND_OR_URL",
		"assignment_mode": "LICENSE_DELEGATION",
		"scope": "ALL"
    }
},
```

### Certificate

```json
"entity": {
    "uid": "48eebc73-c66c-4d8d-a40a-67c5de19a5ac",
    "type": "Certificate",
    "type_id": 99,
    "data": {
        "directory_id": "fe46366b5ab0fc2c0a495eea",
        "directory_name": "redacted.directory.name",
        "issuer": "STSWINDOWS"
    }
},
```

### Contract

```json
"entity": {
    "name": "ETLA - 1D0ACEE16833B62AFE4B",
    "uid": "1D0ACEE16833B62AFE4B",
    "type": "Contract",
    "type_id": 99
},
```

### Product Access Request 

```json
"entity": {
    "uid": "e4c01a8792d7ce300192f6f0e89d00a0",
    "type": "Product Access Request",
    "type_id": 99,
    "data": {
        "product_name": "AI Assistant for Acrobat"
    },
    "user": {
        "email_addr": "salavilaha-5752@adobetest.com",
        "uid": "112D1A5966A9D6590A49412F@30b319826663068b49401d.e",
        "type": "User",
        "type_id": 1
    }
},
```

### Product Profile

```json
"entity": {
    "name": "Default Adobe Express for Enterprise configuration",
    "uid": "591811050",
    "type": "Product Profile",
    "type_id": 99,
    "data": {
        "product_id": "EE5CDAC8CBD19DAF9FBB",
        "product_name": "Adobe Express for Enterprise"
    }
},
```

### Role

```json
"entity": {
    "uid": "CR_622cb4be-1e16-4475-aa3e-caf48e9542ca",
    "name": "siddharg_customrole_3",
    "type": "Role",
    "type_id": 99
},
```

### Terms and Conditions 

```json
"entity": {
    "data": {
        "contract_id": "F8834917A9671FF0787B",
        "acceptance_time_dt": "2024-11-15T18:02:40Z"
    },
    "name": "VIP Terms and Conditions",
    "type": "Terms and Conditions",
    "type_id": 99
},
```

### Trial Offer

```json
"entity": {
    "type": "Trial Offer",
    "type_id": 99,
    "name": "Acrobat Studio for enterprise"
},
```


## CSV Export

Tracking exports of CSVs is done via class [Web Resources Activity](https://schema.ocsf.io/1.6.0/classes/web_resources_activity).
The exact CSV export initiatied can then be seen in the `web_resources` stanza:

```json
"web_resources": [
    {
        "name": "asset_migration_report.csv",
        "type": "File"
    }
]
```

Full list of names:

* `asset_migration_report.csv`
* `directories.csv`
* `directory-users.csv`
* `domains.csv`
* `license-deficit-report.csv`
* `license-group-users.csv`
* `license_group_devices.csv`
* `license_status_report.csv`
* `product-user-no-access-report.csv`
* `product-user-payment-status-report.csv`
* `products.csv`
* `switch_users.csv`
* `user-groups.csv`
* `user_group_users.csv`
* `users.csv`

In the future, exporting will be enhanced to provide more details (e.g., file format, related object info).
