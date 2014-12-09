##Score overview
**score** is an open-source, generic orchestration engine that can be used in order to automate work-processes.

**score** can be used in a variety of environments and scenarios such as: cloud setup and maintenance, build systems, QA, and many more.

Score is embeddable, lightweight, scalable java-based workflow engine.

The fundamental architecture of the project consists of:

+ **Worker** - the unit that actually executes the steps from the execution plan. Execution logic is optimized for high throughput and is horizontally scalable.
+ **Orchestrator** - a queue-based work distribution mechanism. Highly available and horizontally scalable.
+ **Persistency for cluster management** - allowing a cluster of orchestrator and worker nodes. Optional for simple single-node deployments.
+ **Compiler** - compiles a given flow format into an execution plan that can be executed by the workers. The introduction of a new flow formatting language is achieved by hooking the right compiler. Currently, we have an AFL OOTB compiler (score native flow language).

Note that score deployment has two flavors:
+ **Simple** - consists of a single-node deployment of orchestrator and worker in the same runtime container. No external DB is required.
+ **Distributed** - a highly available and scalable deployment that requires an external DB schema and a servlet container for hosting the orchestrator node(s).


##Score APIs
All of the score APIs are available through 3 interfaces:

###Score - Execution API

####Triggering New Executions
+ `public Long trigger(TriggeringProperties triggeringProperties);`

This method starts an execution with the given execution plan and with additional options. By default the first executed step will be the execution plan’s start step, the execution context will be empty.
Returns the id of the new execution.

*TriggeringProperties* contains the following data:
+ `executionPlan: ExecutionPlan`
+ `dependencies: Map<String, ExecutionPlan>`
+ `context: Map<String, ? extends Serializable>`
+ `runtimeValues: Map<String, ? extends Serializable>`
+ `startStep: long`

The execution *context* argument can be empty. If it isn’t empty the values inside will be added to the execution context.
    
The *runtimeValues* argument can be empty. If it isn’t empty the values inside will be added to the ExecutionRuntimeServices.
    
The *startStep* argument can be used in order to make the plan start from a specific step that is not necessarily the execution plan’s *beginStep*.

###EventBus - Events API

####Event Listening
Score allows subscribing listeners for events. Such listeners must implement the ScoreEventListener interface which consists of a single method – *onEvent*.
+ `subscribe(ScoreEventListener listener, String type…)`

This method subscribes the given listener for the specified event types.

+ `unsubscribe(ScoreEventListener listener)`

This method unsubscribes the given listener from all the types it was subscribed to.

###ExecutionRuntimeServices - Runtime API
The ExecutionRuntimeServices is a way for the language to affect the execution during run time. Several examples for this are:
+  If the language wants to pause the execution (In OO – flow inputs)
+  If the language wants to throw an event

Currently the ExecutionRuntimeServices is a simple `Map<String, Serializable>` and the user writing a language for score (Like AFL) can modify the contents of this map freely. This is bad for two reasons:
+  It is very inconvenient for the user to “use” our API this way since the usage is basically adding certain keys with certain values to this map.
+  It exposes score’s inner workings to the user.

Because of these two reason we want to convert this to a proper API with declared methods and everything! The methods for this API:
+ `addEvent(String type, Serializable data)`
+ `pause()`
+ `setStepErrorKey(String error)`
+  `addBranch(String uuid, Long position, Map<String, Serializable> runtimeValues)` – The runtime values will be added to the values inside ExecutionRuntimeServices values
+ `getBranchId()`
+ `requestToChangeExecutionPlan(Long executionPlanId)`

Since OO currently uses the *put* and *get* methods in the systemContext we will also need to have it implement the Map interface.


##Execution
Score is a workflow engine and can execute workflows or *Execution Plans*.

###Execution Plan
An execution plan as the name implies, is a set of steps for score to run. In order to trigger an execution you need to pass the execution plan to score.

The execution plan consists mainly of a set of steps to perform. These steps are called *Execution Steps*. Each execution step has a *position* within the execution plan – the position of the first step in the execution plan is usually zero.

If we were to draw an execution plan it might look something like this:

![Execution Plan](images/diagrams/ep.png "Execution Plan")

###Control Action
So what is a control action? And a navigation action? Well, they are both java methods. Score invokes these methods by reflection so there is no API or naming convention for them. There are some recommendations and reserved argument names, we’ll get to that later.

In the diagram above we have three control actions – One that checks if a file exists, another that writes a message to the standard output and a third one that creates files.

A control action method can have input arguments and they will be Injected by the score engine. There are several methods by which score can populate arguments:
+ From the execution context.
+ From values set during the creation of the execution plan.

####Assigning argument values from the execution context
Let’s take a look at the following method signature:
```java
public void doSomething(String argName) {
 …
 …
}
```
When score runs this method it will attempt to populate the argument *argName* with a value from the execution context. If the key *argName* exists in the execution context map, then the argument *argName* will be populated with its associated value, otherwise it will be populated with *null*.

####Setting argument values during execution plan compilation
It is also possible to set argument values in the execution plan using

####Reserved argument names
There are some argument names that have a special meaning when used as control action arguments, those are:

+  ***executionRuntimeServices*** - score will populate it with the execution’s runtime services object. This means that such arguments have to be of the type ExecutionRuntimeServices.
```java
public void doWithServices(ExecutionRuntimeServices executionRuntimeServices) {
    …
    …
}
```
+  ***executionContext*** – score will populate it with the execution’s context. This means that such arguments have to be of the type `Map<String, Serializable>`.
```java
public void doWithContext(Map<String, Serializable> executionContext) {
    …
    …
}
```

###Navigation Action
There’s no real difference between a control action and a navigation action, except that the navigation action must have a return value of type Long. The return value is the position of the next step to execute.

###Execution Step
An execution step is a building block for the execution plan. It consists of two parts:
+  Action – The control action to perform in this step.
+  Navigation – The navigation to perform after the action was performed. This control action should determine the position of the next execution step that should be executed.

Each execution step has a position in the execution plan. In the diagram above we have 3 execution steps, each with its own position. A position has to be unique – there cannot be two steps with the same position.

###Runtime
So what happens when score executes an execution plan? Well, the basic algorithm is this:
+  Extract the next step to execute
+  Execute the action.
+  Execute the navigation action.
+  Go back to extract.

The next step to execute is actually the result of the navigation action of the previous step.

###Execution Branches and Merges
An execution can branch itself to perform parallel tasks which will merge back to the parent execution once they finish. Each branch is a separate execution.

![Branches](images/diagrams/branch.png "Branches")

###Score Events
Score fires events during an execution. An event consists of two members:
+  type – A string that can have one of the following values:
    -  FINISHED – Signals a finished execution
    -  ERROR – Signals an execution that finished with error
    -  CANCELLED – Signals an execution that was cancelled
    -  PAUSED – Signals an execution that was paused
+  data – Serializable data.

Any language running in score can add events freely; this can be done in execution run time using the ExecutionRuntimeServices’s API.

##Score architecture

HLD diagram:

![Simple Diagram](images/diagrams/score_simple_hld.png "Simple Diagram")

###Engine
Score component responsible for orchestration and administration.

Engine components have access to the DB.

Contains 3 major components:

####Orchestrator
Orchestrates score executions, creates new executions, allow pausing, canceling & resuming existing executions and provides the status of existing executions. In addition it assists the split and join mechanism.

####Queue & Assigner
The Assigner assigns each execution to a specific worker according the workers groups’ configuration.

The queue holds the execution messages in the DB and provides messages to the worker for execution.

####Topology Management
Administrates the workers. Allows registering and unregistering workers, enabling and disabling them and managing the workers’ groups. The Assigner uses it for assigning the messages to workers according to their groups.

Holds the workers administration data in the DB.

###Worker
The component in charge of the actual execution. Does not have DB access.

Contains 3 major components:

####Event bus
Allows registering and un-registering on the events of the specific worker, and is responsible for firing the events.

####Worker Manager
+ Polls messages from the engine’s queue using the In-Buffer component.
+ Drains messages back to the orchestrator using the Out-Buffer
+ Delegates messages to the execution service
+ Responsible for updating the worker’s status in the engine’s Topology Management

####Execution Service
Executes a single execution step at a time (single step and navigation). In addition, pauses and cancels executions and dispatches the relevant events.

Using the ExecutionRuntimeServices, the execution service provides services such as request for pause, split the execution, and add events for dispatch

###Scheduled jobs
+ QueueCleanerJob – Deletes from the queue all messages of finished executions
+ PartitionJob – Manages the rolling table mechanism for the States table
+ SplitJoinJob – Handles the split & join mechanism
+ outBuffer.drain() – Dispatches messages to the Orchestrator for returning the execution to the queue
+ workerManager.workerKeepAlive() – Allows the worker to report keep alive status

###Schema creation + upgradability
Here we have two options:
+ When using h2 in memory, we’ll use hibernate ability to create the schema.
+ We’ll provide scripts to create the DB schema when working with external DB. Here we’ll have upgradable scripts between the different versions.

###Interaction between components
The following diagram describes the relations between score components:

![Full Diagram](images/diagrams/score_full.png "Full Diagram")

##Current state
+ The debugger capabilities are in score road map, but currently out of scope
+ Score **will** support scan of language beans from class path

##Open issues
+ Missing design for security issue
+ Error handling (exceptions? Return Boolean?)
