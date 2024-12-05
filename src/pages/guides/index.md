---
keywords:
  - Webhook
  - Testing with ngrok
  - Create a Project
  - Receiving Events
  - Quotas
title: Introduction to Adobe I/O Events Webhooks
description: With Adobe I/O Events webhooks, your application can sign up to be notified whenever certain events occur. For example, when a user uploads a asset, this action generates an event. With the right webhook in place, your application is instantly notified that this event happened.
---


# Introduction to Adobe I/O Events Webhooks

With Adobe I/O Events webhooks, your application can sign up to be notified whenever certain events occur.
For example, when a user uploads a asset, this action generates an event.
With the right webhook in place, your application is instantly notified that this event happened.

Please refer to the `Adobe Developer Console` documentation on how to [Add Events to a project](https://developer.adobe.com/developer-console/docs/guides/services/services-add-event/)

To start receiving events, you create an event registration specifying a webhook URL and the types of events you want to receive. Each event will result in a HTTP request to the given URL, notifying your application. This guide provides an introduction to webhooks.

## Getting started

An **Event** is a JSON object that describes something that happened. Events originate from **Event Providers**. Each event provider publishes specific types of events, identified by an **Event Code**. A **Webhook URL** receives event JSON objects as HTTP POST requests. You start receiving events by creating an **Event Registration**, providing a name, description, webhook URL, and a list of **Event Types** you are interested in.

### Webhook example

Acme Inc. wants to be notified when a new file is uploaded to Adobe Creative Cloud Assets, so it creates the following event registration:

```json
{
  "version": "0.3.0",
  "configurations": [
    {
      "name": "App Builder: debug actions",
      "type": "node-terminal",
      "request": "launch",
      "command": "aio app dev",
      "skipFiles": [
        "<node_internals>/**/*.js",
        "${workspaceFolder}/node_modules/**/*.js"
      ]
    }, {
      "name": "App Builder: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "aio app dev",
      "sourceMapPathOverrides": {
        "/__parcel_source_root/*": "${webRoot}/*"
      },
      "skipFiles": [
        "<node_internals>/**/*.js",
        "${workspaceFolder}/node_modules/**/*.js"
      ],
      "serverReadyAction": {
        "pattern": "server running on port : ([0-9]+)",
        "uriFormat": "https://localhost:%s",
        "action": "debugWithChrome",
        "webRoot": "${workspaceFolder}"
      }
    }
  ]
}
```