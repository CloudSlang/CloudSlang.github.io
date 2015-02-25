#Score
##Overview
**score** is a general-purpose java-based open-source orchestration engine which is process-based, 
embeddable, lightweight, scalable and multilingual.

###Process Based

Unlike many orchestration solutions that describe the desired model, 
**score** aims to provide a process-based approach, that allows you to define the ‘how’ and not just the ‘what’, 
therefore providing the ability to better control the actual runtime behavior of the workflow.

###Embeddable

**score** is distributed as a standard java library, allowing you to embedded score in your application, 
and use java [APIs](#docs/#score-apis).

###Scalable

The fundamental architecture of **score** consists of:

+ [Worker](#docs/#worker) - the unit that actually executes the steps from the execution plan. 
+ [Engine](#docs/#engine) - a queue-based work distribution mechanism. 

Execution logic and distribution are optimized for high throughput and are horizontally scalable.

###Multilingual

**score** architecture allows you to use any process modelling language.
The [ExecutionPlan](#docs/#execution-plan) low-level structure enables you to compile multiple languages for **score** to run. 
See [slang](#docs/#slang) as one of the languages you can use to define workflows for score. 

###Use Cases
**score**  can be used in a variety of environments and scenarios such as: 
-	Day 2 operations
-	Cloud orchestration
-	Application deployment
-	DevOps
-	QA
and many more..

You can build your own flows, or just use slang out-of-the-box content. 