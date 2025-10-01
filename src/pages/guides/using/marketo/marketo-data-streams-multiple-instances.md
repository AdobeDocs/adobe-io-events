### Multiple Marketo Instances

If you have multiple Marketo instances, such as a production and a sandbox instance, all subscribed events from every
enabled instance will appear in the data stream. You can identify which instance the event came from by inspecting the
`munchkinId` field in the event payload.
