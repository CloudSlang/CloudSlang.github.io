#Developer (Contributor) Guide

##Overview
What follows is a brief overview of how CloudSlang and the CloudSlang Orchestration Engine (Score) work. For more detailed information see the [Score API](#/docs#score-api) and [Slang API](#/docs#slang-api) sections.

The CloudSlang Orchestration Engine is an engine that runs workflows. Internally, the workflows are represented as [ExecutionPlans](#/docs#executionplan). An [ExecutionPlan](#/docs#executionplan) is essentially a map of IDs and [ExecutionSteps](#/docs#executionstep). Each [ExecutionStep](#/docs#executionstep) contains information for calling an action method and a navigation method. 

When an [ExecutionPlan](#/docs#executionplan) is triggered it executes the first [ExecutionStep's](#/docs#executionstep) action method and navigation method. The navigation method returns the ID of the next [ExecutionStep](#/docs#executionstep) to run. Execution continues in this manner, successively calling the next [ExecutionStep's](#/docs#executionstep) action and navigation methods, until a navigation method returns `null` to indicate the end of the flow.

CloudSlang plugs into the CloudSlang Orchestration Engine (Score) by compiling its workflow and operation files into Score [ExecutionPlans](#/docs#executionplan) and then triggering them. Generally, when working with CloudSlang content, all interaction with Score goes through the [Slang API](#/docs#slang-api), not the [Score API](#/docs#score-api).


##Embedded CloudSlang 
CloudSlang content can be run from inside an existing Java application using Maven and Spring by embedding the CloudSlang Orchestration Engine and interacting with it through the [Slang API](#/docs#slang-api). 

###Embed CloudSlang in a Java Application
Follow the directions below or download a ready-made [sample project](https://github.com/meirwah/test-slang-embedded). 

1. Add the score and SLANG dependencies to the project's pom.xml file in the `<dependencies>` tag.
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
2. Add Score and CloudSlang configuration to your Spring application context xml file.
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
3. Get the Slang bean from the application context xml file and interact with it using the [Slang API](#/docs#slang-api).
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

##Slang API
The SLANG API allows a program to interact with the CloudSlang Orchestration Engine (Score) using content authored in CloudSlang. What follows is a brief discussion of the API using a simple example that compiles and runs a flow while listening for the events that are fired during the run.

###Example
####Code
**Java Class - CloudSlangEmbed.java**
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

public class CloudSlangEmbed {
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

operation:
  name: print
  inputs:
    - text
  action:
    python_script: print text
  results:
    - SUCCESS
```
####Discussion
+ The program begins by creating the Spring application context and getting the Slang bean. In general, most of the interactions with Score are transmitted through the reference to this bean.
 
  ```java
  ApplicationContext applicationContext =
          new ClassPathXmlApplicationContext("/spring/slangContext.xml");

  Slang slang = applicationContext.getBean(Slang.class);
  ```
  
+ Next, the `subscribeOnAllEvents` method is called and passed a new `ScoreEventListener` to listen to all the [Score](#/docs#score-events) and [Slang events](#/docs#slang-events) that are fired. 
  
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

  A `SlangSource` object is a representation of source code written in CloudSlang along with the source's name. The `SlangSource` class exposes several `static` methods for creating new `SlangSource` objects from files, URIs or arrays of bytes.      

+ Next, a set of dependencies is created and the operation is added to the set. 

  ```java
  Set<SlangSource> dependencies = new HashSet<>();
  dependencies.add(SlangSource.fromFile(operationFile));
  ```
  A flow containing many operations or subflows would need all of its dependencies loaded into the dependency set.

+ Next, a map of input names to values is created. The input names are as they appear under the `inputs` key in the flow's CloudSlang file. 

  ```java
  HashMap<String, Serializable> inputs = new HashMap<>();
  inputs.put("input1", "Hi. I'm inside this application.\n-CloudSlang");
  ```

+ Finally, the flow is compiled and run by providing its `SlangSource`, dependencies, inputs and an empty map of system properties. 

  ```java
  slang.compileAndRun(SlangSource.fromFile(flowFile), dependencies,
          inputs, new HashMap<String, Serializable>());
  ```

  An operation can be compiled and run in the same way. 

  Although we compile and run here in one step, the process can be broken up into its component parts. The `Slang` interface exposes a method to compile a flow or operation without running it. That method returns a `CompliationArtifact` which can then be run with a call to the `run` method.

  A `CompilationArtifact` is composed of a Score `ExecutionPlan`, a map of dependency names to their `ExecutionPlan`s and a list of CloudSlang `Input`s. 

  A CloudSlang `Input` contains its name, expression and the state of all its input properties (e. g. required).

##Slang Events
CloudSlang uses [Score events](#/docs#score-events) and its own extended set of Slang events. Slang events are comprised of an event type string and a map of event data that contains all the relevant event information mapped to keys defined in the 
`org.openscore.lang.runtime.events.LanguageEventData` class. All fired events are logged in the [execution log](#/docs#execution-log) file.

Event types from CloudSlang are listed in the table below along with the event data each event contains. 

All Slang events contain the data in the following list. Additional event data is listed in the table below alongside the event type. The event data map keys are enclosed in square brackets - [KEYNAME].

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

##Embedded CloudSlang Orchestration Engine (Score) 
Score can be embedded inside an existing Java application using Maven and Spring. Interaction with Score is done through the [Score API](#/docs#score-api). 

###Embed Score in a Java Application

1. Add the Score dependencies to the project's pom.xml file in the `<dependencies>` tag.
  ```xml
  <dependency>
      <groupId>io.openscore</groupId>
      <artifactId>score-all</artifactId>
      <version>0.1.251</version>
  </dependency>

  <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <version>1.3.175</version>
  </dependency>
  ```
2. Add Score configuration to your Spring application context xml file.
  
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

       <bean class="io.openscore.example.ScoreEmbed"/>
  </beans>  
  ```
  
3. Interact with Score using the [Score API](#/docs#score-api).
  ```java
  package io.openscore.example;

  import org.apache.log4j.Logger;
  import org.openscore.api.*;
  import org.openscore.events.EventBus;
  import org.openscore.events.EventConstants;
  import org.openscore.events.ScoreEvent;
  import org.openscore.events.ScoreEventListener;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.context.ApplicationContext;
  import org.springframework.context.ConfigurableApplicationContext;
  import org.springframework.context.support.ClassPathXmlApplicationContext;

  import java.io.Serializable;
  import java.util.HashMap;
  import java.util.HashSet;
  import java.util.Set;

  public class ScoreEmbed {
    @Autowired
    private Score score;

    @Autowired
    private EventBus eventBus;

    private final static Logger logger = Logger.getLogger(ScoreEmbed.class);
    private ApplicationContext context;
    private final Object lock = new Object();

    public static void main(String[] args) {
        ScoreEmbed app = loadApp();
        app.registerEventListener();
        app.start();
    }

    private static ScoreEmbed loadApp() {
        ApplicationContext context = new ClassPathXmlApplicationContext("/META-INF/spring/scoreContext.xml");
        ScoreEmbed app = context.getBean(ScoreEmbed.class);
        app.context  = context;
        return app;
    }

    private void start() {
        ExecutionPlan executionPlan = createExecutionPlan();
        score.trigger(TriggeringProperties.create(executionPlan));
        waitForExecutionToFinish();
        closeContext();
    }

    private void waitForExecutionToFinish() {
        try {
            synchronized(lock){
                lock.wait(10000);
            }
        } catch (InterruptedException e) {
            logger.error(e.getStackTrace());
        }
    }

    private static ExecutionPlan createExecutionPlan() {
        ExecutionPlan executionPlan = new ExecutionPlan();

        executionPlan.setFlowUuid("1");

        executionPlan.setBeginStep(0L);
        ExecutionStep executionStep0 = new ExecutionStep(0L);
        executionStep0.setAction(new ControlActionMetadata("io.openscore.example.controlactions.ConsoleControlActions", "printMessage"));
        executionStep0.setActionData(new HashMap<String, Serializable>());
        executionStep0.setNavigation(new ControlActionMetadata("io.openscore.example.controlactions.NavigationActions", "nextStepNavigation"));
        executionStep0.setNavigationData(new HashMap<String, Serializable>());

        executionPlan.addStep(executionStep0);
        ExecutionStep executionStep1 = new ExecutionStep(1L);
        executionStep1.setAction(new ControlActionMetadata("io.openscore.example.controlactions.ConsoleControlActions", "printMessage"));
        executionStep1.setActionData(new HashMap<String, Serializable>());
        executionStep1.setNavigation(new ControlActionMetadata("io.openscore.example.controlactions.NavigationActions", "endFlow"));
        executionStep1.setNavigationData(new HashMap<String, Serializable>());
        executionPlan.addStep(executionStep1);

        ExecutionStep executionStep2 = new ExecutionStep(2L);
        executionStep2.setAction(new ControlActionMetadata("io.openscore.example.controlactions.ConsoleControlActions", "failed"));
        executionStep2.setActionData(new HashMap<String, Serializable>());
        executionStep2.setNavigation(new ControlActionMetadata("io.openscore.example.controlactions.NavigationActions", "endFlow"));
        executionStep2.setNavigationData(new HashMap<String, Serializable>());
        executionPlan.addStep(executionStep2);

        return executionPlan;
    }

    private void registerEventListener() {
        Set<String> handlerTypes = new HashSet<>();
        handlerTypes.add(EventConstants.SCORE_FINISHED_EVENT);
        handlerTypes.add(EventConstants.SCORE_FAILURE_EVENT);
        eventBus.subscribe(new ScoreEventListener() {
            @Override
            public void onEvent(ScoreEvent event) {
                logger.info("Listener " + this.toString() + " invoked on type: " + event.getEventType() + " with data: " + event.getData());
                synchronized (lock) {
                    lock.notify();
                }
            }
        }, handlerTypes);
    }

    private void closeContext() {
        ((ConfigurableApplicationContext) context).close();
    }
}
  ```

##Score API
The Score API allows a program to interact with the CloudSlang Orchestration Engine (Score). This section describes some of the more commonly used interfaces and methods from the Score API.

###ExecutionPlan
An ExecutionPlan is a map of IDs and steps, called [ExecutionSteps](#/docs#executionstep), representing a workflow for Score to run.  Normally, the ID of the first step to be run is 0. 

[ExecutionSteps](#/docs#executionstep) can be added to the ExecutionPlan using the `addStep(ExecutionStep step)` method. 

The starting step of the ExecutionPlan can be set using the `setBeginStep(Long beginStep)` method.

###ExecutionStep
An ExecutionStep is the a building block upon which an [ExecutionPlan](#/docs#executionplan) is built. It consists of an ID representing its position in the plan, control action information and navigation action information. As each ExecutionStep is reached, its control action method is called followed by its navigation action method. The navigation action method returns the ID of the next ExecutionStep to be run in the [ExecutionPlan](#/docs#executionplan) or signals the plan to stop by returning `null`. The ID of an ExecutionStep must be unique among the steps in its [ExecutionPlan](#/docs#executionplan).

The control action method and navigation action methods can be set in the ExecutionStep using the following methods, where a `ControlActionMetadata` object is created using string values of the method's fully qualified class name and method name:

+ `setAction(ControlActionMetadata action)`
+ `setNavigation(ControlActionMetadata navigationMetadata)`

####Action Method Arguments
Both the control action and navigation action are regular Java methods which can take arguments. They are invoked by reflection and their arguments are injected by the score engine, so there is no API or naming convention for them. But there are some names that are reserved for special use. 

There are several ways Score can populate an action method's arguments:

+ From the execution context that is passed to the [TriggeringProperties](#/docs#triggeringproperties) when the [ExecutionPlan](#/docs#executionplan) is triggered.
  
  When a method such as `public void doSomething(String argName)` is encountered, Score will attempt to populate the argument `argName` with a value mapped to the key `argName` in the execution context. If the key `argName` does not exist in the map, the argument will be populated with `null`.
+ From data values set in the [ExecutionSteps](#/docs#executionstep) during the creation of the [ExecutionPlan](#/docs#executionplan).

	Data can be set using the `setActionData` and `setNavigationData` methods.

+ From reserved argument names.

  There are some argument names that have a special meaning when used as control action or navigation action method arguments:

  +  **executionRuntimeServices** - Score will populate this argument with the [ExecutionRuntimeServices](#/docs#executionruntimeservices) object. 
  ```java
  public void doWithServices(ExecutionRuntimeServices executionRuntimeServices)
  ```
  +  **executionContext** – Score will populate this argument with the context tied to the ExecutionPlan during its triggering through the [TriggeringProperties](#/docs#triggeringproperties).
  ```java
  public void doWithContext(Map<String, Serializable> executionContext) 
  ```
If an argument is present in both the [ExecutionStep](#/docs#executionstep) data and the execution context, the value from the execution context will be used.

####Action Method Return Values
+ Control action methods are `void` and do not return values.
+ Navigation action methods return a value of type `Long`, which is used to determine the next [ExecutionStep](#/docs#executionstep). Returning `null` signals the [ExecutionPlan](#/docs#executionplan) to finish.

###Score Interface
The Score interface exposes methods for triggering and canceling executions.

####Triggering New Executions
The `trigger(TriggeringProperties triggeringProperties)` method starts an execution with a given [ExecutionPlan](#docs/#executionplan) and the additional properties found in the [TriggeringProperies](#/docs#triggeringproperties) object. The method returns the ID of the new execution.

By default the first executed step will be the execution plan’s start step, and the execution context will be empty.

####Cancelling Executions
The `cancelExecution(Long executionId)` method requests to cancel (terminate) a given execution. It is passed the ID that was returned when triggering the execution that is now to be cancelled. 

Note that the execution will not necessarily be stopped immediately. 

###TriggeringProperties
A TriggeringProperties object is sent to the [Score interface's](#/docs#score-interface) trigger method when the execution begins.
 
 The TriggeringProperties object contains:
  
+ An [ExecutionPlan](#/docs#executionplan) to run.
+ The [ExecutionPlan's](#/docs#executionplan) dependencies, which are [ExecutionPlans](#/docs#executionplan) themselves.
+ A map of names and values to be added to the execution context.
+ A map of names and values to be added to the [ExecutionRuntimeServices](#/docs#executionruntimeservices).
+ A start step value, which can cause the [ExecutionPlan](#/docs#executionplan) to start from a step that is not necessarily its defined begin step.

The TriggeringProperties class exposes methods to create a TriggeringProperties object from an [ExecutionPlan](#/docs#executionplan) and then optionally set the various other properties. 


###ExecutionRuntimeServices
The ExecutionRuntimeServices provide a way to communicate with Score during the execution of an [ExecutionPlan](#/docs#executionplan). During an execution, after each [ExecutionStep](#/docs#executionstep), the engine will check the ExecutionRuntimeServices to see if there have been any requests made of it and will respond accordingly. These services can be used by a language written on top of Score, as CloundSlang does, to affect the runtime behavior.

The ExecutionRuntimeServices can be injected into an [ExecutionStep's](#/docs#executionstep) action or navigation method's arguments by adding the `ExecutionRuntimeServices executionRuntimeServices` parameter to the method's argument list.  

Some of the services provided by ExecutionRuntimeServices are:

+ Events can be added using the `addEvent(String eventType, Serializable eventData)` method.
+ Execution can be paused using the `pause()` method.
+ Errors can be set using the `setStepErrorKey(String stepErrorKey)` method.
+ Branches can be added using the `addBranch(Long startPosition, String flowUuid, Map<String, Serializable> context)` method or the `addBranch(Long startPosition, Long executionPlanId, Map<String, Serializable> context, ExecutionRuntimeServices executionRuntimeServices)` method.
+ Requests can be made to change the ExecutionPlan that is running by calling the  `requestToChangeExecutionPlan(Long executionPlanId)` method.

###EventBus
The EventBus allows you to subscribe and unsubscribe listeners for events. 

Listeners must implement the `ScoreEventListener` interface which consists of a single method – `onEvent(ScoreEvent event)`.

To subscribe a listener for certain events, pass a set of the events to listen for to the `subscribe(ScoreEventListener eventHandler, Set<String> eventTypes)` method.

The event types are defined in the `EventConstants` class.

To unsubscribe a listener from all the events it was listening for call the `unsubscribe(ScoreEventListener listener)` method.

###ScoreEvent
A ScoreEvent is comprised of a string value corresponding to its type and a map containing the event data, which can be accessed using the `getEventType()` and `getData()` methods respectively.

##Score Events
The CloudSlang Orchestration Engine (Score) defines two events that may be fired during execution. Each event is comprised of a string value corresponding to its type and a map containing the event data.

Event Types:

+ SCORE_FINISHED_EVENT
+ SCORE_FAILURE_EVENT

Event Data Keys:

+ IS_BRANCH
+ executionIdContext
+ systemContext
+ EXECUTION_CONTEXT

A language built upon Score can add events during run time using the [ExecutionRuntimeServices’s](#docs/#executionruntimeservices) API. An example of this usage can be seen in CloudSlang's addition of [Slang events](#/docs#slang-events).

##CloudSlang Architecture
###Overview
To be run by the CloudSlang Orchestration Engine (Score), a CloudSlang source file must undergo a process to transform it into a Score [`ExecutionPlan`](#/docs#executionplan) using the `SlangCompiler`.  

####Precompilation
The file is first loaded, along with its dependencies if necessary, and parsed in the precompilation process. In precompilation, the CloudSlang file's YAML structure is translated into Java maps by the `YamlParser` using [snakeyaml](http://snakeyaml.org). That parsed structure is then modeled to Java objects representing the parts of a flow and operation by the `SlangModeller` and the `ExecutableBuilder`. The result of this process is an object of type `Executable`.

####Compilation
The resulting `Executable` object, along with its dependent `Executable` objects, are then passed to the `ScoreCompiler` for compilation. An [`ExecutionPlan`](#/docs#executionplan) is created from the `Executable` using the `ExecutionPlanBuilder`. The `ExecutionPlanBuilder` uses the `ExecutionStepFactory` to manufacture the appropriate Score [`ExecutionStep`](#/docs#executionstep) objects and add them to the resulting [`ExecutionPlan`](#/docs#executionplan), which is then packaged with its dependent [`ExecutionPlan`](#/docs#executionplan) objects into a `CompilationArtifact`.

####Running
Now that the CloudSlang source has been fully transformed into an [`ExecutionPlan`](#/docs#executionplan) it can be run using Score. The [`ExecutionPlan`](#/docs#executionplan) and its dependencies are extracted from the `CompilationArtifact` and used to create a [`TriggeringProperties`](#/docs#triggeringproperties) object. A [`RunEnvironment`](#/docs#runenvironment) is also created and added to the [`TriggeringProperties`](#/docs#triggeringproperties) context. The [`RunEnvironment`](#/docs#runenvironment) provides services to the [`ExecutionPlan`](#/docs#executionplan) as it runs, such as keeping track of the context stack and next step position.       

###Treatment of Flows and Operations
Genrally, CloudSlang treats flows and operations similarly. 

Flows and operations both:

+ Receive inputs, produce outputs, and have navigation logic.
+ Can be called by a flow's task.
+ Are compiled to `ExecutionPlans` that can be run by Score.


###Scoped Contexts
As execution progresses from flow to operation to action, the step data (inputs, outputs, etc.) that is in scope changes.  These contexts are stored in the `contextStack` of the [`RunEnvironment`](#/docs#runenvironment) and get pushed onto and popped off as the scope changes. 

There are three types of scoped contexts:

+ Flow context
+ Operation context
+ Action context

![Scoped Contexts](images/diagrams/scoped_contexts.png "Scoped Contexts")

###Types of ExecutionSteps
As flows and operations are compiled, they are broken down into a number of [`ExecutionSteps`](#/docs#executionstep). These steps are built using their corresponding methods in the `ExecutionStepFactory`. 

There are five types of [`ExecutionSteps`](#/docs#executionstep) used to build a CloudSlang [`ExecutionPlan`](#/docs#executionplan): 

+ Start Step
+ End Step
+ Begin Task Step
+ End Task Step
+ Action Step

An operation's [`ExecutionPlan`](#/docs#executionplan) is built from a Start Step, an Action Step and an End Step. 

A flow's [`ExecutionPlan`](#/docs#executionplan) is built from a Start Step, a series of Begin Task Steps and End Task Steps, and an End Step. The task steps hand off the execution to other [`ExecutionPlan`](#/docs#executionplan) objects representing operations or subflows.

![Execution Steps](images/diagrams/execution_steps.png "Execution Steps")
  
###RunEnvironment
The `RunEnvironment` provides services to the [`ExecutionPlan`](#/docs#executionplan) as it is running. The different [types of execution steps](#/docs#types-of-executionsteps) read from, write to and update the environment.  

The `RuntimeEnvironment` contains:

 + **callArguments** - call arguments of the current step
 + **returnValues** - return values for the current step
 + **nextStepPosition** - position of the next step
 + **contextStack** - stack of contexts of the parent scopes
 + **parentFlowStack** - stack of the parent flows' data
 + **executionPath** - path of the current execution
 + **systemProperties** - system properties 
 + **serializableDataMap** - serializable data that is common to the entire run

##CloudSlang Orchestration Engine (Score) Architecture
Score is built from two main components, an engine and a worker. Scaling is achieved by adding additional workers and/or engines. 

![Score Architecture](images/diagrams/score_architecture.png "Score Architecture")

###Engine
The engine is responsible for managing the workers and interacting with the database. It does not hold any state information itself. 

The engine is composed of the following components:

+ **Orchestrator:** Responsible for creating new executions, canceling existing executions, providing the status of existing executions and managing the split/join mechanism.
+ **Assigner:** Responsible for assigning workers to executions.
+ **Queue:** Responsible for storing execution information in the database and responding with messages to polling workers.

###Worker 
The worker is responsible for doing the actual work of running the execution plans. The worker holds the state of an execution as it is running.

The worker is composed of the following components:

+ **Worker Manager:** Responsible for retrieving messages from the queue and placing them in the  in-buffer, delegating messages to the execution service, draining messages from the out-buffer to the orchestrator and updating the engine as to the worker's status.
+ **Execution Service:** Responsible for executing the execution steps, pausing and canceling executions, splitting executions and dispatching relevant events.

###Database
The database is composed of the following tables categorized here by their main functions:

+ Execution tracking:
  + **RUNNING_EXECUTION_PLANS:** full data of an execution plan and all of its dependencies 
  + **EXECUTION_STATE:** run statuses of an execution
  + **EXECUTION_QUEUE_1:** metadata of execution message
  + **EXECUTION_STATES_1 and EXECUTION_STATES_2:** full payloads of execution messages
+ Splitting and joining executions:
  + **SUSPENDED_EXECUTIONS:** executions that have been split
  + **FINISHED_BRANCHES:** finished branches of a split execution
+ Worker information:
	+ **WORKER_NODES:** info of individual workers
	+ **WORKER_GROUPS:** info of worker groups
+ Recovery:
	+ **WORKER_LOCKS:** row to lock on during recovery process   
	+ **VERSION_COUNTERS:** version numbers for testing responsiveness
+ Performance:
  + **PARTITION_GROUPS:** info for rolling partitions

###Typical Execution Path
In a typical execution the **orchestrator** receives an [`ExecutionPlan`](#/docs#executionplan) along with all that is needed to run it in a [`TriggeringProperties`](#/docs#triggeringproperties) object through a call to the [Score interface's](#/docs#score-interface) `trigger` method. The **orchestrator** inserts the full [`ExecutionPlan`](#/docs#executionplan) with all of its dependencies into the `RUNNING_EXECUTION_PLANS` table. An `Execution` object is then created based on the  [`TriggeringProperties`](#/docs#triggeringproperties) and an `EXECUTION_STATE` record is inserted indicating that the execution is running. The `Execution` object is then wrapped into an `ExecutionMessage`. The **assigner** assigns the `ExecutionMessage` to a **worker** and places the message metadata into the `EXECUTION_QUEUE_1` table and its `Payload` into the active `EXECUTION_STATES` table.

The **worker manager** constantly polls the **queue** to see if there are any `ExecutionMessage`s that have been assigned to it. As `ExecutionMessage`s are found, the **worker** acknowledges that they were received, wraps them as `SimpleExecutionRunnable`s and submits them to the **execution service**. When a thread is available from the **execution service**'s pool the execution will run one step (control action and navigation action) at a time until there is a reason for it to stop. There are various reasons for a execution to stop running on the **worker** and return to the **engine** including: the execution is finished, is about to split or it is taking too long. Once an execution is stopped it is placed on the out-buffer which is periodically drained back to the **engine**.

If the execution is finished, the **engine** fires a `SCORE_FINISHED_EVENT` and removes the execution's information from all of the execution tables in the database.

###Splitting and Joining Executions
Before running each step, a worker checks to see if the step to be run is a split step. If it is a split step, the worker creates a list of the split executions. It puts the execution along with all its split executions into a `SplitMessage` which is placed on the out-buffer. After draining, the orchestrator's split-join service takes care of the executions until they are to be rejoined. The service places the parent execution into the `SUSPENDED_EXECUTIONS` table with a count of how many branches it has been split into. `Execution`s are created for the split branches and placed on the queue. From there, they are picked up as usual by workers and when they are finished they are added to the `FINISHED_BRANCHES` table. Periodically, a job runs to see if the number of branches that have finished are equal to the number of branches the original execution was split into. Once all the branches are finished the original execution can be placed back onto the queue to be picked up again by a worker.

###Recovery
The recovery mechanism allows Score to recover from situations that would cause a loss of data otherwise. The recovery mechanism guarantees that each step of an execution plan will be run, but does not guarantee that it will be run only once. The most common recovery situations are outlined below. 
 
####Lost Worker
To prevent the loss of data from a worker that is no longer responsive the recovery mechanism does the following. Each worker continually reports their active status to the engine which stores a reporting version number for the worker in the `WORKER_NODES` table. Periodically a recovery job runs and sees which workers' reported version numbers are outdated, indicating that they have not been reporting back. The non-responsive workers' records in the queue get reassigned to other workers that pick up from the last known step that was executed.

####Worker Restart
To prevent the loss of data from a worker that has been restarted additional measures must be taken. The restarted worker will report that it is active, so the recovery job will not know to reassign the executions that were lost when it was restarted. Therefore, every time a worker has been started  an internal recovery is done. The worker's buffers are cleaned and the worker reports to the engine that it is starting up. The engine then checks the queue to see if that worker has anything that's already on the queue. Whatever is found is passed on to a different worker while the restarted one finishes starting up before polling for new messages. 

###Rolling Partition
For performance optimization, there are two `EXECUTION_STATES` tables, one of which is active at any given time. As the active `EXECUTION_STATES` table receives new records for a given execution, the outdated records for that execution are not deleted. To keep the table from growing too large a rolling partition job runs periodically. This job moves the most current record for all of the executions from the active table to the non-active one, changes the non-active table to be the active one and truncates the formerly active table.

##Contributing Code

###GitHub Repositories
The openscore project consists of the following [repositories](https://github.com/cloudslang) on GitHub with the dependencies depicted in the diagram.

![Repository Dependencies](images/diagrams/repo_dependencies.png "Repository Dependencies")

+ **score** - score engine
  + engine
  + package
  + score-api
  + score-samples
  + score-tests
  + worker 
+ **cloudslang** - CloudSlang and the CLI
  + score-lang-api
  + score-lang-cli
  + score-lang-compiler
  + score-lang-entities
  + score-lang-runtime
  + score-language-tests 
+ **cloudslang-content** - CloudSlang flows and operations
  + io/cloudslang/cloudslang
    + base
      + comparisons
      + lists
      + mail
      + network
      + remote_command_execution
        + ssh
      + strings  
    + consul
    + coreos 
    + docker
    + jenkins
    + marathon
    + openstack
    + (other integrations to be added as new folders)  
+ **cloudslang-actions** - Java @Action classes for CloudSlang
  + score-http-client
  + score-mail
  + score-ssh
  + score-utilities 
+ **cloudslang-sdk** - SDK for developing Java @Actions
  + src/main/java/com/hp/oo/sdk/content
    + annotations
    + plugin
      + ActionMetadata   
+ **cloudslang.github.io** - score website and documentation
  + app
    + images
    + markdowns
    + scripts
    + styles
    + views
  + tasks
  + test

### Contribution Guide

We welcome and encourage community contributions to CloudSlang.
Please familiarize yourself with the Contribution Guidelines and Project Roadmap before contributing.

There are many ways to help the CloudSlang project:

* Report issues
* Fix issues
* Improve the documentation


#### Contributing Code

The best way to directly collaborate with the project contributors is through GitHub: https://github.com/cloudslang.

* If you want to contribute to our code by either fixing a problem or creating a new feature, please open a GitHub pull request.
* If you want to raise an issue such as a defect, an enhancement request or a general issue, please open a GitHub issue.

Note that all patches from all contributors get reviewed.

After a pull request is made, other contributors will offer feedback. If the patch passes review, a maintainer will accept it with a comment.

When a pull request fails testing, the author is expected to update the pull request to address the failure until it passes testing and the pull request merges successfully.

At least one review from a maintainer is required for all patches (even patches from maintainers).

See the contributing.md file in the relevant repository for additional guidelines specific to that repository.  

#### Developer’s Certificate of Origin

All contributions must include acceptance of the DCO:

Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
660 York Street, Suite 102,
San Francisco, CA 94110 USA

Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I have the right to submit it under the open source license indicated in the file; or

(b) The contribution is based upon previous work that, to the best of my knowledge, is covered under an appropriate open source license and I have the right under that license to submit that work with modifications, whether created in whole or in part by me, under the same open source license (unless I am permitted to submit under a different license), as indicated in the file; or

(c) The contribution was provided directly to me by some other person who certified (a), (b) or (c) and I have not modified it.

(d) I understand and agree that this project and the contribution are public and that a record of the contribution (including all personal information I submit with it, including my sign-off) is maintained indefinitely and may be redistributed consistent with this project or the open source license(s) involved.

#### Sign your work

To accept the DCO, simply add this line to each commit message with your name and email address (`git commit -s` will do this for you):

`Signed-off-by: Jane Example <jane@example.com>`

For legal reasons, no anonymous or pseudonymous contributions are accepted.

#### Pull Requests
We encourage and support contributions from the community. No fix is too small. We strive to process all pull requests as soon as possible and with constructive feedback. If your pull request is not accepted at first, please try again after addressing the feedback you received.

To make a pull request you will need a GitHub account. For help, see GitHub's [documentation on forking and pull requests](https://help.github.com/articles/using-pull-requests/ ).

Normally, all pull requests must include tests that validate your change. Occasionally, a change will be very difficult to test. In those cases, please include a note in your commit message explaining why tests are not included.

####Conduct

Whether you are a regular contributor or a newcomer, we care about making this community a safe place for you.

We are committed to providing a friendly, safe and welcoming environment for all regardless of their background and the extent of their contributions.

Please avoid using nicknames that might detract from a friendly, safe and welcoming environment for all. Be kind and courteous.

Those who insult, demean or harass anyone will be excluded from interaction. In particular, behavior that excludes people in socially marginalized groups will not be tolerated.

We welcome discussion about creating a welcoming, safe and productive environment for the community. If you have any questions, feedback or concerns please let us know. (info@cloudslang.io)
