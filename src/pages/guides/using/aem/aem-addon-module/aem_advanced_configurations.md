---
title: AEM Advanced Configurations | Adobe IO Events
---

# AEM & Adobe IO Events - Advanced Configurations

## Custom OSGI to Adobe I/O Events event mapping configurations:

The `aio-aem-events` package is providing a set of
[11 default OSGI to Adobe I/O Events event mapping configurations](https://github.com/adobe/aio-lib-java/tree/main/aem/aio_aem_events/src/cs/content/jcr_root/apps/aio-aem-events/osgiconfig/config.author)

You can extend these and define your own mapping.
For more details about these refer to our [`aio-aem-events-osgi-mapping` project](https://github.com/adobe/aio-lib-java/tree/main/aem/events_osgi_mapping)

## Adobe I/O Events queuing and retries

When an OSGI event of interest is triggered (i.e an OSGI events that matches one of your mapping configurations, see above),
it makes it to a job queue handled
by an [`aio-aem-event` Sling Job Consumer](https://github.com/adobe/aio-lib-java/blob/main/aem/events_ingress_aem/src/main/java/com/adobe/aio/aem/event/publish/EventPublishJobConsumer.java).

This job is persisted in the resource tree (for failover etc.), then the job is distributed
to an instance responsible for processing the job; and on that instance the job is put into a processing queue,
where eventually a Sling Job Consumer will execute it.

This Adobe I/O Events Sling Job Consumer's job is to send this event to Adobe I/O.
* `JobResult.OK` should be returned. If the job has not been processed completely,
* `JobResult.FAILED` should be returned if Adobe I/O fails either to receive or to process it (due to network failure or Adobe I/O failure).
  In that case the job will be rescheduled/retried
* if the max number of retries is met, the process will not be rescheduled and treated like the method would have returned `JobResult.CANCEL`.

Note that
* Adobe I/O Events Sling Job Consumer topic is `aio/events`
* Adobe I/O Events `Sling Job Queue configuration` is the default `Apache Sling Job Default Queue` with
    * a Normal job priority
    * 10 maximum retries
    * 2 seconds retry delay
    * 15 maximum parallel jobs

You can tune this configuration according to your needs: using the `OSGI > configuration` menu of AEM's `system console`
and create there a new `Apache Sling Job Queue Configuration`

Note that you can use the `Sling > Jobs`  menu of AEM `system console`,
to look up the statistics and health of your queues

Please refer to the Sling documentation:
* https://sling.apache.org/apidocs/sling7/org/apache/sling/event/jobs/consumer/JobConsumer.html
* https://sling.apache.org/documentation/bundles/apache-sling-eventing-and-job-handling.html
