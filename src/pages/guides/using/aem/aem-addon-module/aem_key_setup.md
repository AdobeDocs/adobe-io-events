---
title: JWT Authentication public/private keys management
---

# JWT Authentication public/private keys management

To secure the calls between Adobe I/O Events and AEM, we leverage a JWT exchange token flow.
This flow requires the JWT request to be signed, and therefore, requires private-public keys configurations
(see our [JWT authentication flow documentation](https://developer.adobe.com/developer-console/docs/guides/authentication/JWT/)
for more details). This documentation details these configurations steps.

## Create your public/private key pair

To create an RSA private/public certificate pair, use [openssl](https://www.openssl.org/docs/manpages.html):

```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate_pub.crt
```

## Upload your public key in your Adobe Developer Workspace

Upload the public key you generated above (`certificate_pub.crt`) in your Adobe Developer Workspace,
see our [Adobe Developer Console guide](https://developer.adobe.com/developer-console/docs/guides/credentials/)

## Convert your private key in a simple base64-encoded String

First, to convert your private key to a PKCS8 format, use the following command:

```bash
openssl pkcs8 -topk8 -inform PEM -outform DER -in private.key -nocrypt > private.pkcs8.key
```

Then, to base 64 encode it, use the following command:

```bash
base64 private.pkcs8.key
```

You will use the resulting (base64 encoded pkcs8 key) string to configure `aem-io-events`,
and set its `aio.encoded.pkcs8` configuration.
