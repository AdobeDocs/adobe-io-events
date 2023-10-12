---
title: App Builder with IO Events
---

# App Builder with IO Events

In this guide, you will learn to leverage the power of IO Events to build event-driven applications with Adobe Developer App Builder.
You can listen to events coming from various Adobe Products and Services and build applications that respond to or process these events.

## Prerequisites

You will first need to visit [Adobe Developer Console](https://www.adobe.com/go/devs_console_ui) and create a new project from template in your organization and set up the workspaces using App Builder template. For detailed instructions, follow the steps outlined in this tutorial for [creating a new project from template](/developer-console/docs/guides/projects/projects-template/).

<InlineAlert slots="text"/>

The App Builder template is included as part of the App Builder SKU.

![Select create project from template](../img/ab_select_project_from_template.png)

Once the project and the workspaces have been created, add the *I/O Management API* service with *OAuth Server to Server* credentials to the Stage workspace and any other workspace you will be working with. This will add the required scope to the authentication token required for setting up the project with IO Events Registrations. For a step-by-step guide to adding an API to a project, follow this tutorial for [adding an API to a project using Service Account (JWT) authentication](https://www.adobe.com/go/devs_projects_jwt) (the type of authentication used by the I/O Management API). 

![Add IO Management API](../img/ab_add_io_management_api.png)
![Select oauth server-to-server credentials](../img/ab_oauth_server_to_server.png)

The workspace is now set up

![Workspace setup complete](../img/ab_workspace_setup_complete.png)

