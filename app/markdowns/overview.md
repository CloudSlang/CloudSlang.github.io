#Overview

##The CloudSlang Project
CloudSlang is a flow-based orchestration tool for managing deployed applications. It allows you to rapidly automate your DevOps and everyday IT operations use cases using ready-made workflows or create custom workflows using a YAML-based DSL.
 
The CloudSlang project is composed of three main parts: the CloudSlang Orchestration Engine, the CloudSlang language and the ready-made CloudSlang content.
 
###CloudSlang Orchestration Engine
The CloudSlang Orchestration Engine is packaged as a lightweight Java .jar file and can therefore be embedded into existing Java projects.
 
The engine can support additional workflow languages by adding a compiler that translates the workflow DSL into the engine’s generic workflow execution plans.
 
###CloudSlang Language
The CloudSlang language is a YAML-based DSL for writing workflows. Using CloudSlang you can define a workflow in a structured, easy-to-understand format that can be run by an embedded instance of the CloudSlang Orchestration Engine or the stand-alone CloudSlang CLI.
 
The CloudSlang language is simple and elegant, yet immensely powerful at the same time.
 
There are two main types of CloudSlang content, operations and flows. An operation contains an action, which can be written in Python or Java. Operations perform the “work” part of the workflow. A flow contains tasks, which stitch together the actions performed by operations, navigating and passing data from one to the other based on operation results and outputs. Flows perform the “flow” part of the workflow.

###CloudSlang Ready-Made Content
Although writing your own CloudSlang content is easy, in many cases you don’t even need to write a single line of code to leverage the power of CloudSlang. The CloudSlang team has already written a rich repository of ready-made content to perform common tasks as well as content that integrates with many of today’s hottest technologies, such as Docker and CoreOS. And, the open source nature of the project means that you’ll be able to reuse and repurpose content shared by the community.

###CloudSlang and its Orchestration Engine are:

+ Process Based: allowing you to define the 'how' and not just the 'what' to better control the runtime behavior of your workflows.
+ Agentless: there are no agents to set up and manage on all your machines. Instead, workflows use remote APIs to run tasks.
+ Scalable: execution logic and distribution are optimized for high throughput and are horizontally scalable.
+ Embeddable: the CloudSlang Orchestration Engine is distributed as a standard java library, allowing you to embed it and run CloudSlang from your own applications.
+ Content Rich: you can build your own flows, or just use CloudSlang ready-made content. 

##Get Started
It's easy to get started running CloudSlang flows, especially using the CLI and ready-made content.

1. [Download](/download) the CLI zip file. 
2. Unzip the archive.
3. Run the CloudSlang executable. 
4. At the prompt enter: 
  ```bash
  run --f ../content/io/cloudslang/base/print/print_text.sl --i text=Hi
  ```
5. The CLI will run the ready-made `print_text` operation that will print the value passed to the variable `text` to the screen.

##Next Steps
Now that you've run your first CloudSlang file, you might want to:

+ Learn how to write a print operation yourself using the [Hello World example](#/docs#hello-world-example).
+ Learn about the language features using the [New Hire Tutorial](http://cloudslang-tutorials.readthedocs.org).
+ Learn about the language in detail using the [CloudSlang Reference](#/docs#cloudslang-reference).
+ See an [overview](https://github.com/CloudSlang/cloud-slang-content/blob/master/DOCS.md) of the ready-made content.
+ Browse the ready-made content [repository](https://github.com/CloudSlang/cloud-slang-content).
+ Learn about embedding [CloudSlang](#/docs#embedded-cloudslang) or the [CloudSlang Orchestration Engine](#/docs#embedded-cloudslang-orchestration-engine) into your existing application.
+ Learn about the architecture of [CloudSlang](#/docs#cloudslang-architecture) or the [CloudSlang Orchestration Engine](#/docs#cloudslang-orchestration-engine-architecture).
