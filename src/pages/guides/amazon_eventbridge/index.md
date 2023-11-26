---
title: Amazon EventBridge Integration
---

# Adobe I/O Events and Amazon EventBridge Integration

Adobe I/O Events, now seamlessly integrates with [Amazon EventBridge](https://aws.amazon.com/eventbridge/), empowering you to effortlessly route events from Adobe's Creative Cloud, Document Cloud, Experience Cloud, and [Custom Events](https://developer.adobe.com/events/docs/guides/using/custom_events/) from [Adobe Developer App Builder](https://developer.adobe.com/app-builder/docs/overview/) to over 20 AWS services, making it easier to build event-driven architectures

By leveraging this integration, you can increase developer agility by spending less time writing integration code and building features faster that combine best-in-class Software-as-a-Service (SaaS) capabilities with AWS services.

## What is Amazon EventBridge?

Amazon EventBridge is a serverless integration service that enables you to create highly scalable event-driven applications by routing events between your own applications, third-party SaaS applications, and AWS services. You can set up rules to determine where to send your events, allowing for applications to react to changes in your systems as they occur. EventBridge makes it easier to build event-driven applications by facilitating event ingestion, delivery, security, authorization, and error handling. EventBridge has over 45 pre-built partner integrations that can scale seamlessly to handle spikes in event delivery without requiring provisioning of infrastructure or ongoing operations.

## Pre-Requisite Setup

A customer AWS account and the corresponding AWS region where the events can be routed to.

## Getting Started

### Configuring Developer Console

Basic instructions for getting started with the EventBridge integration, starting from the [developer console](/console/):

- Start from a new project or an existing one. To create a new project, select `Create new project`.

  ![Create new project](../img/console_create_new_project.png "Quick Start")

- Click `Add to Project` and select `Event`
  
  ![Add Event to project](../img/console_add_event_to_project.png "Add Event to Project")

- Filter by product, and then select a suitable event provider from the available list.

  ![Provider selection](../img/console_provider_selection.png "Select event provider")

- Subscribe to the events that you're interested in corresponding to the selected event provider.

  ![Event selection](../img/console-event-code-selection.png "Select event subscriptions")

- Set up the authentication to be used

  ![Set up credentials](../img/console_select_authentication.png "Set up credentials")

- Set the name and description for your event registration

  ![Set the name and description](../img/console_set_event-reg_name-and-description.png "Set Name and Description")

- On the `How to receive events` screen, choose the `Amazon EventBridge` option. Enter the customer's AWS account ID and the AWS region where the events will be routed.

  ![Select Amazon EventBridge option](../img/console_eventbridge_option_masked.png "Select Amazon EventBridge option")

- Finish Event Registration Setup by clicking on the `Save configured events` button.
- After saving, your event registration should appear with a `Pending` status, indicating that further configuration is required on the AWS console.

  ![Verify setup](../img/console_eventbridge_pending_status_masked.png "Verify setup")
