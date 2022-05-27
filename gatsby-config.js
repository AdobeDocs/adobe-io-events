/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  siteMetadata: {
    home: {
      title: "Adobe I/O Events",
      path: "/events",
    },
    pages: [
      {
        title: "Overview",
        path: "index.md",
      },
      {
        title: "Guides",
        path: "guides",
      },
      {
        title: "API Reference",
        path: "api.md",
      },
      {
        title: "Support",
        path: "support",
      },
    ],
    subPages: [
      {
        title: "Getting Started",
        path: "guides",
        pages: [
          {
            title: "Introduction to Adobe I/O Events Webhooks",
            path: "guides/index.md",
          },
          {
            title: "Runtime Actions As Webhook",
            path: "guides/runtime_webhooks.md",
          },
          {
            title: "Introduction to Journaling",
            path: "guides/journaling_intro.md",
          },
        ],
      },
      {
        title: "Using Adobe I/O Events",
        path: "guides/using/index.md",
        pages: [
          {
            title: "AEM Events",
            path: "guides/using/aem/index.md",
            pages: [
              {
                title: "AEM 6.4.x on Premise Events (Deprecated)",
                path: "guides/using/aem/deprecated/aem_on_premise_install_6.4.md",
                pages: [
                  {
                    title: "AEM Adobe IMS Configuration",
                    path: "guides/using/aem/deprecated/aem_ims_config_6.4.md",
                  },
                  {
                    title: "Create and Upload Adobe I/O Certificate Keystore to AEM",
                    path: "guides/using/aem/deprecated/aem_keystore_setup_6.4.md",
                  },
                  {
                    title: "Adobe Developer Console Setup",
                    path: "guides/using/aem/deprecated/aem_console_setup_6.4.md",
                  },
                  {
                    title: "AEM Advanced Configurations",
                    path: "guides/using/aem/deprecated/aem_advanced_configurations_6.4.md",
                  },
                  {
                    title: "AEM - IO Events Health Check",
                    path: "guides/using/aem/deprecated/aem_healthcheck_6.4.md",
                  },
                ]
              },
              {
                title: "AEM on Premise Events",
                path: "guides/using/aem/aem_on_premise_install.md",
              },
              {
                title: "AEM as a Cloud Service Events",
                path: "guides/using/aem/aem_skyline_install.md",
              },
              {
                title: "JWT Authentication public/private keys",
                path: "guides/using/aem/aem_key_setup.md",
              },
              {
                title: "Adobe Developer Console Setup",
                path: "guides/using/aem/aem_console_setup.md",
              },
              {
                title: "AEM Advanced Configurations",
                path: "guides/using/aem/aem_advanced_configurations.md",
              },
              {
                title: "Workspace OSGI configurations",
                path: "guides/using/aem/aem_workspace_setup.md",
              },
              {
                title: "AEM Events Status Checks",
                path: "guides/using/aem/aem_status_check.md",
              },
              {
                title: "AEM Link Externalizer Configuration",
                path: "guides/using/aem/aem_on_premise_link_externalizer.md",
              },
              {
                title: "AEM FAQ",
                path: "guides/using/aem/aem_faq.md",
              },
            ],
          },
          {
            title: "Asset Events",
            path: "guides/using/asset-events/asset-events-landing.md",
            pages: [
              {
                title: "Asset Events Configuration",
                path: "guides/using/asset-events/asset-events-configuration.md",
              },
              {
                title: "Asset Events Actions",
                path: "guides/using/asset-events/asset-events-actions.md",
              },
              {
                title: "Asset Events Properties",
                path: "guides/using/asset-events/asset-events-properties.md",
              },
              {
                title: "Asset Events Providers",
                path: "guides/using/asset-events/asset-events-providers.md",
              },
              {
                title: "Migrating from Legacy Events to Asset Events",
                path: "guides/using/asset-events/asset-events-migration.md",
              },
              {
                title: "Asset Events Glossary",
                path: "guides/using/asset-events/asset-events-glossary.md",
              },
            ],
          },
          {
            title: "Integrate Analytics Triggers",
            path: "guides/using/analytics-triggers-event-setup.md",
          },
          {
            title: "Creative Cloud Asset Events",
            path: "guides/using/cc-asset-event-setup.md",
          },
          {
            title: 'Cloud Manager Events',
            path: 'guides/using/cloud-manager-events.md'
          },
          {
            title: "Adobe Experience Platform Events",
            path: "guides/using/experience-platform-event-setup.md",
          },
          {
            title: "Privacy Events",
            path: "guides/using/privacy-event-setup.md",
          },
          {
            title: 'Marketo User Audit Data Stream',
            path: 'guides/using/marketo-user-audit-data-stream-setup.md'
          },
          {
            title: 'Custom Events',
            path: 'guides/using/custom_events.md'
          }
        ]
      },
      {
        title: "API",
        path: "guides/api/index.md",
        pages: [
          {
            title: "Journaling API",
            path: "guides/api/journaling_api.md",
          },
          {
            title: "Registration API",
            path: "guides/api/registration_api.md",
          },
          {
            title: "Provider API",
            path: "guides/api/provider_api.md",
          },
          {
            title: "Events Publishing API",
            path: "guides/api/eventsingress_api.md",
          },
        ],
      },
      {
        title: "CLI",
        path: "guides/cli/index.md",
        pages: [
          {
            title: "Events Template Generator",
            path: "guides/cli/template_generator_cli.md",
          },
        ],
      },
      {
        title: "SDK",
        path: "guides/sdk/index.md",
        pages: [
          {
            title: "Getting started with Events SDK",
            path: "guides/sdk/sdk_getting_started.md",
          },
          {
            title: "Event Metadata",
            path: "guides/sdk/sdk_event_metadata.md",
          },
          {
            title: "Journaling",
            path: "guides/sdk/sdk_journaling.md",
          },
          {
            title: "Providers",
            path: "guides/sdk/sdk_providers.md",
          },
          {
            title: "Publish Events",
            path: "guides/sdk/sdk_publish_events.md",
          },
          {
            title: "Signature Verification",
            path: "guides/sdk/sdk_signature_verification.md",
          },
          {
            title: "Webhooks",
            path: "guides/sdk/sdk_webhooks.md",
          },
        ],
      },
      {
        title: "Support",
        path: "support/index.md",
        pages: [
          {
            title: "Debugging",
            path: "support/debug.md",
          },
          {
            title: "Tracing",
            path: "support/tracing.md",
          },
          {
            title: "Forums",
            path: "https://forums.adobe.com/community/adobe-io/adobe-io-events",
          },
          {
            title: "Frequently Asked Questions (FAQ)",
            path: "support/faq.md",
          },
        ],
      },
    ],
  },
  plugins: ["@adobe/gatsby-theme-aio"],
  pathPrefix: process.env.PATH_PREFIX || "/events/docs/",
  proxy: [
    {
      prefix: '/experience-cloud/cloud-manager',
      url: 'https://developer.adobe.com'
    },
    {
      prefix: '/app-builder',
      url: 'https://developer.adobe.com'
    },
    {
      prefix: '/developer-console/docs/guides',
      url: 'https://developer.adobe.com'
    },
    {
      prefix: '/runtime/docs/guides',
      url: 'https://developer.adobe.com'
    },
  ],
};
