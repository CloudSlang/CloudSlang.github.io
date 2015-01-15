#SLANG - score Language

##What is SLANG?

SLANG is a [YAML](http://www.yaml.org) based language for describing a workflow. Using SLANG you can easily define a workflow in a structured, easy-to-understand format that can be run by **score**.

### Hello World Example
The following is a simple example to give you an idea of how SLANG is structured and can be used to ensure your environment is set up properly to run flows. 

####Prerequisites
This example uses the SLANG CLI to run a flow. See the [SLANG DSL Reference](#docs/#slang_dsl_reference) for instructions on how to download and run the CLI.

Although SLANG files can be edited in any text editor, we recommend using a modern code editor with support for YAML syntax highlighting. See [Sublime Integration](#docs/#sublime_integration) for instructions on how to download, install and use the SLANG snippets for [Sublime Text](http://www.sublimetext.com/).    

####Code files
In a new folder create two new SLANG files, flow.sl and ops.sl, and copy the code below.

**flow.sl**
```yaml
namespace: examples.flows

imports:
  ops: examples.operations

flow:
  name: helloWorld
  workflow:
    sayHi:
      do:
        ops.print:
          - text: "'Hello, World'"
```
**ops.sl**
```yaml
namespace: examples.operations

operations:
  - print:
      inputs:
        - text
      action:
        python_script: print text
      results:
        - SUCCESS
```

####Run
Start the CLI from the folder in which your SLANG files reside and then enter the following at the `slang>` prompt: `run flow.sl`

The output will look similar to this:
```
- sayHi
Hello, World
Flow : helloWorld finished with result : SUCCESS
Flow execution time took  0:00:00.790 , with execution id : 101600001
```

####Explanation
The CLI runs the flow in the file we have passed to it, namely **flow.sl**. The flow begins with an [import](#docs/#imports) of the operations file, **ops.sl**, using its [namespace](#docs/#namespace) as the value for the `imports` key. Next, we enter the [flow](#docs/#flow) named `helloworld` and begin its [workflow](#docs/#workflow). The workflow has one [task](#docs/#task) named `sayHi` which calls the `print` [operation](#docs/#operation) from the operations file that was imported. The flow passes the string `"'Hello, World'"` to the `print` operation's `text` [input](#docs/#inputs). The print operation performs its [action](#docs/#action), which is a simple Python script that prints the input, and then returns a [result](#docs/#results) of `SUCCESS`. Since the flow does not contain any more tasks the flow finishes with a result of `SUCCESS`.

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
name        |V          |                   |The name of the flow
inputs    	|	        |                   |List of inputs (see [Inputs](#docs/#inputs))
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
For the default navigation the result of FAILURE goes to on_failure, the result of SUCCESS goes to the next step.
You can also define custom navigations with targets like: another task or flow results (e.g. SUCCESS / FAILURE) - in this case the default navigation rules are ignored.
Every task can use: predefined operation or subflow, (see [Task](#docs/#task)).

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
      #how to handle an operation that has a non-default result
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

Outputs define the possible parameters flow / operation exposed to further use (see [Task](#docs/#task) publish property).

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
Task is a single node in the flow workflow. Every task can use predefined operation or subflow.

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
|operation | V        |         |Describe the operation or subflow this task will run|
|publish   |          |         |Choose from the operation outputs what to publish to the flow level|
|go_to     |FAILURE: on_failure SUCCESS: go to next task| | Describe the navigation for the different results the operation has. In case of the default results, with the default go_to you don’t need to write it down.|

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

Operation is the wrapper of an action.

Property    |Required    |Default	        |Description
------------|-----------|-------------------|-----------
inputs		|	        |                   |Operation inputs (see [Inputs](#docs/#inputs))
action  	|V		    |                   |Logic of the operation. (see [Action](#docs/#action))
results		|           |SUCCESS/FAILURE    |Possible results of the operation (see [Results](#docs/#results))
outputs		|   	    |                   |Outputs of the operation (see [Outputs](#docs/#outputs))

*sample:*

```yaml
    do: 
      some_operation:
        - operation_input_1: flow_input_3
        - operation_input_2
        - operation_input_3
```

###Action

Two kind of actions are supported: java @Actions and python scripts.

####@Action
A java action is a valid @Action that respects the method signature `public Map<String, String> doSomething(paramaters)` and
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
You can use any traditional python 2.7 version script.

*sample - create custom operation that uses Python script*

```yaml
      - check_Weather:
          inputs:
            - city
          action:
            python_script: |
              weather = "weather thing"
              print city
          outputs:
            - weather
          results:
            - SUCCESS: 'weather == "weather thing"'
```


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

###Some more samples

####Sample1 - demonstrates default navigation

*operations:*

```yaml
    namespace: user.ops
    
    operations:    
      - produce_default_navigation:
          inputs:
            - navigationType
          action:
            python_script:
              print 'Producing default navigation based on input'
          results:
            - SUCCESS: navigationType == 'success'
            - FAILURE: 1 == 1
```

*flow:*

```yaml
    namespace: user.flows
    
    imports:
     ops: user.ops
    
    flow:
      name: navigation_flow
      inputs:
        - navigationType
        - emailHost
        - emailPort
        - emailSender
        - emailRecipient
      workflow:
        produce_default_navigation:
          do:
            ops.produce_default_navigation:
              - navigationType
    
        check_Weather: # default navigation: go to this step on success
          do:
            ops.check_Weather:
              - city: "'AwesomeCity'"
          navigate:
            SUCCESS: SUCCESS # end flow with success result
    
        on_failure: # default navigation: go to this step on failure
          send_error_mail:
            do:
              ops.send_email_mock:
                - hostname: emailHost
                - port: emailPort
                - sender: emailSender
                - recipient: emailRecipient
                - subject: "'Flow failure'"
                - body: "'Default failure navigation here'"
            navigate:
              SUCCESS: FAILURE # end flow with failure result
              FAILURE: FAILURE
```

####Sample2 - demonstrates custom navigation and publishing outputs

*operations:*

```yaml
    namespace: user.ops
    
    operations:
      - check_number:
          inputs:
            - number
          action:
            python_script: |
              remainder = number % 2
              isEven = remainder == 0
              tooBig = number > 512
          outputs:
            - preprocessed_number: str(fromInputs['number'] * 3)
          results:
            - EVEN: isEven == 'True' and tooBig == 'False'
            - ODD: isEven == 'False' and tooBig == 'False'
            - FAILURE # report failure if the number is too big
    
      - process_even_number:
          inputs:
            - even_number
            - offset: 32
          action:
            python_script: |
              processing_result = int(even_number) + offset
              print 'Even number processed. Result= ' + str(processing_result)
    
      - process_odd_number:
          inputs:
            - odd_number
          action:
            python_script:
              print 'Odd number processed. Result= ' + str(odd_number)
```

```yaml
    namespace: email.ops
    
    operations:
      - send_mail:
          inputs:
            - hostname
            - port
            - from
            - to
            - cc: "''"
            - bcc: "''"
            - subject
            - body
            - htmlEmail: "'true'"
            - readReceipt: "'false'"
            - attachments: "''"
            - username: "''"
            - password: "''"
            - characterSet: "'UTF-8'"
            - contentTransferEncoding: "'base64'"
            - delimiter: "''"
          action:
            java_action:
              className: org.openscore.content.mail.actions.SendMailAction
              methodName: execute
          results:
            - SUCCESS: returnCode == '0'
            - FAILURE
```

*flow:*

```yaml
    namespace: user.flows
    
    imports:
     ops: user.ops
     email: email.ops
    
    flow:
      name: navigation_flow
      inputs:
        - userNumber
        - emailHost
        - emailPort
        - emailSender
        - emailRecipient
      workflow:
        check_number:
          do:
            ops.check_number:
              - number: userNumber
          publish:
            - new_number: preprocessed_number # publish the output in the flow level so it will be visible for other steps
          navigate:
            EVEN: process_even_number
            ODD: process_odd_number
            FAILURE: send_error_mail
    
        process_even_number:
          do:
            ops.process_even_number:
              - even_number: new_number
          navigate:
            SUCCESS: SUCCESS # end flow with success result
    
        process_odd_number:
          do:
            ops.process_odd_number:
              - odd_number: new_number
          navigate:
            SUCCESS: SUCCESS # end flow with success result
    
        on_failure: # you can also use this step for default navigation in failure case
          send_error_mail: # or refer it by the task name
            do:
              email.send_mail:
                - hostname: emailHost
                - port: emailPort
                - from: emailSender
                - to: emailRecipient
                - subject: "'Flow failure'"
                - body: "'Wrong number: ' + str(userNumber)"
            navigate:
              SUCCESS: FAILURE # end flow with failure result
              FAILURE: FAILURE
```

####Sample3 - demonstrates subflow usage

*operations:*

```yaml
    namespace: user.ops

    operations:
      - test_op:
          action:
            python_script: 'print "hello world"'
            
  - check_Weather:
      inputs:
        - city
      action:
        python_script: |
          weather = "weather thing"
          print city
      outputs:
        - weather: weather
      results:
        - SUCCESS: 'weather == "weather thing"'
```

*subflow:*

```yaml
    namespace: user.flows
    
    imports:
      ops: user.ops
    
    flow:
      name: child_flow
      inputs:
        - input1: "'value'"
      workflow:
        CheckWeather:
          do:
            ops.test_op:
      outputs:
        - val_output: fromInputs['input1']
```

*parent flow:*

```yaml
    namespace: user.flows
    
    imports:
      ops: user.ops
      flows: user.flows
    
    flow:
      name: parent_flow
      inputs:
        - input1
        - city:
            required: false
      workflow:
        Task1:
          do:
            ops.check_Weather:
              - city: city if city is not None else input1
          publish:
            - kuku: weather
    
        Task2:
          do:
            flows.child_flow:
              - input1: kuku
          publish:
            - val_output
      results:
        - SUCCESS
        - FAILURE
```

##SLANG Events

SLANG uses score events. An event is represented by event type (a String value) and event data (Serializable object).
In case of SLANG the event data is a map that contains all the relevant information under certain keys defined in 
`org.openscore.lang.runtime.events.LanguageEventData` class (See [table](#docs/#event_summary) below).
SLANG extends the traditional event type set provided by score with its own event types.

Event types from score:

+ SCORE_FINISHED_EVENT
+ SCORE_FAILURE_EVENT

Event types from SLANG and the data each provide:
- Description [DESCRIPTION] - the event description
- Timestamp [TIMESTAMP] - the event time-stamp
- Execution id [EXECUTIONID] - the event execution id
- Path [PATH] - the event path, the path is increased when entering a subflow / operation

in square brackets we provide the keys under the information is put in the event data map

| Type [TYPE] | Usage | Event Data |
|----------|----------|----------|
| EVENT_INPUT_END | Input binding finished for task  | bound inputs [BOUND_INPUTS] level: task, node name [TASK_NAME]  |
| EVENT_INPUT_END | Input binding finished for operation  | bound inputs [BOUND_INPUTS], level: executable, node name [EXECUTABLE_NAME]  |
| EVENT_OUTPUT_START | Output binding started for task | task publish values [taskPublishValues], task navigation values [taskNavigationValues], operation return values [operationReturnValues], level: task, node name [TASK_NAME] |
| EVENT_OUTPUT_START | Output binding started for operation | executable outputs [executableOutputs], executable results [executableResults], action return values [actionReturnValues], level: executable, node name [EXECUTABLE_NAME] |
| EVENT_OUTPUT_END | Output binding finished for task | task bound outputs [OUTPUTS], task result [RESULT], next step position [nextPosition], level: task, node name [TASK_NAME] |
| EVENT_OUTPUT_END | Output binding finished for operation | executable bound outputs [OUTPUTS], executable result [RESULT], level: executable, node name [EXECUTABLE_NAME] |
| EVENT_EXECUTION_FINISHED | Execution finished running (in case of subflow) | executable bound outputs [OUTPUTS] , executable result [RESULT], level: executable, node name [EXECUTABLE_NAME] |
| EVENT_ACTION_START | Fired before the action invocation  | call arguments [CALL_ARGUMENTS], action type (Java / Python) in description |
| EVENT_ACTION_END | Fired after a successful action invocation  | action return values [RETURN_VALUES] |
| EVENT_ACTION_ERROR | Fired in case of exception in action execution |  exception [EXCEPTION] |
| SLANG_EXECUTION_EXCEPTION | Fired in case of exception in the previous step |  exception [EXCEPTION] |


##SLANG CLI
You have two ways to obtain SLANG CLI: either download it directly from score website or build it by yourself.

###Running CLI by downloading it

+ go to ([Score website](/#/))
+ in the "Getting started section" click "Download an use slang CLI tool"
+ click "Download latest version". This will download an archive with the latest CLI version
+ unzip the archive. It contains a folder called "appassembler" and some sample flows
    - the "appassembler" folder contains the CLI tool and the necessary dependencies
+ navigate to the folder `appassembler\bin\`
+ start CLI by running `slang.bat`

###Running CLI by building it

+ download the project sources from [here](#DOWNLOAD_LINK_HERE)
+ navigate to project root directory
+ build the project: open a command window here and run `mvn clean install`
+ after building the project navigate to `score-language\score-lang-cli\target\appassembler\bin` folder
+ start CLI by running `slang.bat`

###Using the CLI

You can get a list of available commands by typing `help` in the cli console.

*sample - running a flow with default classpath (flow directory)*

```bash
run --f c:/.../your_flow.sl --i input1=root,input2=25
```

*sample - running a flow with custom classpath*

```bash
run --f c:/.../your_flow.sl --i input1=root,input2=25 --cp c:/.../yaml/
run --f c:/.../your_flow.sl --i input1=root,input2=25 --cp c:/.../yaml/,c:/.../openstack/
```

*sample - set execution mode to asynchronous (by default the execution mode is synchronous - that means you can run only one flow at a time)*

```bash
env --setAsync true
```

*sample - get flow inputs*

```bash
inputs --f c:/.../your_flow.sl
```

*sample - slang version*

```bash
slang -version
```

The execution log is saved in `score-language\score-lang-cli\target\appassembler\bin` directory under `execution.log` name. All the events are saved in this log so using this file you can easily track your flow execution.

##Sublime Integration

Although SLANG files can be composed in any text editor, using a modern code editor with support for YAML syntax highlighting is recommended. 

To ease the SLANG coding process you can use our Sublime Text snippets. 

###Download, Install and Configure Sublime Text for Windows:

+ Download and install [Sublime Text](http://www.sublimetext.com/).
+ Download the [slang-sublime package](https://github.com/orius123/slang-sublime/releases/download/0.1.0/slang-sublime-0.1.0.sublime-package). 
+ Copy the downloaded package file into C:\Users\&lt;User&gt;\AppData\Roaming\Sublime Text 2\Installed Packages
+ Restart Sublime Text.
+ New files with the .sl extension will be recognized as SLANG files. For existing files you may have to change the language manually.

To use the templates start typing the template name and press enter when it appears on the screen. 

The following templates are provided:

Keyword|Description
---|---
slang|template for a slang file
flow|template for a flow
task|template for a task
operation|template for an operation
  
**Note:** Optional SLANG elements are marked as comments (begin with #).