---
keywords:
  - Adobe I/O Events API
  - Providers
title: Adobe I/O Events API Reference Swagger
description: API reference documentation for Adobe I/O Events.
layout: none
--- 

<RedoclyAPIBlock
    src="/events/docs/events-api-reference.yaml"
    width="600px"
    typography="fontSize: '16px'"
    codeBlock="tokens: { punctuation: { color: 'red ' }}"
    disableSidebar={false}
    disableSearch={true}
    hideTryItPanel
    scrollYOffset={64}
    sortOperationsAlphabetically
    sortTagsAlphabetically
    jsonSampleExpandLevel="all"
    generateCodeSamples="languages: [{ lang: 'curl' }, { lang: 'Node.js' }, { lang: 'JavaScript' }, {lang: 'Python'}]"
    requestInterceptor="
    function(req, operation) {
    console.log('Args:', req, operation);
    return req;
    }
    "
/>

