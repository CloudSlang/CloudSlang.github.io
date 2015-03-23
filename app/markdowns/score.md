#Overview

##The CloudSlang Project
CloudSlang is an open source language for defining workflows run by the CloudSlang Orchestration Engine.

CloudSlang and its Orchestration Engine are:

+ Process Based: allowing you to define the 'how' and not just the 'what' to better control the runtime behavior of your workflows.
+ Agentless: there are no agents to set up and manage on all your machines. Instead, workflows use remote APIs to run tasks.
+ Scalable: execution logic and distribution are optimized for high throughput and are horizontally scalable.
+ Embeddable: the CloudSlang Orchestration Engine is distributed as a standard java library, allowing you to embed it and run CloudSlang from your own applications.
+ Content Rich: you can build your own flows, or just use CloudSlang ready-made content. 

##Get Started
It's easy to get started running CloudSlang flows, especially using the CLI and ready-made content.

1. Go to the CloudSlang [website](/#/), scroll to the **Getting Started** section and click **Download latest version**.
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
+ Learn about the language features using the [New Hire Tutorial](TODO:addlink).
+ Learn about the language in detail using the [CloudSlang Reference](#/docs#cloudslang-reference).
+ See an [overview](TODO:addlink) of the ready-made content.
+ Browse the ready-made content [repository](https://github.com/CloudSlang/cloud-slang-content).
+ Learn about embedding [CloudSlang](#/docs#embedded-cloudslang) or the [CloudSlang Orchestration Engine](#/docs#embedded-cloudslang-orchestration-engine) into your existing application.
+ Learn about the architecture of [CloudSlang](#/docs#cloudslang-architecture) or the [CloudSlang Orchestration Engine](#/docs#cloudslang-orchestration-engine-architecture).
