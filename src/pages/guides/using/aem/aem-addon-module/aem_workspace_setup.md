---
title: Workspace OSGI configurations
---

# Workspace OSGI configurations

## Requirements

Make sure you have your Adobe Developer Console Workspace properly [configured](aem_console_setup.md),

## Adobe Developer Console Workspace `aio-aem-events` configurations

The `aio-aem-events` add-on module expects your Adobe Developer Console Workspace defined as OSGI configurations.
Its [WorkspaceSupplier](https://github.com/adobe/aio-lib-java/blob/main/aem/core_aem/src/main/java/com/adobe/aio/aem/workspace/internal/WorkspaceSupplierImpl.java)
service looks up the following OSGI configuration keys (refer to your [Adobe Developer Console `project` file](aem_console_setup.md)):

* `aio.project.id` your Adobe Developer Console project id (`project.id`)
* `aio.consumer.org.id`  your Adobe Developer Console consumer orgnaization id (`project.org.id`)
* `aio.ims.org.id` your Adobe Developer Console IMS Organization ID (`project.org.ims_org_id`)
* `aio.workspace.id` your Adobe Developer Console workspace Id (`project.workspace.id`)
* `aio.credential.id` your Adobe Developer Console jwt credential id (`project.workspace.details.credentials[i].id`)
* `aio.api.key` your Adobe Developer Console jwt credential API Key (or Client ID) (`project.workspace.details.credentials[i].jwt.client_id`)
* `aio.client.secret` your Adobe Developer Console jwt credential client secret (`project.workspace.details.credentials[i].jwt.client_secret`)
* `aio.meta.scopes` a comma separated list of metascopes associated with your API, see your Adobe Developer Console jwt credential metascopes (`project.workspace.details.credentials[i].jwt.meta_scopes`)
   * The metascope needs to be in the format: `/s/<metascope1>,/s/<metascope2>` as opposed to how they are enlisted in the [project metadata json](aem_console_setup.md#download-your-adobe-developer-console-project-metadata-file).
   * **For example:** `/s/event_reciever_api,/s/ent_adobeio_sdk`
* `aio.technical.account.id` your Adobe Developer Console jwt credential technical account id (`project.workspace.details.credentials[i].jwt.technical_account_id`)
* `aio.encoded.pkcs8` your private key (in a base64 encoded pkcs8 format) see our [JWT public/private key management guide](aem_key_setup.md).

### On premise configurations

For `on premise` version of AEM:

* Open the Web Console, or select the **Tools** icon, then select **Operations** and **Web Console**.
* Scroll down the list to find **Adobe I/O Events' Workspace Configuration**, update all the values mentioned above.
* Select **Save** when done.

### AEM as a cloud service configurations

When running on AEM as a cloud service, you'll have to use Cloud Manager to deploy these configurations,
[choose the appropriate OSGi configuration value types](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/deploying/configuring-osgi.html%3Flang%3Den#how-to-choose-the-appropriate-osgi-configuration-value-type),
mix environment variables, and secret environments variables (for `aio.client.secret` and `aio.encoded.pkcs8`).
You may refer to this sample application to get a first working sample: [aio-aem-events-sample](https://github.com/francoisledroff/aio-aem-events-sample)
