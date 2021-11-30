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
    window.location.host.indexOf("localhost") === 0
      ? ""
      : "events/docs/";
  let redirectPath = "";

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
      case "#!adobedocs/adobeio-events/master/using/aem-event-setup.md":
        redirectPath = prefixPath + "guides/using/aem/";
        break;
    }
    window.location.href =
      "http://" + window.location.host + "/" + redirectPath;
  }
})();
