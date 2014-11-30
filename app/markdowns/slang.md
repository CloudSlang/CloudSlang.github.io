#SLANG - score language

##What is SLANG?

SLANG is a python based language for describing a workflow.

python is a human friendly data serialization standard for all programming languages. The acronym stands for
"python Ain't Markup Language" suggesting that its purpose is rather data-oriented than document markup. The python
(and SLANG) syntax maintains data structure hierarchy by outline indentation (in other words parallel elements should have the same left indentation).

SLANG as a workflow language is used to define processes introducing the concept of flows. See [SLANG DSL](#docs/#slang_dsl).
Using SLANG you can easily define your workflow in a structured, easy-to-understand format.

##SLANG DSL
The SLANG DSL contains the following main entities:

+ Flow: A flow is the basic executable unit of SLANG. It represents a process that can perform a job relevant to the end user. For example, a flow that creates a virtual machine. A flow consists of tasks and the navigation between them. Flows have inputs, outputs and possible results.
+ Task: One step in a flow. It can point to an operation or to another flow (which in this context is called subflow).
+ Operation: A wrapper unit of an action. The operation handles the action inputs, defines relevant outputs, and returns a result.
+ Action: A method, written pragmatically. This can be a java method or a type of script.
+ Result: The returned status of a flow or operation, for example: SUCCESS or FAILURE.

###Flow

A flow is the basic executable unit of SLANG. It represents a process that can be described in a number of ways and that can perform a job relevant to the end user. Each flow consists of a workflow describing the exact tasks (one or more) that are performed during the execution a flow. A flow can be used by other flows as a single task.

Property    |Required    |Default            |Description
------------|-----------|-------------------|-----------
name	    |V	        |   	            |The name of the flow
inputs		|	        |                   |List of inputs (see [Inputs](#docs/#inputs))
workflow	|V		    |                   |Describes the flow tasks and navigation (see [Workflow](#docs/#workflow))
results		|           |SUCCESS/FAILURE    |Possible results of the flow (see [Results](#docs/#results))
outputs		|   	    |                   |List of outputs (see [Outputs](#docs/#outputs))

*sample:*

```yaml
namespace: slang.sample.flows
imports: 
- ops: slang.ops.operations
flow:
  name: SimpleFlow
  inputs:
  - input_1
  - input_2
  - input_3
  workflow:
    CheckWeather:
      do: 
        ops.check_Weather:
          city: input_1
      publish:
        weather
    PrintWeather:
      operation:
        ops.print:
         - text:  "'the weather in' + input_1 + ' is:' + weather"
```


###Workflow

Describes the workflow of the flow, and contains the different tasks and the navigations between them.

The first task in the workflow is the begin task of the flow.
on_failure is a reserved key.
As default navigation the result of FAILURE goes to on_failure,
result of SUCCESS goes to the next step.
You can also define custom navigations with targets like: another task or flow results (e.g. SUCCESS / FAILURE).
Every task can use: predefined operation, inline operation or subflow, see [Task](#docs/#task).

Property	|Required	|Default	|Description
------------|-----------|-----------|-----------
on_failure	|		    |           |the default task FAILURE result should navigate to

*sample:*

```yaml
workflow:
  first_task:
    do: 
      some_operation:
      - operation_input_1: flow_input_3
      - operation_input_2
      - operation_input_3
    publish:
      flow_var: some_op_output
    navigate: 
      #how to handle operation that have non-default result
      #we'll use the default navigation as well: FAIL -> on_failure, SUCCESS -> next task (in our case second_task)
      NON_DEFAULT_RESULT: custom_task
      
```


###Inputs

Inputs are used to pass and manipulate parameters in flows, operations and tasks.
The name of the input is the key.

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
|required  |          |true     |If the input must have a value|
|default|||The default value of the input (constant value or expression) in case no other value passed|
|encrypted||false|If the value is true, the input will be encrypted|
|override||false|In case it is marked as true, the default value is always the value - even if the parent task/flow declared the input with given value |

*sample:*

```yaml
	inputs:
	- input_with_value_like_name
	- input_not_required:
	   required: false
	- input_use_system_property: "SYSTEM[memory] + system + user"
	- input_use_expression_inline: "'1' + '6'"
	- input_with_default_value:
	   default: "'I'm the default value'"
	- input_with_default_expression_value:
	   default: "'1' + '5'"
	- input_mix:
	   default: "'some value'"
	   required: false
```


###Outputs

Outputs defines the possible parameters flow / operation expose to further use (see [Task](#docs/#task) publish property).

*sample:*

```yaml
	outputs:
	- output_from_return_value: processId
	- output_from_input_value: fromInputs ['input1']
```


###Results

Describes the possible results of the flow. By default, the flow has two results: SUCCESS and FAILURE. You can override them, with an unlimited number of results. The result on runtime will be used to navigate when using this flow as sub-flow in a different flow.
*sample:*

```yaml
	results:
	 - SUCCESS
	 - FAILURE
	 - NO_SPACE
```

###Task
Task is a single node in the flow workflow. Every task can use: predefined operation, inline operation or subflow.

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
|operation | V        |         |Describe the operation or subflow this task will run|
|publish   |          |         |Choose from the operation outputs what to publish to the flow level|
|go_to     |FAILURE: on_failure SUCCESS: go to next task| | Describe the navigation for the different results the operation hase. In case of the default results, and their default go_to you don’t need to write it down.|

*sample:*

```yaml
    Task2:
          do:
            ops.compute_daylight_time_zone:
              - time_zone_as_string: flow_input
          publish:
            - daylight_time_zone
```

###Operation

Operation is the wrapper of an action. Operation can call predefined operation or inline operation.

Property    |Required    |Default	        |Description
------------|-----------|-------------------|-----------
inputs		|	        |                   |Operation inputs (see [Inputs](#docs/#inputs))
action  	|V		    |                   |Logic of the operation. (see [Action](#docs/#action))
results		|           |SUCCESS/FAILURE    |Possible results of the operation (see [Results](#docs/#results))
outputs		|   	    |                   |Outputs of the operation (see [Outputs](#docs/#outputs))

####Predefined operation

The recommended way, this way you can reuse this operation.

*sample:*

```yaml
    do: 
      some_operation:
        - operation_input_1: flow_input_3
        - operation_input_2
        - operation_input_3
```

####Inline operation

In this case you explicitly define your operation.

*sample:*

```yaml
    do:
      OrderVMFlow2:
        inputs:  
          - nova_host
          - nova_port
          - vm_name
          - vm_description
          - cpu_quantity
          - memory
          - disk_space
          - os
        action:
          python_script: |
            # put your script here
            import os
            processId = os.getpid()
            print processId
            print nova_host
            print nova_port
            print vm_name
            print vm_description
            print cpu_quantity
            print memory
        results:
          OOPS: statusCode == None
          SUCCESS: statusCode == 'created!'
          FAIL: some_output == fromInputs['disk_space']
        outputs:
          - ip
      publish:
        vm_ip: ip
      navigation:
        OOPS: Send_Mail
```

###Action

Two kind of actions are supported: java @Actions and python scripts.

####@Action
A java action is a valid @Action if respects the method signature `public Map<String, String> doSomething(paramaters)` and
uses the following annotations (from `com.hp.oo.sdk.content.annotations`):

+ required annotations
    - @Param: for action parameters
+ optional annotations
    - @Action: specify action information
    - @Output: denotes action output
    - @Response: denotes action response

*sample - java @Action*

```java
    public Map<String, String> doJavaAction(
            @Param("name") String name,
            @Param("role") String role) {
        //logic here
        Map<String, String> returnValues = new HashMap<>();
        //prepare return values map
        return returnValues;
    }
```

*sample - create custom operation that uses @Action*

```yaml
    - pull_image:
            inputs:
              - imageName
              - host
              - port
              - username
              - password
            action:
              java_action:
                className: org.mypackage.MyClass
                methodName: doMyAction
            outputs:
              - returnResult
            results:
              - SUCCESS : someActionOutput == '0'
              - FAILURE
```

####Python script
You can use any traditional python script regardless the version **(2.x and 3.x are also supported)???**.


###Imports

Written at the beginning of the file, after the namespace, used to specify the dependencies the file is using and the name it will be referenced within the file. 
*sample:*

```yaml
   imports:
     - ops: user.ops.OpenstackOperations
     - order_vm_flow: user.flows.OrderVmFlow
     - script_file: some_script_file.py
```


###Namespace

Used at the beginning of a file. Used as the namespace of the flow or operation. 
*sample:*

```yaml
  namespace: user.flows
```


##SLANG Events

SLANG uses score events. An event is represented by event type (a String value) and event data (Serializable object).
In case of SLANG the event data is a map that contains all the relevant information under certain keys defined in 
`com.hp.score.lang.runtime.events.LanguageEventData` class (See [table](#docs/#event_summary) below).
SLANG extends the traditional event type set provided by score with its own event types.

Event types from score:

+ SCORE_FINISHED_EVENT
+ SCORE_ERROR_EVENT
+ SCORE_FAILURE_EVENT

Event types from SLANG and the data each provide:<a name="event_summary"></a>

+ in square brackets we provide the keys under the information is put in the event data map

| Type [TYPE] | Usage | Description [DESCRIPTION] | Timestamp [TIMESTAMP] | Execution id [EXECUTIONID] | Path [PATH] | Exception [EXCEPTION] | Call arguments [CALL_ARGUMENTS] | Special data |
|----------|----------|----------|---------|-------------|----------|----------|---------|-------------|
| EVENT_INPUT_END | Input binding finished for task |  V  |  V  |  V  |  V  |    |    | bound inputs [BOUND_INPUTS], level: task, node name [TASK_NAME]  |
| EVENT_INPUT_END | Input binding finished for operation |  V  |  V  |  V  |  V  |    |    | bound inputs [BOUND_INPUTS], level: executable, node name [EXECUTABLE_NAME]  |
| EVENT_OUTPUT_START | Output binding started for task |  V  |  V  |  V  |  V  |    |    | task publish values [taskPublishValues], task navigation values [taskNavigationValues], operation return values [operationReturnValues], level: task, node name [TASK_NAME] |
| EVENT_OUTPUT_START | Output binding started for operation |  V  |  V  |  V  |  V  |    |    | executable outputs [executableOutputs], executable results [executableResults], action return values [actionReturnValues], level: executable, node name [EXECUTABLE_NAME] |
| EVENT_OUTPUT_END | Output binding finished for task |  V  |  V  |  V  |  V  |    |    | task bound outputs [OUTPUTS], task result [RESULT], next step position [nextPosition], level: task, node name [TASK_NAME] |
| EVENT_OUTPUT_END | Output binding finished for operation |  V  |  V  |  V  |  V  |    |    | executable bound outputs [OUTPUTS], executable result [RESULT], level: executable, node name [EXECUTABLE_NAME] |
| EVENT_EXECUTION_FINISHED | Execution finished running (in case of subflow) |  V  |  V  |  V  |  V  |    |    | executable bound outputs [OUTPUTS] , executable result [RESULT], level: executable, node name [EXECUTABLE_NAME] |
| EVENT_ACTION_START | Fired before the action invocation |  V  |  V  |  V  |  V  |    |  V  | action type (Java / Python) in description |
| EVENT_ACTION_END | Fired after a successful action invocation |  V  |  V  |  V  |  V  |    |    | action return values [RETURN_VALUES] |
| EVENT_ACTION_ERROR | Fired in case of exception in action execution |  V  |  V  |  V  |  V  |  V  |    |    |    |    |    |    |
| SLANG_EXECUTION_EXCEPTION | Fired in case of exception in the previous step |  V  |  V  |  V  |  V  |  V  |    |    |


##SLANG CLI

In order to use SLANG CLI you need to build the score-language project (run `mvn clean install` in root directory).
After buiding the project look up `score-language\score-lang-cli\target\appassembler\bin` folder. You can use the command line interface by running `slang.bat`.

You can get a list of available commands by typing `help` in the cli console.


*sample - running a flow*

```bash
run --f c:\...\your_flow.python --D input1=root,input2=25
```

*sample - set execution mode to asynchronous (by default the execution mode is synchronous - that means you can run only one flow at a time)*

```bash
env --setAsync true
```

*sample - get flow inputs*

```bash
inputs --f c:\...\your_flow.python
```

*sample - slang version*

```bash
slang -version
```

The execution log is saved in `score-language\score-lang-cli\target\appassembler\bin` directory under `execution.log` name. All the events are saved in this log so using this file you can easily track your flow execution.
