# Adobe Developer Console setup

Add the `I/O Events` and `I/O Management API` API to your Adobe Developer Console workspace

Before you begin, on the top-right corner of the Adobe Developer Console, 
verify you are holding a `System Administrator` role
 
 !["System Administrator shown in the console](../../img/console_role_system_admin.png "System Administrator shown in the console") 

Then, if you have no project nor workspace created yet (or if you are new to this,
please refer to the [step-by-step instructions for creating an empty project in Adobe Developer Console](/apis/experienceplatform/console/docs.html#!AdobeDocs/adobeio-console/master/projects-empty.md)),
and create your project's workspace.

For your AEM to be authorized to emit events against Adobe I/O, 
you need to add the `I/O Events` as well as `I/O Management API` to your project's workspace 
in the Adobe Developer Console. 


1. Click on `Add to Project` > `Service` > API`

   ![Add an API to Project](../../img/add_api_to_project.png "Add an API to Project")

2. Select `I/O Events`, Click `Next`

   ![Select `I/O Events API`](../../img/select_io_events_api.png "Select `I/O Events API`")

3. In the next `Create a new service account (JWT) credential` screen, choose `Option 2` 
and upload your public certificate, the very same one you put in the AEM service user's keystore,
see our [AEM keystore setup documentation](aem_keystore_setup.md).

4. Click on `Save configured API`

   ![Save `I/O Events API`](../../img/save_io_events_api.png "Save `I/O Events API`")

6. **Repeat steps 1, 2, 3 and 4,  this time adding the `I/O Management API`.**
7. Done ! You should now see `I/O Events` as well as `I/O Management API` in your API list. 


## Bookmark your workspace
 
Bookmark this Adobe Developer Console workspace, as you might need to come back to it more than once, 
to fine tune or troubleshoot your configurations.


## Add this Adobe I/O Workspace as AEM OSGI configuration 

**These extra configuration steps are needed only for AEM on-premise version 6.5.x and AEM as a Cloud Service.**

This workspace you just created will indeed be used by AEM to self-register as a new Adobe I/O Events provider. 
For that we need to set its identifiers in AEM, to do that:

In to the `project overview` tab of  workspace, click on the `Download` button: to get all the various credentials as well as `project`, `org` and `workspace` 
identifier associated with your project.
  ![the `project overview` tab and click on the `Download` button](../../img/console_project_overview_download.png "the `project overview` tab and click on the `Download` button")

Some of these identifiers need to be set in AEM as `Adobe I/O Console Workspace Configuration` osgi configuration

  ![Adobe I/O Console Workspace Configuration osgi configuration](../../img/aem_workspace_osgi_config.png "`Adobe I/O Console Workspace Configuration` osgi configuration")

* `Adobe I/O Console consumer OrgId` should be equal to the `project.org.id` value
* `Adobe I/O Console Project Id` should be equal to the `project.id` value
* `Adobe I/O Console Workspace Id` should be equal to the `project.workspace.id` value

In the case of AEM as a Cloud Service, you will have to commit this osgi config on your code repo under
`apps/eventproxy/config.author/com.day.cq.dam.eventprovider.impl.WorkspaceConfigurationImpl.xml` 
here is a sample file :

    <jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
      jcr:mixinTypes="[rep:AccessControllable]"
      jcr:primaryType="sling:OsgiConfig"
      consumerOrgId="12352381"
      projectId="4564566206088344506238"
      workspaceId="7894566206088344506264"
    >
    </jcr:root>

