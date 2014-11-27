#slang - score language

##What is slang?

here we'll describe:

+ SLANG is a YAML based language for describing a workflow 
+ explanation what YAML is
+ about workflow language


##slang DSL

here we'll describe: the score DSL doc

This document describes SLANG DSL, which is used to define a process, using flows. This DSL is YAML based. All the files consist of the following main entities:

+ Flow: A flow is the basic executable unit of SLANG. It represents a process that can perform a job relevant to the end user. For example, a flow that creates a virtual machine. A flow consists of tasks and the navigation between them. Flows have inputs, outputs and possible results.
+ Task: One step in a flow. It can point to an operation or to other flows.
+ Operation: A unit wrapped as an action. This handles its inputs, define relevant outputs, and returns a result.
+ Action: A method, written pragmatically. This can be a java method or a type of script.
+ Result: The returned status of a flow or operation, for example: SUCCESS or FAILURE.


###Flow

A flow is the basic executable unit of slang. It represents a process that can be described in a number of ways and that can perform a job relevant to the end user. Each flow consists of a workflow describing the exact tasks (one or more) that are performed during the execution a flow. A flow can be used by other flows as a single task.

Property	|Required	|Default	        |Description
------------|-----------|-------------------|-----------
name	    |V	        |N\A	            |The name of the flow
inputs		|	        |                   |List of inputs (see Inputs)
workflow	|V		    |                   |Describes the flow tasks and navigation
results		|           |SUCCESS/FAILURE    |Possible results of the flow (see Results)
outputs		|   	    |                   |List of outputs (see Outputs)

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

Describe the workflow of the flow, and contains the different tasks and the navigations between them.

The first task in the workflow is the begin task of the flow.
on_failure is a reserved key.
A default go_to, overrides the following:
result of FAILURE goes to on_failure
result of SUCCESS goes to the next step
Every task can use: predefined operation, inline operation or sub flow, see Task

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
      NON_DEFAULT_RESULT:
```


###Inputs

Inputs used to pass and manipulate parameters in flows, operations and tasks.
The name of the input is the key.

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
|required  |          |true     |If the input must have a value|
|default|||The default value of the input (constant value or expression) in case no other value passed|
|override||false|In case it marked as true, the default value is always the value|

*sample:*

```yaml
	inputs:
	- input_with_value_like_name
	- input_not_required:
	   required: false
	- input_use_system_property: ->SYSTEM[memory] + system + meir
	- input_use_expression_inline: ->'1' + '6'
	- input_with_default_value:
	   default: "I'm the default value"
	- input_with_default_expression_value:
	   default: ->'1' + '5'
	- input_mix:
	   default: "some value"
	   required: false
```


###Outputs

Outputs defines the possible parameters flow \ operation expose to further use.

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


###Operation

TBD


###Action

TBD


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


##slang events

here we'll describe: score events the different types and the data each provide