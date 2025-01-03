---
title: Asset Events Properties
---

# Asset Events Properties

This page describes the properties of an Asset Event. (To see a sample event, [click here](asset-events-sample.json).)

## Properties

**xdmEntity** _object_

The [XDM](asset-events-glossary.md#xdm) Entity object, which contains a list of changed [resources](asset-events-glossary.md#resource) that represent the [asset](asset-events-glossary.md#asset) change.

<DetailsBlock slots="list" repeat="5" summary="(show/hide child properties)" />

**event:sequence** _number_

A sequence number of the event that is unique within the current [repository](asset-events-glossary.md#repository). It is used to detect out-of-sequence events.

**event:resources** _object_

An object containing all the Resource Change objects related to the event. Resource changes are identified by the link relation associated with the resource.

- Note: There is always a Resource Change object for the [Repository Metadata Resource](asset-events-glossary.md#repository-metadata-resource), even if this resource was not affected by the action that triggered the event. This is because the Repository Metadata Resource is required to be embedded in the event.

<DetailsBlock slots="list" repeat="3" summary="(show/hide child properties)" />

**&lt;link relation&gt;** _object_

The Resource Change object, which describes how a particular [resource](asset-events-glossary.md#resource) was affected by the [action](asset-events-actions.md) that triggered the event.

- Note: The property will be the link relation associated with the resource (e.g., ht<span>tp://ns.adobe.com.adobecloud/rel/metadata/repository</span>).

<DetailsBlock slots="header , list" repeat="4" summary="(show/hide child properties)" />

**event:action** _string_

Specifies the type of change to the [resource](asset-events-glossary.md#resource). Possible values are: `created`, `updated`, `deleted` and `none`. `none` is used, for example, to embed the Repository Metadata, when this resource was not affected by the action that triggered the event.

**event:schema** _string_

The URN of the [XDM](asset-events-glossary.md#xdm) Schema of the embedded [resource](asset-events-glossary.md#resource).

**event:embedded** _object_

The embedded JSON representation of the [resource](asset-events-glossary.md#resource).

**event:updated** _object_

The updated properties of the embedded [resource](asset-events-glossary.md#resource) (if it has been updated), as well as the previous values of the properties.

<DetailsBlock slots="header , list" repeat="2" summary="(show/hide child properties)" />

**repo:path** _string_

The previous path of the [resource](asset-events-glossary.md#resource).

**storage:region** _string_

The previous storage region.