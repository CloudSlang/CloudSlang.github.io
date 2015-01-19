#SLANG - score Language

##What is SLANG?

SLANG is a [YAML](http://www.yaml.org) based language for describing a workflow. Using SLANG you can easily define a workflow in a structured, easy-to-understand format that can be run by **score**.

### Hello World Example
The following is a simple example to give you an idea of how SLANG is structured and can be used to ensure your environment is set up properly to run flows. 

####Prerequisites
This example uses the SLANG CLI to run a flow. See the [SLANG CLI](#docs/#slang-cli) section for instructions on how to download and run the CLI.

Although SLANG files can be composed in any text editor, using a modern code editor with support for YAML syntax highlighting is recommended. See [Sublime Integration](#docs/#sublime-integration) for instructions on how to download, install and use the SLANG snippets for [Sublime Text](http://www.sublimetext.com/).    

####Code files
In a new folder, create two new SLANG files, flow.sl and ops.sl, and copy the code below.

**flow.sl**
```yaml
namespace: user.flows.hello_world

imports:
  ops: user.operations.utils

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
The CLI runs the [flow](#docs/#flow) in the file we have passed to it, namely **flow.sl**. The [flow](#docs/#flow) begins with an [import](#docs/#imports) of the operations file, **ops.sl**, using its [namespace](#docs/#namespace) as the value for the [imports](#docs/#imports) key. Next, we enter the [flow](#docs/#flow) named `helloworld` and begin its [workflow](#docs/#workflow). The [workflow](#docs/#workflow) has one [task](#docs/#task) named `sayHi` which calls the `print` [operation](#docs/#operation) from the operations file that was imported. The [flow](#docs/#flow) passes the string `"'Hello, World'"` to the `print` [operation's](#docs/#operation) `text` [input](#docs/#inputs). The print [operation](#docs/#operation) performs its [action](#docs/#action), which is a simple Python script that prints the [input](#docs/#inputs), and then returns a [result](#docs/#results) of `SUCCESS`. Since the flow does not contain any more [tasks](#docs/#task) the [flow](#docs/#flow) finishes with a [result](#docs/#results) of `SUCCESS`.

##SLANG DSL Reference
This reference is organized with a brief introduction to SLANG files and their structure followed by an alphabetical list of SLANG keyword and concepts. 

###SLANG File 
SLANG files are written using [YAML](http://www.yaml.org). The recommended extension for SLANG files is .sl, but .yaml  and .yl will work as well. 

There are two types of SLANG files:

+ flow files
+ operations files


The following properties are for all types of SLANG files. For properties specific to flows, see [flows](#docs#/flow). For properties specific to operations see [operations](#docs#/operations). 

Property|Required|Default|Value Type|Description|More Info
---|---|---|---|---
`namespace`|no|-|string|namespace of the flow|[namespace](#docs/#namespace)
`imports`|no|-|list of key:value pairs|files to import|[imports](#docs/#imports)


####File Structure
The general structure of SLANG files is outlined here. Some of the properties that appear are optional and some detailed properties do not appear. All SLANG keywords, properties and concepts are explained in detail below.

**Flow file**

+ [namespace](#docs/#namespace)
+ [imports](#docs/#imports)
+ [flow](#/docs/#flow)
  + [name](#docs/#name)
  + [inputs](#docs/#inputs)
  + [workflow](#docs/#workflow)
    + [task(s)](#docs/#task)
      + [do](#docs/#do)
      + [publish](#docs/#publish)
      + [navigate](#docs/#navigate) 
  + [outputs](#docs/#outputs)
  + [results](#docs/#results)   

**Operations file**

+ [namespace](#docs/#namespace)
+ [imports](#docs/#imports)
+ [operations](#/docs/#operations)
    + [operation(s)](#docs/#operation)
        + [inputs](#docs/#inputs)
        + [action](#docs/#action)
        + [outputs](#docs/#outputs)
        + [results](#docs/#results)   

---

###action
The key `action` is a property of an [operation](#docs/#operation).
It is mapped to a property that defines the type of action, which can be [java_action](#docs/#java_action) or [python_script](#docs/#python_script).

####java_action
The key `java_action` is a property of [action](#docs/#action).  
It is mapped to the properties that define the class and method where the @Action resides.

A `java_action` is a valid @Action that conforms to the method signature: `public Map<String, String> doSomething(paramaters)` and uses the following annotations from `com.hp.oo.sdk.content.annotations`:

+ required annotations:
    - @Param: action parameter
+ optional annotations:
    - @Action: specify action information
    - @Output: action output
    - @Response: action response

**Example - SLANG call to  a Java @Action**

```yaml
- pull_image:
    inputs:
      - input1
      - input2
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

```java
    public Map<String, String> doMyAction(
            @Param("input1") String input1,
            @Param("input2") String input2) {
        //logic here
        Map<String, String> returnValues = new HashMap<>();
        //prepare return values map
        return returnValues;
    }
```

####python_script
The key `python_script` is a property of [action](#docs/#action).  
It is mapped to a value containing a Python version 2.7 script.

**Example - action with Python script that divides two numbers**

```yaml
- divide:
    inputs:
      - dividend
      - divisor
    action:
      python_script: |
        if divisor == '0':
          quotient = 'division by zero error'
        else:
          quotient = float(dividend) / float(divisor)
    outputs:
      - quotient
    results:
      - ILLEGAL: quotient == 'division by zero error'
      - SUCCESS
```

 

###default
The key `default` is a property of an [input](#docs/#inputs) name.
It is mapped to an expression value.

The expression's value will be passed to the [flow](#docs/#flow) or [operation](#docs/#operation) if no other value for that [input](#docs/#inputs) parameter is explicitly passed.  

**Example - default values **

```yaml
inputs:
  - str_literal:
	  default: "'default value'"
  - int_exp:
      default: '5 + 6'
  - from_variable:
	  default: variable_name
```

A default value can also be defined inline by entering it as the value to the [input](#docs/#inputs) parameter's key.

**Example - inline default values**
```yaml
inputs:
  - str_literal: "'default value'"
  - int_exp: '5 + 6'
  - from_variable: variable_name
```

###do
The key `do` is a property of a [task](#docs/#task) name.
It is mapped to a property that references an [operation](#docs/#operation) or [flow](#docs/#flow).

Calls an [operation](#docs/#operation) or [flow](#docs/#flow) and passes in relevant [input](#docs/#inputs). The [operation](#docs/#operation) or [flow](#docs/#flow) is called by its qualified name using an alias created in the [imports](#docs/#imports) parameter.

**Example - call to a divide operation with inputs**
```yaml
do:
  ops.divide:
    - dividend: input1
    - divisor: input2
```

###flow
The key `flow` is mapped to the properties which make up the flow contents.

A flow is the basic executable unit of SLANG. A flow can run on its own or it can be used by another flow in the [do](#docs/#do) property of a [task](#docs/#task).


Property|Required|Default|Value Type|Description|More Info
---|---|---|---|---|---
`name`|yes|-|string|name of the flow|[name](#docs/#name)
`inputs`|no|-|list|inputs for the flow|[inputs](#docs/#inputs)
`workflow`|yes|-|map of tasks|container for set of tasks|[workflow](#docs/#workflow)
`outputs`|no|-|list|list of outputs|[outputs](#docs/#outputs)
`results`|no|(`SUCCESS`/`FAILURE`)|list|possible results of the flow|[results](#docs/#results)

**Example - a flow that performs a division of two numbers**

```yaml
flow:
  name: simple_flow

  inputs:
    - input1
    - input2
  
  workflow:
    divider:
      do:
        ops.divide:
          - dividend: input1
          - divisor: input2
      publish:
        - answer: ans
      navigate:
        ILLEGAL: ILLEGAL
        SUCCESS: printer
    printer:
      do:
        ops.print:
          - text: input1 + "/" + input2 + " = " + answer
      navigate:
        SUCCESS: SUCCESS
  
  outputs:
    - quotient: answer
  
  results:
    - ILLEGAL
    - SUCCESS
```

###fromInputs
May appear in the value of an [operation's](#doc/#operation) [output](#doc/#outputs).

Special syntax to [output](#doc/#outputs) an [input](#docs/#inputs) parameter as it was passed in.

**Example - output "input1" as it was passed in**

```yaml
outputs:
  - output1: fromInputs['input1']
```

###imports
The key `imports` is mapped to the files to import as follows:  

+ key - alias 
+ value - namespace of file to be imported

Specifies the file's dependencies and the aliases they will be referenced by in the file.

**Example - import operations and sublflow into flow**
```yaml
imports:
  ops: user.operations.utils
  sub_flows: user.subflows.asubflow
```

###inputs
The key `inputs` is a property of a [flow](#docs/#flow) or [operation](#docs/#operation).
It is mapped to a list of input names. Each input name may in turn be mapped to its properties.   

Inputs are used to pass parameters to [flows](#docs/#flow) or [operations](#docs/#operation).

Property|Required|Default|Value Type|Description|More info
---|
`required`|no|true|boolean|is the input required|[required](#docs/#required)
`default`|no|-|expression|default value of the input|[default](#docs/#default)
`override`|no|false|boolean|will the default value override values passed in|[override](#docs/#override)

**Example - two inputs**

```yaml
inputs:
  - input1:
      default: "'default value'"
      override: true
  - input2
```


###name
The key `name` is a property of [flow](#docs/#flow) .
It is mapped to a value that is used as the name of the flow.

The name of a [flow](#docs/#flow) may be used when calling the [flow](#docs/#flow) as a subflow by a [task](#docs/#task) in another [flow](#docs/#flow). 

**Example - naming the flow "simple_flow"**

```yaml
name: simple_flow
```

###namespace
The key `namespace` is mapped to a string value that defines the file's namespace.

The namespace  may be used by other SLANG files for [importing](#docs/#imports) purposes.

**Example - definition a namespace**

```yaml
namespace: user.operations.utils
```

###navigate
The key `navigate` is a property of a [task](#docs/#task) name.
It is mapped to key:value pairs where the key is the received [result](#docs/#results) and the value is the target [task](#docs/#task) or [flow](#doc/#flow) [result](#docs/#results).

Defines the navigation logic for a [task](#docs/#task). The flow will continue with the [task](#docs/#task) or [flow](#doc/#flow) [result](#docs/#results) whose value is mapped to the [result](#docs/#results) returned by the called [operation](#docs/#operation) or subflow when the [task](#docs/#task) is completed. The default navigation is `SUCCESS` except for the [on_failure](#docs/#on_failure) [task](#docs/#task) whose default navigation is `FAILURE`.

**Example - ILLEGAL result will navigate to flow's FAILURE result and SUCCESS result will navigate to task named "printer"**
```yaml
navigate:
  ILLEGAL: FAILURE
  SUCCESS: printer
```

###on_failure
The key `on_failure` is a property of a [workflow](#docs/#workflow).
It is mapped to a [task](#doc/#task).

Defines the [task](#docs/#task), which when using default [navigation](#docs/#navigation), is the target of a `FAILURE` [result](#docs/#result) returned from an [operation](#docs/#operations) or [flow](#docs/flow). The `on_failure` [task's](#docs/#task) [navigation](#docs/#navigation) defaults to `FAILURE`.

**Example - faliure task which call a print operation to print an error message**
```yaml
on_failure:
  failure:
    do:
      ops.print:
        - text: error_msg
```

###operation
A name of an operation which list item of [operations](#docs/#operations).
It is mapped to the operation's properties.

Property|Required|Default|Value Type|Description|More Info
---|
inputs|no|-|list|operation inputs|[inputs](#docs/#inputs)
action|yes|-|`python_script` or `java_action`|operation logic|[action](#docs/#action)
outputs|no|-|list|operation outputs|[outputs](#docs/#outputs)
results|no|`SUCCESS`|list|possible operation results|[results](#docs/#results)


**Example - operation that adds two inputs and outputs the answer**

```yaml
- add:
   inputs:
     - left
     - right
   action:
     python_script: ans = left + right
   outputs:
     - out: ans
   results:
     - SUCCESS
```

###operations
The key `operations` is mapped to a list of [operation](operation) definitions.



**Example - operations key with one operation**
```yaml
operations:
  - print_done:
      action:
        python_script: print 'Done'
```

###outputs
The key `outputs` is a property of an [operation](#docs/#operation) name.
It is mapped to a list of output variable names which may also contain an expression value. Output expressions must evaluate to strings. 

Defines the parameters a  [flow](#docs/#flow) or [operation](#docs/#operation) exposes to possible [publication](#docs/#publish) by a [task](#docs/#task). The calling [task](#docs/#task) refers to an output by its name.

Note:  all variable values are converted to string before being used in an output's boolean expression.

See also [fromInputs](#docs/#fromInputs).

**Example - various types of outputs**

```yaml
outputs:
  - existing_variable
  - output2: some_variable
  - output3: str(5 + 6)
  - output4: fromInputs['input1']
```


###override
The key `override` is a property of an [input](#docs/#inputs) name.
It is mapped to a boolean value.

A value of `true` will always override the [input](#docs/#inputs) parameter sent to the [flow](#docs/#flow),  [task](#docs/#task) or [operation](#docs/#operation) with the [default](#doc/#default) value. If `override` is not defined, the [default](#doc/#default) value will not override the value passed to the [input](#docs/#inputs) parameter. 

**Example - default value of text input parameter will override values passed in**

```yaml
inputs:
  - text:
      default: "'default text'"
      override: true
```

###publish
The key `publish` is a property of a [task](#docs/#task) name.
It is mapped to a list of key:value pairs where the key is the published variable name and the value is the name of the [output](#docs/#outputs) received from the [operation](#docs/#operation) or [flow](#docs/#flow).

Binds the [output](#docs/#outputs) from an [operation](#docs/#operation) or [flow](#docs/#flow) to a variable whose scope is the current flow and can therefore be used by other tasks or as the [flow's](#docs/#flow) own [output](#docs/#outputs).

**Example - publish the quotient output as answer**
```yaml
publish:
  - answer: quotient
```

###results
The key `results` is a property of a [flow](#docs/#flows) or [operation](#docs/#operation).

The results of a [flow](#docs/#flows) or [operation](#docs/#operation) can be used by the calling [task](#docs/#task) for [navigation](#docs/#navigate) purposes.

####Flow results
In a [flow](#docs/#flow), the key `results` is mapped to a list of result names. 

Defines the possible results of the [flow](#docs/#flow). By default, a [flow](#docs/#flow) has two results, `SUCCESS` and `FAILURE`.  The defaults can be overridden with any number of user-defined results. When overriding, the defaults are lost and must be redefined if they are to be used. 

**Example - a user-defined result**

```yaml
results:
  - SUCCESS
  - ILLEGAL
  - FAILURE
```

####Operation results
In a operation the key `results` is mapped to a list of key:value pairs of result names and boolean expressions. 

Defines the possible results of the [operation](#docs/#operation). By default, if no results exist, the result is `SUCCESS`.  The first result in the list whose expression evaluates to true, or does not have an expression at all, will be passed back to the calling [task](#docs/#task) to be used for [navigation](#docs/#navigation) purposes.  

Note:  all variable values are converted to string before being used in a result's boolean expression.

**Example - three user-defined results**
```yaml
results:
  - POSITIVE: polarity == '+'
  - NEGATIVE: polarity == '-'
  - NEUTRAL
```

###required
The key `required` is a property of an [input](#docs/#inputs) name.
It is mapped to a boolean value.

A value of `false` will allow the [flow](#docs/#flow),  [task](#docs/#task) or [operation](#docs/#operation) to be called without passing the [input](#docs/#inputs) parameter. If `required` is not defined, the [input](#docs/#inputs) parameter defaults to being required. 

**Example - input2 is optional**

```yaml
inputs:
  - input1
  - input2:
      required: false
```

###task
A name of a task which is a property of [workflow](#docs/#workflow) or [on_failure](#docs/#on_failure).
It is mapped to the task's properties.

Property|Required|Default|Value Type|Description|More Info
---|
`do`|yes|-|operation or subflow call|the operation or subflow this task will run|[do](#docs/#do) [operation](#docs/#operation) [flow](#docs/#flow)
`publish`|no|-|list of key:value pairs|operation outputs to publish to the flow level|[publish](#docs/#publish) [outputs](#docs/#outputs)
|`navigate`|no|`FAILURE`: on_failure or flow finish; `SUCCESS`: next task|key:value pairs| navigation logic from operation or flow results|[navigation](#docs/#navigation) [results](#docs/#results)

**Example - task that performs a division of two inputs, publishes the answer and navigates accordingly**

```yaml
divider:
  do:
    ops.divide:
      - dividend: input1
      - divisor: input2
  publish:
    - answer: ans
  navigate:
    ILLEGAL: FAILURE
    SUCCESS: printer
```

###workflow
The key `workflow` is a property of a [flow](#docs/#flow).
It is mapped to a the workflow's [tasks](#/docs/#task).

Defines a container for the [tasks](#/docs/#task), their [published variables](#docs/#publish) and [navigation](#docs/#navigation) logic.

The first [task](#/docs/#task) in the workflow is the starting [task](#/docs/#task) of the flow. From there the flow continues sequentially by default upon receiving [results](#docs/#results) of `SUCCESS`, to the flow finish or to [on_failure](#docs/#on_failure) upon a [result](#docs/#results) of `FAILURE`, or following whatever overriding [navigation](#docs/#navigation) logic that is present.

Propery|Required|Default|Value Type|Description|More Info
---|
`on_failure`|no|-|[task](#/docs/#task)|default navigation target for `FAILURE`|[on_failure](#docs/#on_failure)

**Example - workflow that divides two numbers and prints them out if the division was legal**

```yaml
workflow:
  divider:
    do:
      ops.divide:
        - dividend: input1
        - divisor: input2
    publish:
      - answer: ans
    navigate:
      ILLEGAL: FAILURE
      SUCCESS: printer
  printer:
    do:
      ops.print:
        - text: input1 + "/" + input2 + " = " + answer
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
slang|template for a SLANG file
flow|template for a flow
task|template for a task
operation|template for an operation
  
**Note:** Optional SLANG elements are marked as comments (begin with #).
