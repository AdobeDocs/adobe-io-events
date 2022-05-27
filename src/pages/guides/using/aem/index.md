---
title: Setting up AEM Events with Adobe I/O Events
---

# Setting up AEM Events with Adobe I/O Events

These instructions describe how to set up Adobe Experience Manager (AEM) to integrate with Adobe I/O Events. 
**It is only supported on author instances.**
You can use Adobe I/O Events for notification of AEM events, such as page or asset CUD operations.

## Introduction

### Obtain authorization

To complete this solution, you will need authorization to use the following services:

*   An AEM instance with administrative permissions. 
*   [Adobe Developer Console](/console) access, with administrative permissions for your enterprise organization.


## Setup Products

* Integrate with AEM On Premise
  * [AEM version 6.4.x](../aem/deprecated/aem_on_premise_install_6.4.md), 
  * [AEM version 6.5.x](../aem/aem_on_premise_install_6.5.md)
* [Integrate with AEM as a Cloud Service ](../aem/aem_skyline_install.md)

## Use Adobe I/O

Once the above is done, you are ready to register a new [webhook](../../index.md) 
or to start pulling events from this new source using the [journaling](../../journaling_intro.md).


