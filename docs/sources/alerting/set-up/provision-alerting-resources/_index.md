---
aliases:
  - ../provision-alerting-resources/
description: Provision alerting resources
keywords:
  - grafana
  - alerting
  - set up
  - configure
  - provisioning
title: Provision Grafana Alerting resources
weight: 200
---

# Provision Grafana Alerting resources

Alerting infrastructure is often complex, with many pieces of the pipeline that often live in different places. Scaling this across multiple teams and organizations is an especially challenging task. Grafana Alerting provisioning makes this process easier by enabling you to create, manage, and maintain your alerting data in a way that best suits your organization.

There are three options to choose from:

1. Use file provisioning to provision your Grafana Alerting resources, such as alert rules and contact points, through files on disk.

1. Provision your alerting resources using the Alerting Provisioning HTTP API.

   For more information on the Alerting Provisioning HTTP API, refer to [Alerting provisioning API](https://grafana.com/docs/grafana/latest/developers/http_api/alerting_provisioning/).

1. Provision your alerting resources using [Terraform](https://www.terraform.io/).

**Note:**

Currently, provisioning for Grafana Alerting supports alert rules, contact points, notification policies, mute timings, and templates. Provisioned alerting resources using file provisioning or Terraform can only be edited in the source that created them and not from within Grafana or any other source. For example, if you provision your alerting resources using files from disk, you cannot edit the data in Terraform or from within Grafana.

In Grafana, the entire notification policy tree is considered a single, large resource. To add new specific policies, add them as sub-policies under the root policy. Since specific policies may depend on each other, you cannot provision subsets of the policy tree - the entire tree must be defined in a single place.

**Useful Links:**

[Grafana provisioning](/docs/grafana/latest/administration/provisioning/)

[Terraform provisioning](/docs/grafana-cloud/infrastructure-as-code/terraform/)

[Grafana Alerting provisioning API](/docs/grafana/latest/developers/http_api/alerting_provisioning)
