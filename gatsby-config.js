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
            path: "guides/runtime_webhooks/index.md",
            pages: [
              {
                title: "Automatic event registrations",
                path: "guides/runtime_webhooks/autoregistrations.md",
              },
            ]
          },
          {
            title: "Introduction to Journaling",
            path: "guides/journaling_intro.md",
          },
          {
            title: "Integration with Amazon EventBridge",
            path: "guides/amazon_eventbridge/index.md",
          }
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
                title: "AEM Cloud Service Events",
                path: "guides/using/aem/cloud-native/index.md",
              },
              {
                title: "AEM Events powered by AEM add-on module",
                path: "guides/using/aem/aem-addon-module/index.md"
              },
              {
                title: "AEM Events FAQ",
                path: "guides/using/aem/aem_faq.md",
              }
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
            title: 'Marketo Data Streams',
            path: 'guides/using/marketo/marketo-data-streams.md',
            pages: [
              {
                title: "Lead Activity",
                path: "guides/using/marketo/marketo-lead-activity-data-stream-setup.md",
              },
              {
                title: "User Audit",
                path: "guides/using/marketo/marketo-user-audit-data-stream-setup.md",
              },
              {
                title: "Notification",
                path: "guides/using/marketo/marketo-notification-data-stream-setup.md",
              },
              {
                title: "Observability (Beta)",
                path: "guides/using/marketo/marketo-observability-data-stream-setup.md",
              },
            ],
          },
          {
            title: 'Custom Events',
            path: 'guides/using/custom_events.md'
          },
          {
            title: 'InDesign APIs Events',
            path: 'guides/using/indesign-apis/indesign-apis-events-data-stream-setup.md'
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
        path: "guides/cli/index.md"
      },
      {
        title: "App Builder Applications with I/O Events",
        path: "guides/appbuilder/index.md"
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
            path: "https://experienceleaguecommunities.adobe.com/t5/adobe-developer/ct-p/adobe-io",
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
