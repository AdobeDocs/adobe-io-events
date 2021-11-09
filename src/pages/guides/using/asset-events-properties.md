# Asset Events Properties

<br/>

This page describes the properties of an Asset Event. (To see a sample event, [click here](asset-events-sample.json).)

## Properties

**xdmEntity** _object_

The [XDM](asset-events-glossary.md#xdm) Entity object, which contains a list of changed [resources](asset-events-glossary.md#resource) that represent the [asset](asset-events-glossary.md#asset) change.

<details>

<br/>

<summary>(show/hide child properties)

<br/>

</summary>

---

<br/>

**event:sequence** _number_

A sequence number of the event that is unique within the current [repository](asset-events-glossary.md#repository). It is used to detect out-of-sequence events.

 <br/>

---

 <br/>

**event:resources** _object_

An object containing all the Resource Change objects related to the event. Resource changes are identified by the link relation associated with the resource.

- Note: There is always a Resource Change object for the [Repository Metadata Resource](asset-events-glossary.md#repository-metadata-resource), even if this resource was not affected by the action that triggered the event. This is because the Repository Metadata Resource is required to be embedded in the event.

<details>

<br/>

<summary>(show/hide child properties)

<br/>

</summary>

---

<br/>

**&lt;link relation&gt;** _object_

The Resource Change object, which describes how a particular [resource](asset-events-glossary.md#resource) was affected by the [action](asset-event-actions.md) that triggered the event.

- Note: The property will be the link relation associated with the resource (e.g., ht<span>tp://ns.adobe.com.adobecloud/rel/metadata/repository</span>).

<details>

<br/>

<summary>(show/hide child properties)

<br/>

</summary>

---

<br/>

**event:action** _string_

Specifies the type of change to the [resource](asset-events-glossary.md#resource). Possible values are: `created`, `updated`, `deleted` and `none`. `none` is used, for example, to embed the Repository Metadata, when this resource was not affected by the action that triggered the event.

<br/>

---

<br/>

**event:schema** _string_

The URN of the [XDM](asset-events-glossary.md#xdm) Schema of the embedded [resource](asset-events-glossary.md#resource).

<br/>

---

<br/>

**event:embedded** _object_

The embedded JSON representation of the [resource](asset-events-glossary.md#resource).

<br/>

---

<br/>

**event:updated** _object_

The updated properties of the embedded [resource](asset-events-glossary.md#resource) (if it has been updated), as well as the previous values of the properties.

<details>

<br/>

<summary>(show/hide child properties)

<br/>

</summary>

---

<br/>

**repo:path** _string_

The previous path of the [resource](asset-events-glossary.md#resource).

<br/>

---

<br/>

**storage:region** _string_

The previous storage region.

</details>

<br/>

</details>

</details>

---

<br/>

**event:ancestorIds** _array_

The `assetId` of each parent [asset](<(asset-events-glossary.md#asset)>) in the `repo:path` at the time it is updated by the Processor. This value is not intended for consumption outside of Content Platform. The assetId at index 0 is the ID of the root [directory](asset-events-glossary.md#directory); all following IDs represent the IDs of the next descendants up to the parent of the current asset. If the current asset is the root directory of the [repository](asset-events-glossary.md#repository), this array is empty.

<br/>

</details>
