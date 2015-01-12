#Developer (Contributor) Guide

##score - Execution

Score is a workflow engine and can execute Execution Plans.

###Execution Plan
An execution plan as the name implies, is a set of steps for score to run. 
In order to trigger an execution you need to pass the execution plan to score.

The execution plan consists mainly of a set of steps to perform. 
These steps are called *Execution Steps*. 
Each execution step has a *position* within the execution plan – the position of the first step in the execution plan is usually zero.

###Execution Step
An execution step is a building block for the execution plan. It consists of two parts:
+  Control Action – The control action to perform in this step.
+  Navigation Action – The navigation to perform after the action was performed. 
    This control action should determine the position of the next execution step that should be executed.

Each execution step has a position in the execution plan. 
In the diagram above we have 3 execution steps, each with its own position. 
A position has to be unique – there cannot be two steps with the same position.

###Control Action
Both control action and navigation action are java methods. 
Score invokes these methods by reflection so there is no API or naming convention for them. 
There are some recommendations and reserved argument names, we’ll get to that later.

A control action method can have input arguments and they will be Injected by the score engine. 
There are several methods by which score can populate arguments:
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

+  ***executionRuntimeServices*** - score will populate it with the execution’s runtime services object. 
    This means that such arguments have to be of the type ExecutionRuntimeServices.
```java
public void doWithServices(ExecutionRuntimeServices executionRuntimeServices) {
    …
    …
}
```
+  ***executionContext*** – score will populate it with the execution’s context. 
    This means that such arguments have to be of the type `Map<String, Serializable>`.
```java
public void doWithContext(Map<String, Serializable> executionContext) {
    …
    …
}
```

###Navigation Action
There’s no real difference between a control action and a navigation action, 
except that the navigation action must have a return value of type Long. 
The return value is the position of the next step to execute.
An execution is finished when the navigation returns null as the next step.

```java
public Long navigation(...) {
    …
    …
    return 2L;
}
```

###Runtime
So what happens when score executes an execution plan? Well, the basic algorithm is this:
+  Extract the next step to execute
+  Execute the action.
+  Execute the navigation action.
+  Go back to extract.

The next step to execute is actually the result of the navigation action of the previous step.


###ExecutionRuntimeServices
ExecutionRuntimeServices is a way for the language to affect the execution during run time. Several examples for this are:
+  If the language wants to set an error
+  If the language wants to throw an event

ExecutionRuntimeServices is a simple `Map<String, Serializable>` and the user writing a language for score (like slang) can modify the contents of this map freely. This is bad for two reasons:
+  It is very inconvenient for the user to “use” our API this way since the usage is basically adding certain keys with certain values to this map.
+  It exposes score’s inner workings to the user.

Because of these two reason we want to convert this to a proper API with declared methods and everything! The methods for this API:
+ `addEvent(String type, Serializable data)`
+ `pause()`
+ `setStepErrorKey(String error)`
+  `addBranch(String uuid, Long position, Map<String, Serializable> runtimeValues)` – The runtime values will be added to the values inside ExecutionRuntimeServices values
+ `getBranchId()`
+ `requestToChangeExecutionPlan(Long executionPlanId)`

###Splitting and Joining Executions

Coming soon ;)

##score - Architecture Overview

###Engine
Score component responsible for orchestration and administration.
Engine components have access to the DB.
Contains 3 major components:

####Orchestrator
Orchestrates score executions, creates new executions, canceling existing executions 
and provides the status of existing executions. 
In addition it also responsible for the split and join mechanism.

####Queue & Assigner
The Assigner assigns each execution to a specific worker.

The queue holds the execution messages in the DB, and provides messages to the worker for execution.

####Topology Management
Administrates the workers. 
Allows registering and un-registering workers, enabling, disabling and managing them. 
The Assigner uses it for assigning the messages to workers.

Holds the workers administration data in the DB.

###Worker
The component in charge of the actual execution. 
Does not have DB access.

Contains 3 major components:

####Event bus
Allows registering and un-registering on the events of the specific worker, and is responsible for firing the events.

####Worker Manager
+ Polls messages from the engine’s queue using the In-Buffer component.
+ Drains messages back to the orchestrator using the Out-Buffer
+ Delegates messages to the execution service
+ Responsible for updating the worker’s status in the engine’s Topology Management

####Execution Service
Executes a single execution step at a time (single step and navigation). 
In addition, pauses and cancels executions and dispatches the relevant events.

Using the ExecutionRuntimeServices, the execution service provides services such as split the execution and add events for dispatch



###Interaction between components
The following diagram describes the relations between score components:

![Full Diagram](images/diagrams/score_full.png "Full Diagram")

##How to contribute code

Coming soon ;)