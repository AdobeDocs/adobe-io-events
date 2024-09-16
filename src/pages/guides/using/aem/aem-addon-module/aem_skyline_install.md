---
title: AEM Events powered by Add-On Module on AEM as a Cloud Service
---

import AemAddonModuleDeprecationNotice from '/src/pages/common/aem-addon-module-deprecation-notice.md'

# AEM Events powered by Add-On Module on AEM as a Cloud Service

<AemAddonModuleDeprecationNotice />

This documentation has instructions to set up I/O Events integrations with AEM as a Cloud Service powered by the AEM add-on module.

To integrate with AEM On Premise, please refer to the other associated [documentation](aem_on_premise_install.md).

To install and configure the AEM add-on module on AEM as a Cloud Service:

1. [Set up your workspace in the Adobe Developer Console](aem_console_setup.md)
2. Use Cloud Manager environment variables to power your [OSGI configuration](aem_workspace_setup.md).
3. Optionally do some more [configuration fine tuning](aem_advanced_configurations.md).
4. Deploy these osgi configurations, together with `aem-aio-events` add-on module using Cloud Manager. You may refer to this working sample [aio-aem-events-sample](https://github.com/francoisledroff/aio-aem-events-sample).
5. Trigger `aem-aio-events` add-on module [status check endpoint](aem_status_check.md).
