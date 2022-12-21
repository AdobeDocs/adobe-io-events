## Receiving events for users

Once your integration is set up, and your webhook is in place; to receive events, your integration needs to connect to its event provider on behalf of its user. This requires authentication; see [OAuth Integration](/developer-console/docs/guides/authentication/OAuthIntegration/).

_Depending on your scenario and the Adobe service you're targeting, you may have to enable different types of authentication; see the [Adobe I/O Authentication Overview](/developer-console/docs/guides/authentication/) for more information on how to set up your app for authentication with your users._

For example for `Creative Cloud Libraries` events, you will need to add the _Creative Cloud Libraries_ as a service, then use the [OAuth 2.0 protocol](/developer-console/docs/guides/authentication/OAuth/) to build an interface for your user to log into your app, and give your app authorization to access Creative Cloud Assets. Once your app is authenticated, Adobe will begin to push events to your integration's webhook via HTTP POST messages.

_Follow [adding an API that uses OAuth to a Console project](/developer-console/docs/guides/services/services-add-api-oauth/) guide, and select Creative Cloud Libraries from the list of available APIs._

### Adobe Consent API

To authenticate your app to receive events on your users' behalf (and for development purposes), you must provide consent via the Adobe Consent API:

```
https://ims-na1.adobelogin.com/ims/authorize/v1?response_type=code&client_id=api_key_from_console&scope=AdobeID,openid,creative_sdk
```

You will need to replace `api_key_from_console` with the **Client ID** value provided on the *Credentials* tab of the *Registration Details* in your Console project.

_A good utility for testing this process is the [Adobe IMS OAuth Playground](https://runtime.adobe.io/api/v1/web/io-solutions/adobe-oauth-playground/oauth.html). Follow instructions in the FAQ._

Once all of the above steps are completed, try logging into [Creative Cloud Assets](https://assets.adobe.com) using the same Adobe ID as the one you used for `Adobe Developer Console` and create a library. If all went well, then a `cc_library_created` event will be successfully delivered to your webhook. 