---
title: Asset Events Properties
---

# Asset Events Properties

This page describes the properties of an Asset Event. (To see a sample event, [click here](asset-events-sample.json).)

## Properties

**xdmEntity** _object_

The [XDM](asset-events-glossary.md#xdm) Entity object, which contains a list of changed [resources](asset-events-glossary.md#resource) that represent the [asset](asset-events-glossary.md#asset) change.

<DetailsBlock slots="header,list" repeat="2" summary="(show/hide child properties)" subText="event:sequence number" />

A sequence number of the event that is unique within the current [repository](asset-events-glossary.md#repository). It is used to detect out-of-sequence events.

**event:resources** _object_

An object containing all the Resource Change objects related to the event. Resource changes are identified by the link relation associated with the resource.

- Note: There is always a Resource Change object for the [Repository Metadata Resource](asset-events-glossary.md#repository-metadata-resource), even if this resource was not affected by the action that triggered the event. This is because the Repository Metadata Resource is required to be embedded in the event.

<DetailsBlock slots="header,list" repeat="2" summary="(show/hide child properties)" subText="< link relation > object" />

The Resource Change object, which describes how a particular [resource](asset-events-glossary.md#resource) was affected by the [action](asset-events-actions.md) that triggered the event.

**event:resources** _object_

An object containing all the Resource Change objects related to the event. Resource changes are identified by the link relation associated with the resource.

- Note: The property will be the link relation associated with the resource (e.g., http://ns.adobe.com.adobecloud/rel/metadata/repository).

<DetailsBlock slots="header,list" repeat="4" summary="(show/hide child properties)" subText="event:action string" />

Specifies the type of change to the [resource](asset-events-glossary.md#resource). Possible values are: created, updated, deleted and none. none is used, for example, to embed the Repository Metadata, when this resource was not affected by the action that triggered the event.

**event:schema** string

The URN of the [XDM](asset-events-glossary.md#xdm) Schema of the embedded [resource](asset-events-glossary.md#resource)..

**event:embedded** object

The embedded JSON representation of the [resource](asset-events-glossary.md#resource).

**event:updated** object

The updated properties of the embedded [resource](asset-events-glossary.md#resource) (if it has been updated), as well as the previous values of the properties.
