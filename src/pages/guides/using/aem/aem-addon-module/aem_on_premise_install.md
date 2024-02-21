---
title: AEM on Premise Events
---

# AEM on Premise Events

To install and configure the Adobe I/O Events package on AEM (version 6.5.x and above):

1. [Set up your workspace in Adobe Developer Console](aem_console_setup.md)
   * [Set up your JWT Authentication public/private keys](aem_key_setup.md)
4. Configure the [AEM Link Externalizer](aem_on_premise_link_externalizer.md)
2. Download the latest version of the package `aio-aem-events-<version>-aem65.zip`
   * from [github aio-lib-java releases](https://github.com/adobe/aio-lib-java/releases)
   * or from [maven-central](https://repo1.maven.org/maven2/com/adobe/aio/aem/aio-aem-events/)
     (download the `aem65` classifier `maven` artifact, the default `maven` artifact targets AEM as a cloud service)
3. [Install `aio-aem-event` package](aem_on_premise_package_install.md)
5. [Configure it](aem_workspace_setup.md)
6. Trigger its [status check endpoints](aem_status_check.md)
7. Optionally do some more [configuration fine tuning](aem_advanced_configurations.md)
