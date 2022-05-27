---
title: Install `aio-events-aem` on AEM (on-premise)
---

# Install Adobe IO Events integration package on AEM (on-premise)

`aio-aem-events` is a classic AEM package, you have 2 main options to install it:
* you may do it manually using AEM package manager.
* you may automate it with `maven`

## Using AEM Package Manager

1. Open AEM Package Manager by selecting the **Tools** icon and then selecting **Deployment** and **Packages**.
2. In **Package Manager**, select **Upload Package**. Select **Browse** and navigate to the package zip file. Select **OK**.

   >Note: If you have an older version of the package, uninstall it and remove it to avoid potential conflicts.**.

3. Select **Install**.
4. On the **Install Package** dialog box, select **Merge** from the **Access Control Handling** drop-down list and select **Install**.
5. Watch the **Activity Log**. If installed, the log reports that the package is imported.

For more information read the [AEM package manager guide](https://experienceleague.adobe.com/docs/experience-manager-65/administering/contentmanagement/package-manager.html?lang=en)

## Using `maven`

Using `maven`, you may deploy `aio-aem-events` as an embedded package within your own AEM project.

* add `aio-aem-events` in your `maven` build `dependencies` section


      <dependency>
          <groupId>com.adobe.aio.aem</groupId>
          <artifactId>aio-aem-events</artifactId>
          <version>${aio-aem-events.version}</version>
          <classifier>aem65</classifier>
          <type>zip</type>
      </dependency>

* add `aio-aem-events` in your `maven` build `filevault-package-maven-plugin` `embedded` `configuration` section:


      <embedded>
           <groupId>com.adobe.aio.aem</groupId>
           <artifactId>aio-aem-events</artifactId>
           <type>zip</type>
           <target>/apps/mysite-packages/application/install</target>
      </embedded>

For more details on embedding 3rd-party within our AEM project read [AEM project structure guide](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/developing/aem-project-content-package-structure.html%3Flang%3Den#embedding-3rd-party-packages).

If you are looking for a working sample browse [aio-aem-events-sample](https://github.com/francoisledroff/aio-aem-events-sample/tree/aem65)
