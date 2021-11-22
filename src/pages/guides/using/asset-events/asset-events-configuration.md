# Asset Events Configuration

To configure Asset Events, refer to [Add Events](/console/docs/guides/services/services-add-event/), keeping in mind the following amendments to the **Add Events** and **Credentials** sections:

## Add Events Section

When you get to the step about the _Add events_ dialog, refer to [Asset Events Providers](asset-events-providers.md) for additional guidance.

## Credentials Section

For Asset Events providers, you have the option of selecting which type of authentication to use, either **Service Account (JWT)** or **OAuth**. 

![UI for selecting authentication type](../../img/credentials.png)

### Service Account (JWT)

For a Service Account integration, you will create a JSON Web Token (JWT). A Service Account integration allows your application to call Adobe services on behalf of the application itself, or on behalf of an enterprise organization.

### OAuth

OAuth allows your end users to sign in to your integration with an Adobe ID. With an OAuth token, your integration will be able to access Adobe services or content on behalf of the logged-in user. 
