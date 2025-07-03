---
title: Asset Events Properties
---

# Asset Events Properties

This page describes the properties of an Asset Event. Here is a sample event payload:

```json
{
  "data": {
    "xdmEntity": {
      "event:resources": {
        "http://ns.adobe.com/adobecloud/rel/metadata/repository": {
          "event:action": "created",
          "event:embedded": {
            "_links": {
              "http://ns.adobe.com/adobecloud/rel/metadata/peruser": [
                {
                  "mode": "id",
                  "href": "https://platform-cs-jpn3.adobe.io/metadata/peruser/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad",
                  "type": "application/json"
                },
                {
                  "mode": "path",
                  "href": "https://platform-cs-jpn3.adobe.io/metadata/peruser/path/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg",
                  "type": "application/json"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/page": [
                {
                  "mode": "id",
                  "templated": true,
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad/resource:{resource}/:page{?orderBy,start,limit,property,version}",
                  "type": "application/vnd.adobe.versions+json"
                },
                {
                  "mode": "path",
                  "templated": true,
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/relpath/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg/resource:{resource}/:page{?orderBy,start,limit,property,version}",
                  "type": "application/vnd.adobe.versions+json"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/metadata/repository": [
                {
                  "mode": "id",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad/:repometadata",
                  "type": "application/json"
                },
                {
                  "mode": "path",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/relpath/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg/:repometadata",
                  "type": "application/json"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/rendition": [
                {
                  "mode": "id",
                  "templated": true,
                  "href": "https://platform-cs-jpn3.adobe.io/rendition/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad{;page,size,type}"
                },
                {
                  "mode": "path",
                  "templated": true,
                  "href": "https://platform-cs-jpn3.adobe.io/rendition/path/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg{;page,size,type}"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/directory": [
                {
                  "mode": "id",
                  "templated": true,
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:0ab6c2e0-f40c-48e4-9a12-8692de460cea/:page{?resource,orderBy,start,limit,type,embed}"
                },
                {
                  "mode": "path",
                  "templated": true,
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/relpath/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/:page{?resource,orderBy,start,limit,type,embed}"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/ac/policy": [
                {
                  "href": "https://platform-cs-jpn3.adobe.io/content/acl/policy/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/ac/check": [
                {
                  "templated": true,
                  "href": "https://platform-cs-jpn3.adobe.io/content/acl/check/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad{?privilege,relation}"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/repository": {
                "href": "https://platform-cs.adobe.io/content/directory/repo/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/repositoryResource"
              },
              "http://ns.adobe.com/adobecloud/rel/bulk": [
                {
                  "mode": "id",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad/:bulk"
                },
                {
                  "mode": "path",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/relpath/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg/:bulk"
                }
              ],
              "version-history": [
                {
                  "mode": "id",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad/:versions"
                },
                {
                  "mode": "path",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/relpath/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg/:versions"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/metadata/application": [
                {
                  "mode": "id",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad/:applicationmetadata",
                  "type": "application/json"
                },
                {
                  "mode": "path",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/relpath/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg/:applicationmetadata",
                  "type": "application/json"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/ac/effective": [
                {
                  "href": "https://platform-cs-jpn3.adobe.io/content/acl/effective/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/primary": [
                {
                  "mode": "id",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad"
                },
                {
                  "mode": "path",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/relpath/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg"
                }
              ],
              "http://ns.adobe.com/adobecloud/rel/metadata/embedded": [
                {
                  "mode": "id",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad/:embeddedmetadata"
                },
                {
                  "mode": "path",
                  "href": "https://platform-cs-jpn3.adobe.io/content/storage/relpath/urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4/cloud-content/download.jpeg/:embeddedmetadata"
                }
              ]
            },
            "repo:assetId": "urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad",
            "repo:state": "ACTIVE",
            "repo:etag": "\"4506ae32-1626-4fe5-99e6-810e3aa32c1b\"",
            "repo:repositoryId": "urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4",
            "repo:name": "download.jpeg",
            "dc:format": "image/jpeg",
            "repo:contributors": [
              {
                "repo:modifiedBy": "8246321A50EFA4270A490D45@AdobeID",
                "repo:modifiedByClientId": "dc-prod-virgoweb"
              }
            ],
            "repo:version": "0",
            "repo:createdByClientId": "dc-prod-virgoweb",
            "storage:region": "JPN3",
            "repo:size": 7940,
            "storage:assignee": {
              "id": "8246321A50EFA4270A490D45@AdobeID",
              "type": "user"
            },
            "storage:deviceCreateDate": "2025-06-30T12:53:48.749Z",
            "tiff:imageLength": 0,
            "repo:modifyDate": "2025-06-30T12:53:48.749Z",
            "repo:id": "urn:aaid:sc:AP:4d28b2af-6903-45d8-b76c-4258521a06ad",
            "repo:representations": {
              "file": true,
              "composite": false,
              "directory": false
            },
            "repo:createDate": "2025-06-30T12:53:48.749Z",
            "tiff:imageWidth": 0,
            "repo:ancestors": [
              "urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4",
              "urn:aaid:sc:AP:0ab6c2e0-f40c-48e4-9a12-8692de460cea"
            ],
            "repo:createdBy": "8246321A50EFA4270A490D45@AdobeID",
            "repo:modifiedBy": "8246321A50EFA4270A490D45@AdobeID",
            "repo:assetClass": "file",
            "repo:path": "/cloud-content/download.jpeg",
            "repo:modifiedByClientId": "dc-prod-virgoweb",
            "storage:deviceModifyDate": "2025-06-30T12:53:48.749Z"
          },
          "event:resourceGeneration": 336
        },
        "http://ns.adobe.com/adobecloud/rel/primary": {
          "event:action": "created",
          "event:resourceGeneration": 2
        },
        "http://ns.adobe.com/adobecloud/rel/repository": {
          "event:action": "none",
          "event:embedded": {
            "repo:owner": {
              "id": "8246321A50EFA4270A490D45@AdobeID",
              "type": "user"
            },
            "storage:assignee": {
              "id": "8246321A50EFA4270A490D45@AdobeID",
              "type": "user"
            },
            "repo:repositoryId": "urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4"
          }
        }
      },
      "event:sequence": -1,
      "event:repository": {
        "repo:owner": {
          "id": "8246321A50EFA4270A490D45@AdobeID",
          "type": "user"
        }
      }
    }
  },
  "specversion": "1.0",
  "id": "033be65a-7f3d-4126-9616-247b0ad5a832",
  "source": "urn:uuid:urn:aaid:sc:AP:2b461647-5849-53d0-8775-aa9ec0e104f4",
  "type": "com.adobe.platform.events.file_created",
  "datacontenttype": "application/json",
  "dataschema": "http://ns.adobe.com/adobecloud/repository/event/asset",
  "time": "2025-06-30T12:53:48.749Z",
  "xactionid": "bbfe7a73-c94e-436c-8d57-7f93290b31a8-5-SC-5",
  "recipient": {
    "userid": "8246321A50EFA4270A490D45@AdobeID"
  },
  "recipientclientid": "1c3b2213fc3b47688524d553c32cf239",
  "dataschemaversion": "0.9",
  "eventid": "57d927c6-51cf-4316-933f-385eb9360b5d"
}
```

## Properties

**xdmEntity** _object_

The [XDM](asset-events-glossary.md#xdm) Entity object, which contains a list of changed [resources](asset-events-glossary.md#resource) that represent the [asset](asset-events-glossary.md#asset) change.

<Details slots="header,list" repeat="2" summary="(show/hide child properties)" subText="event:sequence number" />

A sequence number of the event that is unique within the current [repository](asset-events-glossary.md#repository). It is used to detect out-of-sequence events.

**event:resources** _object_

An object containing all the Resource Change objects related to the event. Resource changes are identified by the link relation associated with the resource.

- Note: There is always a Resource Change object for the [Repository Metadata Resource](asset-events-glossary.md#repository-metadata-resource), even if this resource was not affected by the action that triggered the event. This is because the Repository Metadata Resource is required to be embedded in the event.

<Details slots="header,list" repeat="2" summary="(show/hide child properties)" subText="< link relation > object" />

The Resource Change object, which describes how a particular [resource](asset-events-glossary.md#resource) was affected by the [action](asset-events-actions.md) that triggered the event.

**event:resources** _object_

An object containing all the Resource Change objects related to the event. Resource changes are identified by the link relation associated with the resource.

- Note: The property will be the link relation associated with the resource (e.g., http://ns.adobe.com.adobecloud/rel/metadata/repository).

<Details slots="header" repeat="7" summary="(show/hide child properties)" subText="event:action string" />

Specifies the type of change to the [resource](asset-events-glossary.md#resource). Possible values are: created, updated, deleted and none. none is used, for example, to embed the Repository Metadata, when this resource was not affected by the action that triggered the event.

**event:schema** string

The URN of the [XDM](asset-events-glossary.md#xdm) Schema of the embedded [resource](asset-events-glossary.md#resource)..

**event:embedded** object

The embedded JSON representation of the [resource](asset-events-glossary.md#resource).

**event:updated** object

The updated properties of the embedded [resource](asset-events-glossary.md#resource) (if it has been updated), as well as the previous values of the properties.

<Details slots="header" repeat="3" summary="(show/hide child properties)" subText="repo:path _string_" />

The previous path of the [resource](asset-events-glossary.md#resource).

**storage:region** _string_

The previous storage region.
