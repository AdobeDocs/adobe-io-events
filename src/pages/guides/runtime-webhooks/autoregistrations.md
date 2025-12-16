---
title: App Builder webhook auto registration
---

# Overview

The integration between [App builder project and I/O Events](../../guides/runtime-webhooks/index.md) allows to create applications that listen to Adobe events. Automatic events registrations push this concept further by subscribing your newly deployed project to `I/O Events` automatically, so you can easily deploy your application in different environments or even share your application with other organizations. Also, this technology minimizes the manual routine work for admins and reduces the possibility to mess up things during manual setup in `Developer Console`.

## Creating self-contained application

In this chapter, we will create a code that listens to a specific event type and bind itself to this event type.

* Create an `App Builder` project with webhook support using the [App builder project and I/O Events](../../guides/runtime-webhooks/index.md) article. **DON'T go to `Developer Console` to create registrations!**
* Declare your action as `non-web` and set `require-adobe-auth` to `false` in `app.config.yaml` file. Actions deployed with auto-registration only receive events signed by Adobe I/O Events. All other invocations will be ignored.
* Define the event types you want to receive in `event-listener-for` section of `app.config.yaml` file like the following:

```yaml
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
            runtime: 'nodejs:18'
            inputs:
              LOG_LEVEL: debug
            annotations:
              require-adobe-auth: false
            relations:
              event-listener-for:
                - {{YOUR_EVENT_TYPE}}
```

* Launch `App Builder` development session using `aio app run` CLI command. This command will partially deploy your application, continuously synchronize your changes and create registrations for events declared in the manifest file.
* Terminate the development session when you are done coding using `CTRL+C`. This will clean up all registrations created during the development session.

### Sequences

A similar approach can be used for OpenWhisk sequences. See the following example:

```yaml
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
            runtime: 'nodejs:18'
            inputs:
              LOG_LEVEL: debug
        sequences:
          test:
            actions: generic
            annotations:
              require-adobe-auth: false
            relations:
              event-listener-for:
                - {{YOUR_EVENT_TYPE}}
```

## Deploy self-contained application

* Launch `aio app deploy` AIO CLI command.

Congratulations, you just deployed the code and it's already subscribed to the specified event type. You can now share the code and repeat `aio app deploy` command on any environment you need.

## Remove self-contained application

* Launch `aio app undeploy` AIO CLI command. This command removes the application and also removes all event registrations bound to this application.

## Usage in CI/CD environment

When an IMS organization contains multiple suitable event providers, you may be prompted to select one manually. This behavior works for many user scenarios, but it may cause issues in CI/CD environment. In such cases, `PREFERRED_PROVIDERS` will help to specify a list of provider ids that will be selected automatically.

Example: `PREFERRED_PROVIDERS=c021fed7-54f3-4137-b7d0-1f3abb2e9902,dfa1319c-83ab-406e-869a-067cf89c65ba aio app deploy`

If some event type is present in both specified preferred providers, the first suitable provider according to the position in the list will be selected.
