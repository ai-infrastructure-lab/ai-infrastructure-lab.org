---
title: Open model supply chains
description: Investigating the software, datasets, labour, hardware access, and governance practices behind open-weight and open-source AI systems.
date: 2026-02-12
author: AI Infrastructure Lab
status: published
---

This project examines what has to be in place for open AI systems to be produced, maintained, evaluated, and reused. Public debate often treats “open” as a property of a released model: weights are available, code is published, or a license allows certain forms of reuse. We approach openness as a supply chain that depends on many upstream and downstream conditions.

Open-weight and open-source AI systems rely on datasets, training code, evaluation pipelines, model documentation, hosting infrastructure, developer communities, safety practices, and long-term maintenance. Some of these elements are visible in repositories and model cards. Others are distributed across organisations, labour arrangements, funding sources, compute access, and informal norms.

<figure>
  <img src="/images/servers2-web.webp" alt="Server infrastructure used for computational workloads">
  <figcaption>Open models still depend on scarce infrastructure: compute clusters, storage, evaluation environments, and hosting systems that shape who can build and reuse them.</figcaption>
</figure>

## Research focus

The project investigates the practical infrastructure of openness. We ask what resources are required to reproduce, adapt, evaluate, and govern open AI systems after publication. This includes technical artefacts such as checkpoints and training scripts, but also organisational artefacts such as funding models, moderation policies, contribution processes, and maintenance routines.

Our starting point is that open release does not automatically create open capability. A model may be downloadable but impossible for most organisations to inspect, fine-tune, or deploy responsibly. A repository may contain code but lack the data lineage, compute budget, or evaluation detail needed for meaningful reuse. A permissive license may enable experimentation while leaving accountability questions unresolved.

We therefore study openness across the full model lifecycle: data collection, training, release, evaluation, deployment, community adaptation, and retirement. This lifecycle view helps identify where openness is strong, where it is partial, and where it depends on invisible forms of labour or infrastructure.

## Openness as a supply chain

The supply chain begins before training. Data must be collected, filtered, deduplicated, labelled, licensed, documented, and stored. Those processes involve legal assumptions, cultural judgements, moderation decisions, and labour that may be poorly documented. When a model is released without sufficient information about its data history, downstream users inherit uncertainty even if the weights are technically accessible.

Training introduces another set of dependencies. Open projects need compute budgets, accelerator access, distributed training expertise, experiment tracking, checkpoint storage, and failure recovery. If only a small number of organisations can afford to produce the base models that everyone else adapts, then openness at the release layer may coexist with concentration at the production layer.

After release, the supply chain continues through hosting, inference optimisation, fine-tuning libraries, safety filters, benchmarking tools, community documentation, integration examples, and support channels. Many users encounter an open model through a platform interface rather than through a local deployment. In those cases, open artefacts may travel through closed hosting, proprietary optimisation layers, or commercial terms of service.

## Research questions

This project asks how open models become usable infrastructure rather than isolated artefacts. What information is needed to assess a model’s training history, limitations, and appropriate uses? Which parts of the release are reproducible in practice? Who maintains the libraries, datasets, evaluation suites, and deployment recipes that make the model usable? What happens when maintainers leave, funding ends, or a community shifts attention to a newer release?

We also ask how openness affects accountability. If a model is adapted by thousands of downstream actors, who is responsible for documenting changes, reporting harms, correcting vulnerabilities, or communicating limitations? Where should governance sit: with the original model producer, the hosting platform, the fine-tuner, the deployer, or the community that maintains shared tools?

These questions are especially important for public-interest organisations. Universities, public agencies, journalists, civic technologists, and small companies may turn to open models because they promise control and transparency. The project examines when that promise is real, when it is partial, and when it depends on forms of infrastructure that are not themselves open.

<figure>
  <img src="/images/Hyperscaler-example-image-2.jpeg" alt="Data centre and server equipment used for cloud infrastructure">
  <figcaption>Open model ecosystems are shaped by commercial infrastructure as well as community practice: hosting, distribution, and inference often remain tied to large-scale platform providers.</figcaption>
</figure>

## Method

The project combines repository analysis, documentation review, interviews, and case studies of prominent open AI initiatives. We examine model cards, licenses, issue trackers, evaluation reports, dataset documentation, governance statements, and community practices. We also compare how different projects define openness and how those definitions change when models move from research artefacts to deployed systems.

This work pays close attention to maintenance. Many discussions of open AI focus on the moment of release, but the long-term value of an open system depends on updates, vulnerability response, dataset corrections, documentation improvements, and community support. Maintenance is where the social organisation of openness becomes visible.

Repository analysis allows us to trace how projects are organised. We look at contribution patterns, dependency management, issue resolution, release notes, reproducibility claims, and links between model artefacts and supporting code. Documentation review helps identify what is explained, what is missing, and what assumptions are made about the expertise of downstream users.

Interviews add context that public repositories cannot provide. We speak with maintainers, researchers, infrastructure providers, public-sector adopters, and community contributors about the practical work of keeping open systems usable. These conversations focus on constraints: compute costs, legal uncertainty, abuse response, benchmark pressure, documentation debt, funding gaps, and the difficulty of coordinating distributed contributors.

## Degrees of openness

One of the project’s goals is to move beyond a binary distinction between open and closed systems. We distinguish between access to weights, access to code, access to training data, access to evaluation methods, access to deployment tools, and access to governance processes. A system may be open in one dimension and closed in another.

For example, a project may publish model weights and inference code but keep the training dataset undisclosed. Another may release detailed documentation but restrict commercial use. A third may publish everything needed for local experimentation while relying on a closed platform for practical distribution. These differences matter because they shape what users can audit, adapt, reproduce, and contest.

The project also considers temporal openness. A model can be open at release but become difficult to use later if dependencies break, links disappear, hardware requirements become impractical, or maintainers stop responding. Long-term openness requires stewardship, not just publication.

## Labour and community governance

Open model ecosystems depend on labour that is often undervalued. Documentation writers, dataset curators, safety evaluators, issue triagers, benchmark maintainers, infrastructure volunteers, and community moderators all contribute to whether an open model is usable. Their work may be distributed across institutions and time zones, and it may not be captured in formal project metrics.

Community governance is therefore part of the supply chain. Projects need ways to decide which contributions are accepted, how vulnerabilities are handled, how harmful use is discussed, how licenses are interpreted, and how disagreements are resolved. Without governance, openness can become brittle: technically available but socially difficult to maintain.

This is particularly important when open models are adopted by public institutions. Public users may need clearer documentation, stronger support channels, audit trails, and risk-management procedures than hobbyist or research users. The project studies how open communities respond when their artefacts become part of institutional infrastructure.

## Policy relevance

Open AI systems are frequently presented as an alternative to concentrated proprietary control. They can support research transparency, local adaptation, education, and smaller-scale experimentation. Yet openness can also reproduce dependencies if the underlying supply chain remains concentrated in a small number of infrastructure providers, dataset sources, or model producers.

Understanding these dependencies matters for universities, public agencies, civil society organisations, and companies that want to use open systems responsibly. It helps clarify what can realistically be audited, what can be modified, what requires specialised infrastructure, and what kinds of governance are needed around shared technical resources.

The project also contributes to policy debates about open-source AI regulation. Effective policy needs more than a binary distinction between open and closed systems. It needs a way to describe degrees of openness, points of dependency, and the responsibilities of actors who publish, host, adapt, or deploy open models.

## Practical assessment framework

We are developing a framework that helps institutions assess open models before adoption. The framework asks whether the model can be inspected, reproduced, adapted, hosted, monitored, and retired under realistic organisational conditions. It also asks whether the institution has the expertise and resources required to take advantage of openness.

The framework separates artefact access from capability access. Downloading weights is not the same as understanding the training process. Reading a license is not the same as having a governance plan. Running a demo is not the same as sustaining a service. This distinction helps institutions avoid overestimating the control that open release provides.

## Outputs

The project will produce case studies, supply-chain diagrams, and analytical briefs. These outputs will document how open AI projects are assembled, where key dependencies emerge, and how institutions can evaluate the practical openness of models they intend to use.

We are also developing a comparative framework for assessing open model ecosystems. The framework will help distinguish access to artefacts from access to capability, and it will support more precise discussions about transparency, reuse, maintenance, and public-interest governance.

Future outputs will include a glossary of openness dimensions, a maintenance checklist for public-interest deployments, and short case studies showing how open models move from research release to operational use.
