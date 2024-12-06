---
title: AEM Events
---

# AEM Events

Currently, there are two ways in which customers can start using AEM Events:
1. **[AEM Cloud Service Events](./cloud-native/index.md)** 

2. [AEM Events powered by AEM Add-on module (Deprecated)](./aem-addon-module/index.md).

Please note that choosing **AEM Cloud Service Events** offers the following advantages over the legacy way of consuming AEM Events:

1. A generic eventing platform that makes it easy to subscribe to events, process them according to your project needs in most lightweight, scalable, and secure ways
2. Separation of functions like AEM Events in this case into standardized dedicated services for improved scalability and maintainability
3. Avoidance of custom code in AEM runtimes for better robustness and reduced effort when deploying, testing, and maintaining AEM as Cloud Service

## Glossary

### AEM Cloud Service Events

AEM Cloud Service Events refer to the events provided by the new cloud-native eventing system, allowing subscriptions to AEM Events for processing in external systems. This is an out-of-the-box solution, meaning customers don't need to install or configure any custom code or components.

### AEM Events powered by AEM add-on module (Deprecated)

AEM Events powered by the AEM add-on module refers to the legacy way of consuming AEM Events. Customers were required to either install the [add-on module](https://github.com/adobe/aio-lib-java/tree/main/aem/aio_aem_events) on their on-premise instances or deploy the same on their AEM CS environments to begin consuming events emitted from their AEM instances.

### AEM CS

AEM as a Cloud Service

### AEM Event

An AEM Event signifies a notification of state change sent by AEM whenever a particular action occurs. For example, this can include events when a content fragment is created, updated, or deleted.
