---
title: Integrate with AEM 6.4.x (Deprecated)
---

# Integrate with AEM 6.4.x (Deprecated)


<InlineAlert variant="warning" slots="text"/>

IO Events has deprecated support for AEM 6.4 (and all prior versions). We no longer support or maintain this package. <br/>
We strongly recommend you go through an upgrade and instead use either our [AEM on-premise Latest Package](../aem_on_premise_install.md) or our [AEM as cloud service support](../aem_skyline_install.md).

This documentation below is specific to AEM on premise version 6.4.x.

1. Download the latest version of the package: [version 6.4.268](https://github.com/adobeio/adobeio-documentation/files/2624686/aem-event-proxy-6.4.268.zip) 
2. [Install this package](aem_on_premise_package_install_6.4.md)
3. Configure the [AEM Link Externalizer](../aem_on_premise_link_externalizer.md)
4. Configure Adobe I/O Credentials
   1. [set up your service user keystore in AEM](aem_keystore_setup_6.4.md) 
   2. [set up your workspace in the Adobe Developer Console](aem_console_setup_6.4.md)
   3. [Finalize the Adobe IMS configuration in AEM](aem_ims_config_6.4.md)
5. Optionally you may
   1. perform a few [health checks](aem_healthcheck_6.4.md)
   2. do some more [configuration fine tuning](aem_advanced_configurations_6.4.md)
