#slang - score language
##What is slang?
##What is slang?


here we'll describe:

+ SLANG id a YAML based...
+ explanation what YAML is
+ about workflow language
+ short explanation about flow, operation, action, task.....

##slang DSL

here we'll describe: the score DSL doc


This document describes SLANG DSL, which is used to define a process, using flows. This DSL is YAML based. All the files consist of the following main entities:

+ Flow: A flow is the basic executable unit of SLANG. It represents a process that can perform a job relevant to the end user. For example, a flow that creates a virtual machine. A flow consists of tasks and the navigation between them. Flows have inputs, outputs and possible results.
+ Task: One step in a flow. It can point to an operation or to other flows.
+ Operation: A unit wrapped as an action. This handles its inputs, define relevant outputs, and returns a result.
+ Action: A method, written programmatically. This can be a java method or a type of script.
+ Result: The returned status of a flow or operation, for example: SUCCESS or FAILURE.

###Flow


###Inputs

Inputs used to pass and manipulate parameters in flows, operations and tasks.
The name of the input is the key.

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
|required  |          |true     |If the input must have a value|
|default|||The default value of the input (constant value or expression) in case no other value passed|
|override||false|In case it marked as true, the default value is always the value|

sample:

```ruby
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

sample:

```ruby
	outputs:
	- output_from_return_value: processId
	- output_from_input_value: fromInputs ['input1']
```

###Results

Describes the possible results of the flow. By default, the flow has two results: SUCCESS and FAILURE. You can override them, with an unlimited number of results. The result on runtime will be used to navigate when using this flow as sub-flow in a different flow.
sample:

```ruby
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

TBD

###Namespace

TBD

##slang events

here we'll describe: score events the different types and the data each provide