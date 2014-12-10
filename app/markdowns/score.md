#Score
##Score overview
**score** is a general-purpose java-based open-source orchestration engine which is process-based, 
embeddable, lightweight, scalable and multilingual.

###Process Based

Unlike many orchestration solution that describe the desired model, 
**score** aim to provide a process base approach, and lets you  to define the ‘how’ and not just the ‘what’, 
thus allowing you to better control the actual runtime behavior of the workflow.

###Embeddable

**score** is distributed as a standard java library, therefore you can easily embed score in your application, 
and use its java [APIs](#docs/#score-apis).

###Scalable

The fundamental architecture of **score** consists of:

+ [Worker](#docs/#worker) - the unit that actually executes the steps from the execution plan. 
+ [Engine](#docs/#engine) - a queue-based work distribution mechanism. 

Execution logic and distribution are optimized for high throughput and are horizontally scalable.

###Multilingual

Take advantage of its architecture, **score** can support any process modeling language out there.
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

You can build your own flows, or just use slang out of the box content. 

##Score APIs
All of the score APIs are available through 2 interfaces:

###Score - Execution API

####Triggering New Executions
+ `public Long trigger(TriggeringProperties triggeringProperties);`

This method starts an execution with the given [ExecutionPlan](#docs/#execution-plan) and with additional options. 
By default the first executed step will be the execution plan’s start step, the execution context will be empty.
Returns the id of the new execution.

*TriggeringProperties* contains the following data:
+ `executionPlan: ExecutionPlan`
+ `dependencies: Map<String, ExecutionPlan>`
+ `context: Map<String, ? extends Serializable>`
+ `runtimeValues: Map<String, ? extends Serializable>`
+ `startStep: long`

The execution *context* argument can be empty. If it isn’t empty the values inside will be added to the execution context.
    
The *runtimeValues* argument can be empty. If it isn’t empty the values inside will be 
added to the [ExecutionRuntimeServices](#docs/#executionruntimeservices).
    
The *startStep* argument can be used in order to make the plan start from a specific step that is not necessarily 
the execution plan’s *beginStep*.

####Cancelling Executions
+ `public void cancelExecution(Long executionId);`

This method request to cancel (terminate) a given execution, note that the execution will not necessarily be stopped immediately.

*executionId* - the execution to cancel identifier that was retrieved when triggering

###EventBus - Events API

####Event Listening
**score** allows subscribing listeners for events. 
Such listeners must implement the ScoreEventListener interface which consists of a single method – *onEvent*.
+ `subscribe(ScoreEventListener listener, String type…)`

This method subscribes the given listener for the specified event types.

+ `unsubscribe(ScoreEventListener listener)`

This method un-subscribes the given listener from all the types it was subscribed to.

####Event Types
Score fires events during an execution. An event consists of two members:
+  type – A string that can have one of the following values:
    -  Finished 'SCORE_FINISHED_EVENT' – Signals a finished execution
    -  Error 'SCORE_FAILURE_EVENT' – Signals an execution that finished with error
    
+  data – Serializable data.

Any language running in score can add events freely. 
this can be done in execution run time using the [ExecutionRuntimeServices’s](#docs/#executionruntimeservices) API.
