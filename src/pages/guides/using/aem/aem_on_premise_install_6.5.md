---
title: Integrate with AEM 6.5.x
---

# Integrate with AEM 6.5.x

This documentation is specific to AEM On Premise version 6.5.x, 
to integrate with AEM as cloud service, please refer to our [AEM as cloud service documentation](aem_skyline_install.md).

To install and configure the Adobe I/O Events package on AEM On Premise version 6.5.x:

1. Download the [latest version of the package](https://github.com/AdobeDocs/adobeio-events/releases/tag/2020_07_20_13_00)
2. [Install this package](aem_on_premise_package_install.md)
3. Configure the [AEM Link Externalizer](aem_on_premise_link_externalizer.md)
4. Configure Adobe I/O Credentials
   1. [set up your service user keystore in AEM](aem_keystore_setup.md) 
   2. [set up your workspace in the Adobe Developer Console, and as OSGI configuration](aem_console_setup.md)
   3. [Finalize the Adobe IMS configuration in AEM](aem_ims_config.md)
5. [Trigger the final Adobe I/O Events health checks](aem_healthcheck_servlet.md)
6. Optionally do some more [configuration fine tuning](aem_advanced_configurations.md)

   
