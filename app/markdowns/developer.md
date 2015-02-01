#Developer (Contributor) Guide

##Embedded SLANG 
SLANG content can be run from inside an existing Java application using Maven and Spring by embedding **score** and interacting with it through the [SLANG API](#/docs#slang-api). 

###Embed SLANG in a Java Application
Follow the directions below or download a ready-made [sample project](https://github.com/meirwah/test-slang-embedded). 

1. Add the score and SLANG dependencies to the project's pox.xml file in the `<dependencies>` tag.
  ```xml
  <dependency>
      <groupId>io.openscore</groupId>
      <artifactId>score-all</artifactId>
      <version>0.1.251</version>
  </dependency>

  <dependency>
      <groupId>io.openscore.lang</groupId>
      <artifactId>score-lang-api</artifactId>
      <version>0.1.8</version>
  </dependency>

  <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <version>1.3.175</version>
  </dependency>
  ```
2. Add **score** and SLANG configuration to your Spring application context xml file.
  ```xml
  <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:score="http://www.openscore.org/schema/score"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.openscore.org/schema/score
        http://www.openscore.org/schema/score.xsd">

        <score:engine/>
        <score:worker uuid="-1"/>

        <bean class="org.openscore.lang.api.configuration.SlangSpringConfiguration"/>
    </beans>
  ```
3. Get the Slang bean from the application context xml file and interact with it using the [SLANG API](#/docs#slang-api).
  ```java
  ApplicationContext applicationContext =
        new ClassPathXmlApplicationContext("/spring/slangContext.xml");

  Slang slang = applicationContext.getBean(Slang.class);

  slang.subscribeOnAllEvents(new ScoreEventListener() {
        @Override
        public void onEvent(ScoreEvent event) {
            System.out.println(event.getEventType() + " : " + event.getData());
        }
  });
  ```

##SLANG API
The SLANG API allows a program to interact with score using content authored in SLANG. What follows is a brief discussion of the API using a simple example that compiles and runs a flow while listening for the events that are fired during the run. For more information, see the [Javadocs](TODO:JAVADOCS_LINK).

###Example
####Code
**Java Class - SlangEmbed.java**
```Java
package io.openscore.example;

import org.openscore.events.ScoreEvent;
import org.openscore.events.ScoreEventListener;
import org.openscore.lang.api.Slang;
import org.openscore.lang.compiler.SlangSource;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.File;
import java.io.Serializable;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

public class SlangEmbed {
    public static void main(String[] args) throws URISyntaxException{
        ApplicationContext applicationContext =
                new ClassPathXmlApplicationContext("/spring/slangContext.xml");

        Slang slang = applicationContext.getBean(Slang.class);

        slang.subscribeOnAllEvents(new ScoreEventListener() {
            @Override
            public void onEvent(ScoreEvent event) {
                System.out.println(event.getEventType() + " : " + event.getData());
            }
        });

		File flowFile = getFile("/content//hello_world.sl");
        File operationFile = getFile("/content/print.sl");
        
        Set<SlangSource> dependencies = new HashSet<>();
        dependencies.add(SlangSource.fromFile(operationFile));

        HashMap<String, Serializable> inputs = new HashMap<>();
        inputs.put("input1", "Hi. I'm inside this application.\n-Slang");

        slang.compileAndRun(SlangSource.fromFile(flowFile), dependencies,
                inputs, new HashMap<String, Serializable>());
    }

    private static File getFile(String path) throws URISyntaxException {
        return new File(SlangEmbed.class.getResource(path).toURI());
    }
}
```
**Flow - hello_world.sl**
```yaml
namespace: user.flows.hello_world

imports:
  ops: user.operations.utils

flow:
  name: hello_world

  inputs:
    - input1

  workflow:
    sayHi:
      do:
        ops.print:
          - text: input1
```
**Operation - print.sl**
```yaml
namespace: user.operations.utils

operations:
  - print:
      inputs:
        - text
      action:
        python_script: print text
      results:
        - SUCCESS
```
####Discussion
+ The program begins by creating the Spring application context and getting the Slang bean. In general, most of the interactions with **score** are transmitted through the reference to this bean.
 
  ```java
  ApplicationContext applicationContext =
          new ClassPathXmlApplicationContext("/spring/slangContext.xml");

  Slang slang = applicationContext.getBean(Slang.class);
  ```
  
+ Next, the `subscribeOnAllEvents` method is called and passed a new `ScoreEventListener` to listen to all the **score** and [SLANG events](#/docs#slang-events) that are fired. 
  
  ```java
  slang.subscribeOnAllEvents(new ScoreEventListener() {
      @Override
      public void onEvent(ScoreEvent event) {
          System.out.println(event.getEventType() + " : " + event.getData());
      }
  });
  ```
  
  The `ScoreEventListener` interface defines only one method, the `onEvent` method. In this example the `onEvent` method is overridden to print out the type and data of all events it receives. It can, of course, be overridden to do other things. 
  
  The API also contains a method `subscribeOnEvents`, which takes in a set of the event types to listen for and a method `unSubscribeOnEvents`, which unsubscribes the listener from all the events it was listening for.

+ Next,  the two content files, containing a flow and an operation respectively, are loaded into `File` objects. 
  
  ```java
  File flowFile = getFile("/content//hello_world.sl");
  File operationFile = getFile("/content/print.sl");
  ```

  These `File` objects will be used to create the two `SlangSource` objects needed to compile and run the flow and its operation. 

  A `SlangSource` object is a representation of source code written in SLANG along with the source's name. The `SlangSource` class exposes several `static` methods for creating new `SlangSource` objects from files, URIs or arrays of bytes.      

+ Next, a set of dependencies is created and the operation is added to the set. 

  ```java
  Set<SlangSource> dependencies = new HashSet<>();
  dependencies.add(SlangSource.fromFile(operationFile));
  ```
  A flow containing many operations or subflows would need all of it's dependencies loaded into the dependency set.

+ Next, we create a map of input names to values. The input names are as they appear under the `inputs` key in the flow's SLANG file. 

  ```java
  HashMap<String, Serializable> inputs = new HashMap<>();
  inputs.put("input1", "Hi. I'm inside this application.\n-Slang");
  ```

+ Finally, we compile and run the flow by providing it's `SlangSource`, dependencies, inputs and an empty map of system properties. 

  ```java
  slang.compileAndRun(SlangSource.fromFile(flowFile), dependencies,
          inputs, new HashMap<String, Serializable>());
  ```

  An operation can be compiled and run in much the same way. The only difference is that when an operation file is compiled the name of the operation that will be run must be passed along with the other arguments. 

  Although we compile and run here in one step, the process can be broken up into its component parts. The `Slang` interface exposes methods to compile a flow or operation without running it. Those methods return a `CompliationArtifact` which can then be run with a call to the `run` method.

  A `CompilationArtifact` is composed of a **score** [`ExecutionPlan`](#/docs#executionplan), a map of dependency names to their `ExecutionPlan`s and a list of Slang `Input`s. 

  A Slang `Input` contains its name, expression and the state of all its input properties (e. g. required).

##SLANG Events
SLANG uses **score** events and its own extended set of events. SLANG events are comprised of an event type string and a map of event data that contains all the relevant event information mapped to keys defined in the 
`org.openscore.lang.runtime.events.LanguageEventData` class. All fired events are logged in the [execution log](#/docs#execution-log) file.


Event types from score:

+ SCORE_FINISHED_EVENT
+ SCORE_FAILURE_EVENT

Event types from SLANG are listed in the table below along with the event data each event contains. 

All SLANG events contain the data in the following list. Additional event data is listed in the table below alongside the event type. The event data map keys are enclosed in square brackets - [KEYNAME].

- [DESCRIPTION] - event description
- [TIMESTAMP] - event time-stamp
- [EXECUTIONID] - event execution id
- [PATH] - event path: increased when entering a subflow or operation

Type [TYPE]|Usage|Event Data
---|---
EVENT_INPUT_END|Input binding finished for task|[BOUND_INPUTS], [TASK_NAME]
EVENT_INPUT_END|Input binding finished for flow or operation|[BOUND_INPUTS], [EXECUTABLE_NAME]
EVENT_OUTPUT_START|Output binding started for task|[taskPublishValues], [taskNavigationValues], [operationReturnValues], [TASK_NAME]
EVENT_OUTPUT_START|Output binding started for flow or operation|[executableOutputs],  [executableResults], [actionReturnValues], [EXECUTABLE_NAME]
EVENT_OUTPUT_END|Output binding finished for task|[OUTPUTS], [RESULT], [nextPosition],  [TASK_NAME]
EVENT_OUTPUT_END|Output binding finished for flow or operation|[OUTPUTS], [RESULT],  [EXECUTABLE_NAME]
EVENT_EXECUTION_FINISHED|Execution finished running (in case of subflow)|[OUTPUTS],  [RESULT], [EXECUTABLE_NAME]
EVENT_ACTION_START|Before action invocation|[CALL_ARGUMENTS], action type (Java or Python) in description
EVENT_ACTION_END|After successful action invocation|[RETURN_VALUES]
EVENT_ACTION_ERROR|Exception in action execution|[EXCEPTION]
SLANG_EXECUTION_EXCEPTION|Exception in previous step|[EXCEPTION]

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