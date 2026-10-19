#### Filtering for a Specific Instance

If you only want to receive a subset of events for a Marketo instance, you can use
[Subscriber Defined Filtering](https://developer.adobe.com/events/docs/guides/subscriber_defined_filtering/)
to filter within those events.

> Subscriber Defined Filtering is currently only supported for the Lead
> Activity Data Stream and Marketo Observability Data Stream (MODS).
> Support for other Marketo Data Streams is planned.

##### Examples

###### Filtering for specific values on a field
For example, to filter for Munchkin IDs starting with "078"

```json
{
  "data.munchkinId": [
    {
      "prefix": {
        "equals-ignore-case": "078"
      }
    }
  ]
}
```

###### Excluding instances
For example, to filter out events with specific Munchkin IDs

```json
{
  "data.munchkinId": [
    { 
      "anything-but": ["123-ABC-456"]
    }
  ]
}
```

###### Combining filters
For example, to only receive `Fill Out Form`
activities, or activities that are not on a specific lead partition (LADS-specific example):

```json
{
  "$or": [
    {
      "type": [
        "com.adobe.platform.marketo.activity.standard.filloutform"
      ]
    },
    {
      "data": {
        "Person": {
          "leadPartitionId": [
            {
              "anything-but": [5]
            }
          ]
        }
      }
    }
  ]
}
```


