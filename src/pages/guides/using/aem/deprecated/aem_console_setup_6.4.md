---
title: Adobe Developer Console Setup for AEM 6.4.x
---

# Adobe Developer Console Setup for AEM 6.4.x

Add the `I/O Events` and `I/O Management API` API to your Adobe Developer Console workspace

Before you begin, on the top-right corner of the Adobe Developer Console, 
verify you are holding a `System Administrator` role
 
 !["System Administrator shown in the console](../../../img/console_role_system_admin.png "System Administrator shown in the console") 

Then, if you have no project nor workspace created yet (or if you are new to this,
please refer to the [step-by-step instructions for creating an empty project in Adobe Developer Console](/developer-console/docs/guides/projects/projects-empty/)),
and create your project's workspace.

For your AEM to be authorized to emit events against Adobe I/O, 
you need to add the `I/O Events` as well as `I/O Management API` to your project's workspace 
in the Adobe Developer Console. 


1. Click on `Add to Project` > `Service` > API`

   ![Add an API to Project](../../../img/add_api_to_project.png "Add an API to Project")

2. Select `I/O Events`, Click `Next`

   ![Select `I/O Events API`](../../../img/select_io_events_api.png "Select `I/O Events API`")

3. In the next `Create a new service account (JWT) credential` screen, choose `Option 2` 
and upload your public certificate, the very same one you put in the AEM service user's keystore,
see our [AEM keystore setup documentation](aem_keystore_setup_6.4.md).

4. Click on `Save configured API`

   ![Save `I/O Events API`](../../../img/save_io_events_api.png "Save `I/O Events API`")

6. **Repeat steps 1, 2, 3 and 4,  this time adding the `I/O Management API`.**
7. Done ! You should now see `I/O Events` as well as `I/O Management API` in your API list. 


## Bookmark your workspace
 
Bookmark this Adobe Developer Console workspace, as you might need to come back to it more than once, 
to fine tune or troubleshoot your configurations.
