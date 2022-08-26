---
title: App Builder webhook auto registration
---

# Overview

The integration between [App builder project and I/O Events](./runtime_webhooks.md) allows to create applications that listen to Adobe events. Automatic events registrations push this concept further by subscribing your newly deployed project to `I/O Events` automatically, so you can easily deploy your application in different environments or even share your application with other organizations. Also, this technology minimizes the manual routine work for admins and reduces the possibility to mess up things during manual setup in `Developer Console`.

## Creating self-contained application
In this chapter, we will create a code that listens to a specific event type and bind itself to this event type.
* Create `App Builder` project(`Runtime`) with webhook using [App builder project and I/O Events](./runtime_webhooks.md) article. **DON'T go to `Developer Console` to create registrations!**
* Install `aio-cli-plugin-extension` plugins using AIO CLI(`aio plugins discover -i`)
* Declare your action as `non-web` and set `require-adobe-auth` to `false` in `app.config.yaml` file. I/O Events will be able to call your webhook, but it won't be publicly accessible to anyone else.
* Define the event types you want to receive in `event-listener-for` section of `app.config.yaml` file like the following:
```
application:
  actions: actions
  web: web-src
  runtimeManifest:
    packages:
      appbuilder:
        license: Apache-2.0
        actions:
          generic:
            function: actions/generic/index.js
            web: 'no'
            runtime: 'nodejs:14'
            inputs:
              LOG_LEVEL: debug
            annotations:
              require-adobe-auth: false
            relations:
              event-listener-for:
                - {{YOUR_EVENT_TYPE}}
```

## Deploy self-contained application
* Launch `aio app deploy` AIO CLI command.

Congratulations, you just deployed the code and it's already subscribed to the specified event type. You can now share the code and repeat `aio app deploy` command on any environment you need

## Remove self-contained application
* Launch `aio app undeploy` AIO CLI command. This command removes the application and also removes all event registrations bound to this application

