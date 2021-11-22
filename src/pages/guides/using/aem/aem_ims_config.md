# AEM (6.4.x and above) Adobe IMS configuration

To secure the calls between Adobe I/O and AEM, we leverage an oAuth JWT exchange token flow.
 This flow uses a certificate to sign the JWT request and therefore requires certificates configurations on both ends.
 
Here are the final steps describing the Adobe IMS configuration needed by Adobe I/O Events to perform this oAuth JWT exchange token flow.

The prerequisites are
* [a keystore added into AEM service user&rsquo;s keystores vault](aem_keystore_setup.md)  
* [an developer console project created using the associated public certificate](aem_console_setup.md)

Once the above is complete:

1. Open your AEM `Tools` menu, or select the `Security` section, and then select `Adobe IMS Configurations` tile.

   ![Adobe IMS Configurations UI](../../img/events_aem_adobe-ims-conf-1.png "Adobe IMS Configurations UI")

2. Click **Create**; 
**Select `AdobeIOEvents`** in the Cloud Solution drop down; once selected, you should see the certificate you just added to the AEM `eventproxy-service` user's keystore;
   Click **Next**

![Adobe IMS Configuration Creation](../../img/events_aem_adobe-ims-conf-2.png "Adobe IMS Configuration Creation")

3. Fill in the various entries expected to configure the IMS account associated with the integration
 you just [created in the Adobe Developer Console](aem_console_setup.md):
* For **Title**: specify **Adobe I/O Events** (or any other title that makes sense to you).
* For **Authorization Server**: it should be `https://ims-na1.adobelogin.com` (unless the URL shown in the **JWT** tab of your integration page in the Adobe Developer Console is different),
* For **API key**: Provide the `CLIENT ID` available in the `Credentials details` tab of your credentials `Service Account (JWT)` page in your Adobe Developer Console workspace
* For **Client Secret**: Provide the `CLIENT SECRET` available in the `Credentials details` tab of your credentials `Service Account (JWT)` page in your Adobe Developer Console workspace
* For **Payload**: Provide the `JWT payload` available in the `Generate JWT` tab of your credentials `Service Account (JWT)` page in your Adobe Developer Console workspace
  
   ![Adobe Developer Console Generate JWT tab](../../img/console_generate_jwt_tab.png "Adobe Developer Console Generate JWT tab")

4. Click **Create**

    ![Adobe IMS Configuration IMS account form](../../img/events_aem_adobe-ims-conf-3.png "Adobe IMS Configuration IMS account form")

5. Now you should see this new Adobe I/O Events IMS Configuration, and you can select it to check its health.

     ![Adobe IMS Configuration IMS Health Check](../../img/events_aem_adobe-ims-conf-4.png "Adobe IMS Configuration Health Check")
      

