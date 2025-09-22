## Getting Started

We assume you already have a Registration for which [SDF is applicable](#prerequisites).

## Prerequisites

- An active Adobe I/O Events registration which is compatible with SDF:
  - Only includes [CloudEvents](https://cloudevents.io) deliveries.
  - [AWS EventBridge](/src/pages/guides/amazon-eventbridge/index.md) is not configured among the delivery methods.
- Access to the Adobe I/O Events API with proper authentication
  - You can either use the Developer Console or add your filters through the [Registration APIs](/src/pages/guides/api/registration-api.md)
- Understanding of JSON syntax and your event payload structure
  - Check the [filtering language details](dsl.md)