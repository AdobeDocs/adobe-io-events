---
title: Signature Verification for Events | Adobe I/O Events SDK
---

# Signature Verification for Events

Your webhook URL must be accessible from the open internet, however this means third-party actors can send forged requests, tricking your application into handling fake events.

To prevent this from happening, Adobe I/O Events adds an `x-adobe-signature` header to each POST request it does to your webhook URL, which allows you to verify that the request was really made by Adobe I/O Events.

This signature or “message authentication code” is computed using a cryptographic hash function and a secret key applied to the body of the HTTP request. In particular, a SHA256 [HMAC](https://en.wikipedia.org/wiki/HMAC) is computed of the JSON payload, using your Client Secret as a secret key, and then turned into a Base64 digest. 

This SDK method allows you to pass the `x-adobe-signature` header received and the JSON payload delivered to the webhook to check its authenticity. The method returns `true` if the calculated signature matches that of the header, otherwise it returns `false`. 

This can be incorporated as part of any webhook implementation in order to verify the signature for each event received at the webhook endpoint. 

For information on installing and using the SDK, please begin by reading the [getting started guide](sdk_getting_started.md).

## Method

```javascript
verifySignatureForEvent(event, clientSecret, signatureHeaderValue) ⇒ boolean
```

|Parameter	|Type	|Description|
|---|---|---|
|`event`	|object	|JSON payload delivered to the registered webhook URL.|
|`clientSecret`	|string	|Client Secret can be retrieved from the [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui).|
|`signatureHeaderValue`	|string	|Value of `x-adobe-signature` header in each POST request to the registered webhook URL.|

## Sample Headers

Headers received as part of POST to webhook URL:

```http
Request URL: <webhook_url>
Request method: POST
Content-Type: application/json; charset=utf-8
accept-encoding: deflate,compress,identity
user-agent: Adobe/1.0
x-adobe-delivery-id: <id>
x-adobe-event-code: <event_code>
x-adobe-event-id: <event_id>
x-adobe-provider: <provider_name>
x-adobe-signature: <signature>
```

## Response

If signature matches, returns `true` otherwise returns `false`.