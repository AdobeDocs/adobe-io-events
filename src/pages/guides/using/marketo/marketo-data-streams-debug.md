## Debug

[Debug Tracing](../../../support/tracing.md)

Once you have successfully completed your setup and event subscription registration, events should start being stored in the journal.  In addition, if you have webhooks or runtime set up, the events will go through those flows.  From the project's page in the event registration details, you should see a tab for Debug Tracing.  For webhooks, this will show a record of failed and successful challenge attempts as well as webhook attempts.  Each request includes the request/response details to help debug.

There is also an Event Browser tab which lets you manually look at events in the Journal from the Developer Console UI