---
title: Setting up Marketo Lead Activity Data Stream with Adobe I/O Events
---

import DeveloperGuidelines from 'marketo-data-streams-developer-guidelines.md'
import Debug from 'marketo-data-streams-debug.md'

# Setting up Marketo Lead Activity Data Stream with Adobe I/O Events

These instructions describe how to set up and get started using Adobe I/O Events for Marketo lead-based activities and change events.

## Introduction

The Lead Activity Data Stream provides near real-time streaming of audit tracking Lead Activities where large volumes of Lead Activities can be sent to a customer’s external system. Streams enable customers to effectively audit Lead-related events, usage patterns, provide views into Lead changes and trigger processes and workflows based upon the different types of Lead Events.

## Setup Lead Activity Data Stream in Marketo

Data Streams are available to those that have purchased a Marketo Engage Performance Tier Package. Once a Performance Tier agreement is in place, work with your TAM and Customer Engineering team to enable this Data Stream for your subscription.

We typically just need to know the MunchkinId for the subscription, and the associated Adobe OrgId, which enables access to the Adobe IO Developer Console.

For the Lead Activity Data Stream, we will also need to know the specific types of events that you would like to subscribe to, which can be found in the [Event List](#event-list) below.

