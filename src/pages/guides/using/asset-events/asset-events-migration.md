---
title: Migrating from Legacy Events to Asset Events
---

# Migrating from Legacy Events to Asset Events

This page is meant to help users migrate from legacy Creative Cloud Asset Events to Asset Events, specifically by mapping the payloads of the two event types.

For simplicity, the page maps the legacy Creative Cloud Asset Events property to the Asset Events property using an arrow (which signifies "corresponds to"), as so:

`legacy.events.property` &rarr; `asset.events.property`

## `@type` &rarr; `event:action`

`event.@type` &rarr; `data.xdmEntity.event:resources.['http://ns.adobe.com/adobecloud/rel/metadata/repository'].event:action`

## `xdmImsUser:id` &rarr; `repo:modifiedBy`

`event.activitystreams:actor.xdmImsUser:id` &rarr;

`data.xdmEntity.event:resources.['http://ns.adobe.com/adobecloud/rel/metadata/repository'].event:embedded.repo:modifiedBy`

**Note**: `repo:modifiedBy` is currently not implemented for deletions.

## `xdmAsset:asset_id` &rarr; `repo:assetId`

`event.activitystreams:object.xdmAsset:asset_id` &rarr; `data.xdmEntity.event:resources.['http://ns.adobe.com/adobecloud/rel/metadata/repository'].event:embedded.repo:assetId`

## `xdmAsset:asset_name` &rarr; `repo:name`

`event.activitystreams:object.xdmAsset:asset_name` &rarr; `data.xdmEntity.event:resources.['http://ns.adobe.com/adobecloud/rel/metadata/repository'].event:embedded.repo:name`

## `xdmAsset:etag` &rarr; `repo:etag`

`event.activitystreams:object.xdmAsset:etag` &rarr; `data.xdmEntity.event:resources.['http://ns.adobe.com/adobecloud/rel/metadata/repository'].event:embedded.repo:etag`

## `xdmAsset:path` &rarr; `repo:path`

`event.activitystreams:object.xdmAsset:path` &rarr; `data.xdmEntity.event:resources.['http://ns.adobe.com/adobecloud/rel/metadata/repository'].event:embedded.repo:path`

## `xdmAsset:format` &rarr; `dc:format`

`event.activitystreams:object.xdmAsset:format` &rarr; `data.xdmEntity.event:resources.['http://ns.adobe.com/adobecloud/rel/metadata/repository'].event:embedded.dc:format`
