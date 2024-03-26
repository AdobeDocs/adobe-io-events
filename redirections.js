/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

(() => {
  let prefixPath =
    window.location.host.indexOf("localhost") === 0 ? "" : "events/docs/";
  let redirectPath = "";
  let hostChange;
  if (
    (window.location.hash !== "" &&
      window.location.pathname === "/" &&
      window.location.host.indexOf("localhost") === 0) ||
    (window.location.hash !== "" &&
      window.location.pathname === "/events/docs/" &&
      window.location.host.indexOf("localhost") < 0)
  ) {
    switch (window.location.hash) {
      case "#!adobedocs/adobeio-events/master/readme.md":
        redirectPath = prefixPath;
        break;
      case "#!adobedocs/adobeio-events/master/intro/webhooks_intro.md":
        redirectPath = prefixPath + "guides/";
        break;
      case "#!adobedocs/adobeio-events/master/intro/journaling_intro.md":
        redirectPath = prefixPath + "guides/journaling_intro/";
        break;
      case "#!adobedocs/adobeio-events/master/using/using.md":
        redirectPath = prefixPath + "guides/using/";
        break;
      case "#!adobedocs/adobeio-events/master/using/analytics-triggers-event-setup.md":
        redirectPath =
          prefixPath + "guides/using/analytics-triggers-event-setup/";
        break;
      case "#!adobedocs/adobeio-events/master/using/cloudmanager.md":
        hostChange =
          "https://developer.adobe.com/experience-cloud/cloud-manager/guides/getting-started/create-event-integration/";
        break;
      case "#!adobedocs/adobeio-events/master/using/experience-platform-event-setup.md":
        redirectPath =
          prefixPath + "guides/using/experience-platform-event-setup/";
        break;
      case "#!adobedocs/adobeio-events/master/using/privacy-event-setup.md":
        redirectPath = prefixPath + "guides/using/privacy-event-setup/";
        break;
      case "#!adobedocs/adobeio-events/master/using/marketo-user-audit-data-stream-setup.md":
        redirectPath =
          prefixPath + "guides/using/marketo/marketo-user-audit-data-stream-setup/";
        break;
      case "#!adobedocs/adobeio-events/master/guides/using/marketo-user-audit-data-stream-setup.md":
        redirectPath =
            prefixPath + "guides/using/marketo/marketo-user-audit-data-stream-setup/";
        break;
      case "#!adobedocs/adobeio-events/master/using/custom_events.md":
        redirectPath = prefixPath + "guides/using/custom_events/";
        break;
      case "#!adobedocs/adobeio-events/master/api/api.md":
        redirectPath = prefixPath + "guides/api/";
        break;
      case "#!adobedocs/adobeio-events/master/api/journaling_api.md":
        redirectPath = prefixPath + "guides/api/journaling_api/";
        break;
      case "#!adobedocs/adobeio-events/master/api/registration_api.md":
        redirectPath = prefixPath + "guides/api/registration_api/";
        break;
      case "#!adobedocs/adobeio-events/master/api/provider_api.md":
        redirectPath = prefixPath + "guides/api/provider_api/";
        break;
      case "#!adobedocs/adobeio-events/master/api/eventsingress_api.md":
        redirectPath = prefixPath + "guides/api/eventsingress_api/";
        break;
    }

    if (hostChange) {
      window.location.href = hostChange;
    } else {
      window.location.href =
        "http://" + window.location.host + "/" + redirectPath;
    }
  }
})();
