---
title: Debugging Adobe I/O Events 
---

# Debugging Adobe I/O Events

This page captures the most common troubleshooting scenarios when working with Adobe Events.

## Analytics Triggers Events

If your Analytics Triggers events aren't coming through to your integration, a breakdown in communication may have occurred at any step in the events process. You'll need to check each step in order to verify where the breakdown has occurred and then fix your configuration accordingly.

The process of communicating Analytics Triggers via I/O Events consists of the following steps:

(1) Web page > (2) Analytics call > (3) Analytics Triggers > (4) Adobe I/O Events > (5) Webhook

### Debug 1 > 2

If 1 > 2 is working, it means that Analytics code has been embedded in your webpage, and analytics calls (**Note:** not necessarily Trigger calls) are firing and going through.
You can verify your Adobe Analytics connection via the Debugger:

[https://chrome.google.com/webstore/detail/debugger-for-adobe-analyt/bdingoflfadhnjohjaplginnpjeclmof](https://chrome.google.com/webstore/detail/debugger-for-adobe-analyt/bdingoflfadhnjohjaplginnpjeclmof)
[https://chrome.google.com/webstore/detail/adobe-experience-cloud-de/ocdmogmohccmeicdhlhhgepeaijenapj](https://chrome.google.com/webstore/detail/adobe-experience-cloud-de/ocdmogmohccmeicdhlhhgepeaijenapj)

### Debug 2 > 3

If 2 > 3 is working, it means that your Triggers pattern is valid and reflects the customer behavioral pattern that you are trying to mirror. If you verified that the Analytics connection is going through, but no Trigger has been fired, you can try the following methods:

- Make sure you have outlasted the &ldquo;inactivity time&rdquo; that you've set: for example, if you set it to be 10 minutes, then make sure there are absolutely no actions on your page for 10 minutes so that Triggers can identify this pattern and fire.
- Compare your Triggers setting to your Analytics live output.
- Make sure you are talking to the correct reporting suite.
- Make sure you are using the correct eVar/prop to set up rules in Triggers.
- If you have a URL, try removing the prefix (use 'localhost' instead of 'http://localhost').

### Debug 3 > 4

If 3 > 4 is working, it means that your Triggers payload is arriving at the Adobe I/O Event Gateway. If you can see your Trigger fired, but it's not arriving at your webhook, you should first debug 4 > 5 to make sure your webhook is valid and ready to receive events. If 4 > 5 works and you are still not receiving events, it could be that something went wrong in the Triggers-Pipeline-Event Gateway process. Unfortunately, there's no way to easily debug this step at the moment. Please open an issue on the [Events GitHub project](https://github.com/adobeio/adobeio-documentation).

### Debug 4 > 5

If 4 > 5 is working, it means that your webhook is valid and ready to receive events. You can verify your connection by selecting **Retry** for your webhook on the Adobe Developer Console UI. You should receive a challenge. Your webhook needs to be able to return the challenge to be marked as a valid webhook. If it is marked as Disabled on the console UI, visit the topic [Set up Webhook: Example](../guides/index.md#your-first-webhook) for sample webhook code.

## Debugging Adobe I/O Events with App Builder

### 1. Debug Missing apiKey

```shell
✔ Installed npm package @adobe/generator-app-events-generic
ℹ Running template @adobe/generator-app-events-generic
✖ An error occured while running unknown#prompting
 ›   Error: [EventsSDK:ERROR_SDK_INITIALIZATION] SDK initialization error(s). Missing arguments: apiKey
```

This indicates that the SERVICE_API_KEY in the .env file is not set. One of the reasons this could happen is that the workspace does not have the right credentials in place or the IO Management API.
Add the IO Management API to the workspace run **aio app use** to fix this issue

### 2. Debug .env file overwritten and the provider metadata to provider id mapping is lost

You can easily fetch the provider id associated with the provider metadata by running the cli command **aio event provider ls --providerMetadataIds**

```shell
app-builder-app % aio event provider ls --providerMetadataIds di_event_code dx_marketo_audit_user
Fetching all Event Providers... done
 ID                                   LABEL                          DESC                   SOURCE                                        DOCS
 ──────────────────────────────────── ────────────────────────────── ────────────────────── ───────────────────────────────────────────── ────
 provider-id-1                        Imaging API Events             Imaging API events pr… urn:uuid:provider-id-1     
 provider-id-2                        Marketo User Audit Data Stream Marketo user activity… urn:uuid:provider-id-2
```

For multi instance providers, select the provider id of any one instance

You can then populate the environment variable

```dotenv
AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING = di_event_code:provider-id-1,dx_marketo_audit_user:provider-id-2
```
