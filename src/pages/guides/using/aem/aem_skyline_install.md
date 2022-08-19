---
title: AEM as a Cloud Service Events
---

# AEM as a Cloud Service Events

This documentation has instructions to set up I/O Events integrations with AEM as a Cloud Service.
To integrate with AEM On Premise, please refer to the other associated [documentation](aem_on_premise_install.md).

To install and configure the Adobe I/O Events package on AEM as a Cloud Service:

1. [Set up your workspace in the Adobe Developer Console](aem_console_setup.md)
   * [Prepare your JWT Authentication public/private keys](aem_key_setup.md)
2. Use Cloud Manager environment variables to power your [OSGI configuration](aem_workspace_setup.md).
3. Optionally do some more [configuration fine tuning](aem_advanced_configurations.md).
4. Deploy these osgi configurations, together with `aem-aio-events` package using Cloud Manager. You may refer to this working sample [aio-aem-events-sample](https://github.com/francoisledroff/aio-aem-events-sample).
4. Trigger `aem-aio-events` package [status check endpoint](aem_status_check.md).
