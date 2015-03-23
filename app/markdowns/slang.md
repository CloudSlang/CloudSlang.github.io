#CloudSlang

##What is CloudSlang?

CloudSlang is a [YAML](http://www.yaml.org) (version 1.2) based language for describing a workflow. Using CloudSlang you can easily define a workflow in a structured, easy-to-understand format that can be run by the CloudSlang Orchestration Engine (Score). CloudSlang files can be run by the [CloudSlang CLI](#/docs#cloudslang-cli) or by an embedded instance of Score using the [Slang API](#/docs#slang-api).

###YAML Overview
Before writing CloudSlang code it help to have a good working knowledge of YAML. The following is a brief overview of some of the YAML specification. See the full [YAML specification](http://www.yaml.org/spec/1.2/spec.html) for more information.

####Whitespace
Unlike many programming, markup, and data serialization languages, whitespace is syntactically significant. Indentation is used to denote scope and is always achieved using spaces. Never use tabs.

**Example: a CloudSlang task (in this case named divider) contains do, publish and navigate keys**

```yaml
- divider:
    do:
      ops.divide:
        - dividend: input1
        - divisor: input2
    publish:
      - answer: quotient
    navigate:
      ILLEGAL: FAILURE
      SUCCESS: printer
```

####Lists
Lists are denoted with a hypen (-) and a space preceding each list item. 

**Example: a CloudSlang flow's possible results are defined using a list mapped to the results key**
```yaml
results:
  - ILLEGAL
  - SUCCESS
```

####Maps
Maps are denoted use a colon (:) and a space between each key value pair.

**Example: a CloudSlang task's navigate key is mapped to a mapping of results and their targets**
```yaml
navigate:
  ILLEGAL: FAILURE
  SUCCESS: printer
```

####Strings
Strings can be denoted in several ways: unquoted, single quoted and double quoted. The best method for any given string depends on whether it includes any special characters, leading or trailing whitespace, spans multiple lines, along with other factors.

Strings that span multiple lines can be written using a pipe (|) to preserve line breaks or a greater than symbol (>) where each line break will be converted to a space.

**Example:  a name of a CloudSlang flow is defined using the unquoted style** 
```yaml
flow:
  name: hello_world
```

**Example:  the single or double quoted style is used in CloudSlang to pass a Python string, which is quoted using the other style, to an input parameter** 
```yaml
- sayHi:
    do:
      ops.print:
        - text: "'Hello, World'"
```

**Example:  the pipe is used in CloudSlang to indicate a multi-line Python script** 
```yaml
action:
  python_script: |
    if divisor == '0':
      quotient = 'division by zero error'
    else:
      quotient = float(dividend) / float(divisor)
```

####Comments
Comments begin with the `#` symbol.

### Hello World Example
The following is a simple example to give you an idea of how CloudSlang is structured and can be used to ensure your environment is set up properly to run flows. 

####Prerequisites
This example uses the CloudSlang CLI to run a flow. See the [CloudSlang CLI](#/docs#cloudslang-cli) section for instructions on how to download and run the CLI.

Although CloudSlang files can be composed in any text editor, using a modern code editor with support for YAML syntax highlighting is recommended. See [Sublime Integration](#/docs#sublime-integration) for instructions on how to download, install and use the CloudSlang snippets for [Sublime Text](http://www.sublimetext.com/).    

####Code files
In a new folder, create two new CloudSlang files, hello_world.sl and print.sl, and copy the code below.

**hello_world.sl**
```yaml
namespace: examples.hello_world

imports:
  ops: examples.hello_world

flow:
  name: hello_world
  workflow:
    - sayHi:
        do:
          ops.print:
            - text: "'Hello, World'"
```
**print.sl**
```yaml
namespace: examples.hello_world

operation:
  name: print
  inputs:
    - text
  action:
    python_script: print text
  results:
    - SUCCESS
```

####Run
Start the CLI from the folder in which your CloudSlang files reside and enter `run hello_world.sl` at the `cslang>` prompt. 

The output will look similar to this:
```bash
- sayHi
Hello, World
Flow : hello_world finished with result : SUCCESS
Execution id: 101600001, duration: 0:00:00.790
```

####Explanation
The CLI runs the [flow](#/docs#flow) in the file we have passed to it, namely **hello_world.sl**. The [flow](#/docs#flow) begins with an [import](#/docs#imports) of the operations file, **print.sl**, using its [namespace](#/docs#namespace) as the value for the [imports](#/docs#imports) key. Next, we enter the [flow](#/docs#flow) named `hello_world` and begin its [workflow](#/docs#workflow). The [workflow](#/docs#workflow) has one [task](#/docs#task) named `sayHi` which calls the `print` [operation](#/docs#operation) from the operations file that was imported. The [flow](#/docs#flow) passes the string `"'Hello, World'"` to the `print` [operation's](#/docs#operation) `text` [input](#/docs#inputs). The print [operation](#/docs#operation) performs its [action](#/docs#action), which is a simple Python script that prints the [input](#/docs#inputs), and then returns a [result](#/docs#results) of `SUCCESS`. Since the flow does not contain any more [tasks](#/docs#task) the [flow](#/docs#flow) finishes with a [result](#/docs#results) of `SUCCESS`.

##CloudSlang Reference
This reference begins with a brief introduction to CloudSlang files and their structure, an alphabetical listing of CloudSlang keywords and concepts, and several examples, including one from which many of the code snippets below are taken.


###CloudSlang Files 
CloudSlang files are written using [YAML](http://www.yaml.org). The recommended extension for CloudSlang files is **.sl**, but **.sl.yaml** and **.sl.yml** will work as well. 

There are two types of CloudSlang files:

+ flow - contains a list of tasks and navigation logic that calls operations or subflows
+ operation - contains an action that runs a script or method

The following properties are for all types of CloudSlang files. For properties specific to [flows](#/docs#flow) or [operations](#/docs#operation), see their respective sections below.  

Property|Required|Default|Value Type|Description|More Info
---|---|---|---|---
`namespace`|no|-|string|namespace of the flow|[namespace](#/docs#namespace)
`imports`|no|-|list of key:value pairs|files to import|[imports](#/docs#imports)


####File Structure
The general structure of CloudSlang files is outlined here. Some of the properties that appear are optional. All CloudSlang keywords, properties and concepts are explained in detail below. 

**Flow file**

+ [namespace](#/docs#namespace)
+ [imports](#/docs#imports)
+ [flow](#/docs#flow)
  + [name](#/docs#name)
  + [inputs](#/docs#inputs)
	  + [required](#/docs#required)
	  + [default](#/docs#default)
	  + [overridable](#/docs#overridable)
	  + [system_property](#/docs#system_property)
  + [workflow](#/docs#workflow)
    + [task(s)](#/docs#task)
      + [do](#/docs#do)
      + [publish](#/docs#publish)
	    + [fromInputs](#/docs#fromInputs)
      + [navigate](#/docs#navigate) 
    + [loop task](#/docs#task)
      + [loop](#/docs#loop)
        + [for](#/docs#for)
        + [do](#/docs#do)
        + [publish](#/docs#publish)
        + [break](#/docs#break)
      + [navigate](#/docs#navigate) 
    + [on_failure](#/docs#on_failure) 
  + [outputs](#/docs#outputs)
    + [fromInputs](#/docs#fromInputs)
  + [results](#/docs#results)   

**Operations file**

+ [namespace](#/docs#namespace)
+ [imports](#/docs#imports)
+ [operation](#/docs#operations)
  + [name](#/docs#name)
  + [inputs](#/docs#inputs)
    + [required](#/docs#required)
	+ [default](#/docs#default)
	+ [overridable](#/docs#overridable)
	+ [system_property](#/docs#system_property)
  + [action](#/docs#action)
  + [outputs](#/docs#outputs)
	+ [fromInputs](#/docs#fromInputs)
  + [results](#/docs#results)   

---

###action
The key `action` is a property of an [operation](#/docs#operation).
It is mapped to a property that defines the type of action, which can be a [java_action](#/docs#java_action) or [python_script](#/docs#python_script).

####java_action
The key `java_action` is a property of [action](#/docs#action).  
It is mapped to the properties that define the class and method where the @Action resides.

A `java_action` is a valid @Action that conforms to the method signature: `public Map<String, String> doSomething(paramaters)` and uses the following annotations from `com.hp.oo.sdk.content.annotations`:

+ required annotations:
    - @Param: action parameter
+ optional annotations:
    - @Action: specify action information
    - @Output: action output
    - @Response: action response

**Example - CloudSlang call to  a Java @Action**

```yaml
name: pull_image
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
The key `python_script` is a property of [action](#/docs#action).  
It is mapped to a value containing a Python version 2.7 script.

**Example - action with Python script that divides two numbers**

```yaml
name: divide
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
**Note:** Single-line Python scripts can be written inline with the `python_script` key. Multi-line Python scripts can use the YAML pipe (|) indicator as in the example above.

#####Importing External Python Packages
There are three approaches to importing and using external Python modules:

+ Installing packages into the **python-lib** folder
+ Editing the executable file
+ Adding the package location to `sys.path` 

**Installing packages into the python-lib folder:**

Prerequisite: **pip** - see **pip**'s [documentation](https://pip.pypa.io/en/latest/installing.html) for how to install. 

1. Edit the **requirements.txt** file in the **python-lib** folder, which is found at the same level as the **bin** folder that contains the CLI executable. 
	+ If not using a pre-built CLI, you may have to create the **python-lib** folder and **requirements.txt** file.
2. Enter the Python package and all its dependencies in the requirements file.
	+ See the **pip** [documentation](https://pip.pypa.io/en/latest/user_guide.html#requirements-files) for information on how to format the requirements file.
    **Example - requirements file**
    ```
    pyfiglet == 0.7.2
    setuptools
    ```  
3.  Run the following command from inside the **python-lib** folder:
    ```
    pip install -r requirements.txt -t .
    ```
    **Note:** If your machine is behind a proxy you will need to specify the proxy using pip's `--proxy` flag.
4. Import the package as you normally would in Python from within the action's `python_script`:
    ```yaml
    action:
      python_script: |
        from pyfiglet import Figlet
        f = Figlet(font='slant')
        print f.renderText(text)
    ```

**Note:** If you have defined a `JYTHONPATH` environment variable, you will need to add the **python-lib** folder's path to its value. 

**Editing the executable file**

1. Open the executable found in the **bin** folder for editing.
2. Change the `Dpython.path` key's value to the desired path.
3. Import the package as you normally would in Python from within the action's `python_script`.

**Adding the package location to `sys.path`:**

1. In the action's Pyton script, import the `sys` module.
2. Use `sys.path.append()` to add the path to the desired module.
3. Import the module and use it. 
    **Example - takes path as input parameter, adds it to sys.path and imports desired module **
```yaml
inputs:
  - path
action:
  python_script: |
    import sys
    sys.path.append(path)
    import module_to_import
    print module_to_import.something()
```


####Importing Python Scripts
To import a Python script in a `python_script` action:

1. Add the Python script to the **python-lib** folder, which is found at the same level as the **bin** folder that contains the CLI executable. 
2. Import the script as you normally would in Python from within the action's `python_script`.

**Note:** If you have defined a `JYTHONPATH` environment variable, you will need to add the **python-lib** folder's path to its value. 



###break
The key `break` is a property of a [loop](#/docs#loop).
It is mapped to a list of results on which to break out of the loop or an empty list (`[]`) to override the default breaking behavior for a list. When the [operation](#/docs#operation) or [subflow](#/docs#flow) of the [iterative task](#/docs#iterative-task) returns a result in the break's list, the iteration halts and the [interative task's](#/docs#iterative-task) [navigation](#/docs#navigation) logic is run. 

If the `break` property is not defined, the loop will break on results of `FAILURE` by default. This behavior may be overriden so that iteration will continue even when a result of `FAILURE` is returned by defining alternate break behavior or mapping the `break` key to an empty list (`[]`). 

**Example - loop that breaks on result of CUSTOM **

```yaml
loop:
  for: value in range(1,7)
  do:
    ops.custom_op:
      - text: value
  break:
    - CUSTOM
navigate:
  CUSTOM: print_end
```

**Example - loop that continues even on result of FAILURE **

```yaml
loop:
  for: value in range(1,7)
  do:
    ops.custom_op:
      - text: value
  break: []
```

###default
The key `default` is a property of an [input](#/docs#inputs) name.
It is mapped to an expression value.

The expression's value will be passed to the [flow](#/docs#flow) or [operation](#/docs#operation) if no other value for that [input](#/docs#inputs) parameter is explicitly passed or if the input's [overridable](#/docs#overridable) parameter is set to `false` and there is no [system_properties](#/docs#system_properties) parameter defined.   

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

A default value can also be defined inline by entering it as the value to the [input](#/docs#inputs) parameter's key.

**Example - inline default values**
```yaml
inputs:
  - str_literal: "'default value'"
  - int_exp: '5 + 6'
  - from_variable: variable_name
```

###do
The key `do` is a property of a [task](#/docs#task) name or a [loop](#/docs#loop).
It is mapped to a property that references an [operation](#/docs#operation) or [flow](#/docs#flow).

Calls an [operation](#/docs#operation) or [flow](#/docs#flow) and passes in relevant [input](#/docs#inputs). The [input](#/docs#inputs) list may contain [input](#/docs#inputs) properties. The [operation](#/docs#operation) or [flow](#/docs#flow) is called by its qualified name using an alias created in the [imports](#/docs#imports) parameter.

**Example - call to a divide operation with inputs**
```yaml
do:
  ops.divide:
    - dividend: input1
    - divisor: input2
```

###flow
The key `flow` is mapped to the properties which make up the flow contents.

A flow is the basic executable unit of CloudSlang. A flow can run on its own or it can be used by another flow in the [do](#/docs#do) property of a [task](#/docs#task).


Property|Required|Default|Value Type|Description|More Info
---|---|---|---|---|---
`name`|yes|-|string|name of the flow|[name](#/docs#name)
`inputs`|no|-|list|inputs for the flow|[inputs](#/docs#inputs)
`workflow`|yes|-|map of tasks|container for set of tasks|[workflow](#/docs#workflow)
`outputs`|no|-|list|list of outputs|[outputs](#/docs#outputs)
`results`|no|(`SUCCESS`/`FAILURE`)|list|possible results of the flow|[results](#/docs#results)

**Example - a flow that performs a division of two numbers**

```yaml
flow:
  name: division_flow

  inputs:
    - input1
    - input2
  
  workflow:
    - divider:
        do:
          ops.divide:
            - dividend: input1
            - divisor: input2
        publish:
          - answer: quotient
        navigate:
          ILLEGAL: ILLEGAL
          SUCCESS: printer
    - printer:
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

###for
The key `for` is a property of a [loop](#/docs#loop).

A loop can iterate through a [list](#/docs#iterating-through-a-list) or a [map](#/docs#iterating-through-a-map).

The [iterative task](#/docs#iterative-task) will run once for each element in the list or key in the map. 

####Iterating through a list
When iterating through a list, the `for` key is mapped to an iteration variable followed by `in` followed by a list, an expression that evaluates to a list, or a comma delimited string.

**Example - loop that iterates through the values in a list**

```yaml
- print_values:
    loop:
      for: value in [1,2,3]
      do:
        ops.print:
          - text: value
```

**Example - loop that iterates through the values in a comma delimited string**

```yaml
- print_values:
    loop:
      for: value in "1,2,3"
      do:
        ops.print:
          - text: value
```

**Example - loop that iterates through the values returned from an expression**

```yaml
- print_values:
    loop:
      for: value in range(1,4)
      do:
        ops.print:
          - text: value
```

####Iterating through a map
When iterating through a map, the `for` key is mapped to iteration variables for the key and value followed by `in` followed by a map or an expression that evaluates to a map.

**Example - loop that iterates through the values returned from an expression**

```yaml
- print_values:
    loop:
      for: k, v in map
      do:
        ops.print2:
          - text1: k
          - text2: v
```

###fromInputs
May appear in the value of an [output](#doc#outputs) or [publish](#doc#publish).

Special syntax to refer to an [input](#/docs#inputs) parameter as opposed to another variable with the same name in a narrower scope.

**Example - output "input1" as it was passed in**

```yaml
outputs:
  - output1: fromInputs['input1']
```

**Example - usage in publish to refer to a variable in the flow's scope**

```yaml
publish:
  - total_cost: fromInputs['total_cost'] + cost
```

###imports
The key `imports` is mapped to the files to import as follows:  

+ key - alias 
+ value - namespace of file to be imported

Specifies the file's dependencies and the aliases they will be referenced by in the file.

**Example - import operations and sublflow into flow**
```yaml
imports:
  ops: examples.utils
  sub_flows: examples.subflows

flow:
  name: hello_flow

  workflow:
    - print_hi:
        do:
          ops.print:
            - text: "'Hi'"
```

###inputs
The key `inputs` is a property of a [flow](#/docs#flow) or [operation](#/docs#operation).
It is mapped to a list of input names. Each input name may in turn be mapped to its properties.   

Inputs are used to pass parameters to [flows](#/docs#flow) or [operations](#/docs#operation).

Input properties may also be used in the input list of a [task](#/docs#task). 

Property|Required|Default|Value Type|Description|More info
---|
`required`|no|true|boolean|is the input required|[required](#/docs#required)
`default`|no|-|expression|default value of the input|[default](#/docs#default)
`overridable`|no|true|boolean|if false, the default value always overrides values passed in|[overridable](#/docs#overridable)
`system_properties`|no|-|string|the name of a system property variable|[system_property](#/docs#system_property)

**Example - two inputs**

```yaml
inputs:
  - input1:
      default: "'default value'"
      overridable: false
  - input2
```

###loop
The key `loop` is a property of an [iterative task's](#/docs#iterative-task) name.
It is mapped to the [iterative task's](#/docs#iterative-task) properties.

For each value in the loop's list the `do` will run an [operation](#/docs#operation) or [subflow](#/docs#flow). If the returned result is in the `break` list, or if `break` does not appear and the returned result is `FAILURE`, or if the list has been exhausted, the task's navigation will run. 

Property|Required|Default|Value Type|Description|More Info
---|
`for`|yes|-|variable `in` list or key, value `in` map|iteration logic|[for](#/docs#for) 
`do`|yes|-|operation or subflow call|the operation or subflow this task will run iteratively|[do](#/docs#do) [operation](#/docs#operation) [flow](#/docs#flow)
`publish`|no|-|list of key:value pairs|operation outputs to aggregate and publish to the flow level|[publish](#/docs#publish) [outputs](#/docs#outputs)
`break`|no|-|list of [results](#/docs#result)|operation or subflow [results](#/docs#result) on which to break out of the loop|[break](#/docs#break)

**Example: loop that breaks on a result of custom**
```yaml
 - custom3:
	 loop:
	   for: value in "1,2,3,4,5"
	   do:
	     ops.custom3:
	       - text: value
	   break:
	     - CUSTOM
	 navigate:
	   CUSTOM: aggregate
	   SUCCESS: skip_this
```

###name
The key `name` is a property of [flow](#/docs#flow) and [operation](#/docs#operation).
It is mapped to a value that is used as the name of the [flow](#/docs#flow) or [operation](#/docs#operation).

The name of a [flow](#/docs#flow) or [operation](#/docs#operation) may be used when called from a [flow](#/docs#flow)'s [task](#/docs#task). 

**Example - naming the flow _division\_flow_**

```yaml
name: division_flow
```

###namespace
The key `namespace` is mapped to a string value that defines the file's namespace.

The namespace of a file  may be used by other CloudSlang files to [import](#/docs#imports) dependencies, such as a flow importing operations.

**Example - definition a namespace**

```yaml
namespace: examples.hello_world
```

**Example - using a namespace in an imports definition**
```yaml
imports:
  ops: examples.hello_world
```

###navigate
The key `navigate` is a property of a [task](#/docs#task) name.
It is mapped to key:value pairs where the key is the received [result](#/docs#results) and the value is the target [task](#/docs#task) or [flow](#doc/#flow) [result](#/docs#results).

Defines the navigation logic for a [standard task](#/docs#standard-task) or an [iterative task](#/docs#iterative-task). The flow will continue with the [task](#/docs#task) or [flow](#/docs#flow) [result](#/docs#results) whose value is mapped to the [result](#/docs#results) returned by the called [operation](#/docs#operation) or subflow. 

For a [standard task](#/docs#standard-task) the navigation logic runs when the [task](#/docs#task) is completed. For an [iterative task](#/docs#iterative-task) the navigation logic runs when the last iteration of the [task](#/docs#task) is completed or after exiting the iteration due to a [break](#/docs#break).


The default navigation is `SUCCESS` except for the [on_failure](#/docs#on_failure) [task](#/docs#task) whose default navigation is `FAILURE`. All possible [results](#/docs#results) returned by the called [operation](#/docs#operation) or subflow must be handled.

**Example - ILLEGAL result will navigate to flow's FAILURE result and SUCCESS result will navigate to task named _printer_**
```yaml
navigate:
  ILLEGAL: FAILURE
  SUCCESS: printer
```

###on_failure
The key `on_failure` is a property of a [workflow](#/docs#workflow).
It is mapped to a [task](#/docs#task).

Defines the [task](#/docs#task), which when using default [navigation](#/docs#navigation), is the target of a `FAILURE` [result](#/docs#result) returned from an [operation](#/docs#operations) or [flow](#docs/flow). The `on_failure` [task's](#/docs#task) [navigation](#/docs#navigate) defaults to `FAILURE`.

**Example - failure task which call a print operation to print an error message**
```yaml
- on_failure:
  - failure:
      do:
        ops.print:
          - text: error_msg
```

###operation
The key `operation` is mapped to the properties which make up the operation contents.

Property|Required|Default|Value Type|Description|More Info
---|
inputs|no|-|list|operation inputs|[inputs](#/docs#inputs)
action|yes|-|`python_script` or `java_action`|operation logic|[action](#/docs#action)
outputs|no|-|list|operation outputs|[outputs](#/docs#outputs)
results|no|`SUCCESS`|list|possible operation results|[results](#/docs#results)


**Example - operation that adds two inputs and outputs the answer**

```yaml
name: add
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

###outputs
The key `outputs` is a property of a [flow](#/docs#flow) or [operation](#/docs#operation).
It is mapped to a list of output variable names which may also contain expression values. Output expressions must evaluate to strings. 

Defines the parameters a  [flow](#/docs#flow) or [operation](#/docs#operation) exposes to possible [publication](#/docs#publish) by a [task](#/docs#task). The calling [task](#/docs#task) refers to an output by its name.

See also [fromInputs](#/docs#fromInputs).

**Example - various types of outputs**

```yaml
outputs:
  - existing_variable
  - output2: some_variable
  - output3: 5 + 6
  - output4: fromInputs['input1']
```


###overridable
The key `overridable` is a property of an [input](#/docs#inputs) name.
It is mapped to a boolean value.

A value of `false` will ensure that the [input](#/docs#inputs) parameter's [default](#/docs#default) value will not be overridden by values passed into the [flow](#/docs#flow) or [operation](#/docs#operation). If `overridable` is not defined, values passed in will override the [default](#/docs#default) value.

**Example - default value of text input parameter will not be overridden by values passed in**

```yaml
inputs:
  - text:
      default: "'default text'"
      overridable: false
```

###publish
The key `publish` is a property of a [task](#/docs#task) name or a [loop](#/docs#loop).
It is mapped to a list of key:value pairs where the key is the published variable name and the value is the name of the [output](#/docs#outputs) received from an [operation](#/docs#operation) or [flow](#/docs#flow).

Binds the [output](#/docs#outputs) from an [operation](#/docs#operation) or [flow](#/docs#flow) to a variable whose scope is the current [flow](#/docs#flow) and can therefore be used by other [tasks](#/docs#task) or as the [flow's](#/docs#flow) own [output](#/docs#outputs).

In an [iterative task](#/docs#iterative-task) the publish mechanism is run during each iteration after the [operation](#/docs#operation) or [subflow](#/docs#flow) has completed.

**Example - publish the quotient output as answer**
```yaml
publish:
  - answer: quotient
```

**Example - publishing in an iterative task to aggregate output**
```yaml
- aggregate:
    loop:
      for: value in range(1,6)
      do:
        ops.print:
          - text: value
      publish:
        - sum: fromInputs['sum'] + out
```

###results
The key `results` is a property of a [flow](#/docs#flow) or [operation](#/docs#operation).

The results of a [flow](#/docs#flow) or [operation](#/docs#operation) can be used by the calling [task](#/docs#task) for [navigation](#/docs#navigate) purposes.

####Flow results
In a [flow](#/docs#flow), the key `results` is mapped to a list of result names. 

Defines the possible results of the [flow](#/docs#flow). By default a [flow](#/docs#flow) has two results, `SUCCESS` and `FAILURE`.  The defaults can be overridden with any number of user-defined results. 

When overriding, the defaults are lost and must be redefined if they are to be used. 

All result possibilities must be listed. When being used as a subflow all [flow](#/docs#flow) results must be handled by the calling [task](#/docs#task). 

**Example - a user-defined result**

```yaml
results:
  - SUCCESS
  - ILLEGAL
  - FAILURE
```

####Operation results
In an [operation](#/docs#operation) the key `results` is mapped to a list of key:value pairs of result names and boolean expressions. 

Defines the possible results of the [operation](#/docs#operation). By default, if no results exist, the result is `SUCCESS`.  The first result in the list whose expression evaluates to true, or does not have an expression at all, will be passed back to the calling [task](#/docs#task) to be used for [navigation](#/docs#navigate) purposes.  

All [operation](#/docs#operation) results must be handled by the calling [task](#/docs#task). 

**Example - three user-defined results**
```yaml
results:
  - POSITIVE: polarity == '+'
  - NEGATIVE: polarity == '-'
  - NEUTRAL
```

###required
The key `required` is a property of an [input](#/docs#inputs) name.
It is mapped to a boolean value.

A value of `false` will allow the [flow](#/docs#flow) or [operation](#/docs#operation) to be called without passing the [input](#/docs#inputs) parameter. If `required` is not defined, the [input](#/docs#inputs) parameter defaults to being required. 

**Example - input2 is optional**

```yaml
inputs:
  - input1
  - input2:
      required: false
```

###system_property
The key `system_property` is a property of an [input](#/docs#inputs) name.
It is mapped to an string of a key from a system properties file.

The value referenced in the system properties file will be passed to the [flow](#/docs#flow) or [operation](#/docs#operation) if no other value for that [input](#/docs#inputs) parameter is explicitly passed in or if the input's [overridable](#/docs#overridable) parameter is set to `false`.  

Note: If multiple system properties files are being used and they contain a system property with the same fully qualified name, the property in the file that is loaded last will overwrite the others with the same name.  

**Example - default values **

```yaml
inputs:
  - host:
      system_property: examples.sysprops.hostname
  - port:
      system_property: examples.sysprops.port
```


###task
A name of a task which is a property of [workflow](#/docs#workflow) or [on_failure](#/docs#on_failure).

A task can either be a standard one or and iterative one.

####Standard Task
The task name is mapped to the task's properties.

Property|Required|Default|Value Type|Description|More Info
---|---
`do`|yes|-|operation or subflow call|the operation or subflow this task will run|[do](#/docs#do) [operation](#/docs#operation) [flow](#/docs#flow)
`publish`|no|-|list of key:value pairs|operation outputs to publish to the flow level|[publish](#/docs#publish) [outputs](#/docs#outputs)
`navigate`|no|`FAILURE`: on_failure or flow finish; `SUCCESS`: next task|key:value pairs| navigation logic from operation or flow results|[navigation](#/docs#navigate) [results](#/docs#results)

**Example - task that performs a division of two inputs, publishes the answer and navigates accordingly**

```yaml
- divider:
    do:
      ops.divide:
        - dividend: input1
        - divisor: input2
    publish:
      - answer: quotient
    navigate:
      ILLEGAL: FAILURE
      SUCCESS: printer
```

####Iterative Task
The task name is mapped to the iterative task's properties.

Property|Required|Default|Value Type|Description|More Info
---|---
`loop`|yes|-|key|container for loop properties|[for](#/docs#for)
`navigate`|no|`FAILURE`: on_failure or flow finish; `SUCCESS`: next task|key:value pairs| navigation logic from [break](#/docs#break) or the result of the last iteration of the operation or flow|[navigation](#/docs#navigate) [results](#/docs#results)

**Example - task prints all the values in value_list and the navigates to a task named "another_task"**

```yaml
- print_values:
    loop:
      for: value in value_list
      do:
        ops.print:
          - text: value
    navigate:
      SUCCESS: another_task
```

###workflow
The key `workflow` is a property of a [flow](#/docs#flow).
It is mapped to a list of the workflow's [tasks](#/docs#task).

Defines a container for the [tasks](#/docs#task), their [published variables](#/docs#publish) and [navigation](#/docs#navigate) logic.

The first [task](#/docs#task) in the workflow is the starting [task](#/docs#task) of the flow. From there the flow continues sequentially by default upon receiving [results](#/docs#results) of `SUCCESS`, to the flow finish or to [on_failure](#/docs#on_failure) upon a [result](#/docs#results) of `FAILURE`, or following whatever overriding [navigation](#/docs#navigate) logic that is present.

Propery|Required|Default|Value Type|Description|More Info
---|
`on_failure`|no|-|task|default navigation target for `FAILURE`|[on_failure](#/docs#on_failure) [task](#/docs#task)

**Example - workflow that divides two numbers and prints them out if the division was legal**

```yaml
workflow:
  - divider:
      do:
        ops.divide:
          - dividend: input1
          - divisor: input2
      publish:
        - answer: quotient
      navigate:
        ILLEGAL: FAILURE
        SUCCESS: printer
  - printer:
      do:
        ops.print:
          - text: input1 + "/" + input2 + " = " + answer
```

###Examples
The following simplified examples demonstrate some of the key CloudSlang concepts. Each of the examples below can be run by doing the following:

1. Create a new folder.
2. Create new CloudSlang(.sl) files and copy the code into them.
3. [Use the CLI](#/docs#use-the-cli) to run the flow. 

For more information on getting set up to run flows, see the [CloudSlang CLI](#/docs#cloudslang-cli) and [Hello World Example](#/docs#hello-world-example) sections.

####Example 1 - User-defined Navigation and Publishing Outputs
This example is a full working version from which many of the example snippets above have been taken. The flow takes in two inputs, divides them and prints the answer. In case of a division by zero, the flow does not print the output of the division, but instead ends with a user-defined result of `ILLEGAL`.

**Flow - division.sl**
```yaml
namespace: examples.divide

imports:
  ops: examples.divide

flow:
  name: division

  inputs:
    - input1
    - input2

  workflow:
    - divider:
        do:
          ops.divide:
            - dividend: input1
            - divisor: input2
        publish:
          - answer: quotient
        navigate:
          ILLEGAL: ILLEGAL
          SUCCESS: printer
    - printer:
        do:
          ops.print:
            - text: input1 + "/" + input2 + " = " + str(answer)
        navigate:
          SUCCESS: SUCCESS

  outputs:
    - quotient: answer

  results:
    - ILLEGAL
    - SUCCESS
```
**Operations - divide.sl**
```yaml
namespace: examples.divide

operation:
  name: divide
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
**Operation - print.sl**
```yaml
namespace: examples.divide

operation:
  name: print
  inputs:
    - text
  action:
    python_script: print text
  results:
    - SUCCESS
```

####Example 2 - Default Navigation
In this example the flow takes in two inputs, one of which determines the success of it's first task. 

+ If the first task succeeds, the flow continues with the default navigation sequentially by performing the next task. That task returns a default result of `SUCCESS` and therefore skips the `on_failure` task, ending the flow with a result of `SUCCESS`.
+ If the first task fails, the flow moves to the `on_failure` task by default navigation. When the `on_failure` task is done, the flow ends with a default result of `FAILURE`.

**Flow - nav_flow.sl**

```yaml
namespace: examples.defualtnav

imports:
  ops: examples.defualtnav

flow:
  name: nav_flow

  inputs:
    - navigation_type
    - email_recipient

  workflow:
    - produce_default_navigation:
        do:
          ops.produce_default_navigation:
            - navigation_type

    # default navigation - go to this task on success
    - do_something:
        do:
          ops.something:

    # default navigation - go to this task on failure
    - on_failure:
      - send_error_mail:
          do:
            ops.send_email_mock:
              - recipient: email_recipient
              - subject: "'Flow failure'"
```

**Operation - produce_default_navigation.sl**

```yaml
namespace: examples.defualtnav

operation:
  name: produce_default_navigation
  inputs:
    - navigation_type
  action:
    python_script:
      print 'Default navigation based on input of - ' + navigation_type
  results:
    - SUCCESS: navigation_type == 'success'
    - FAILURE
```

**Operation - something.sl**

```yaml
namespace: examples.defualtnav

operation:
  name: something
  action:
      python_script:
        print 'Doing something important'
```

**Operation - send_email_mock.sl**
```yaml
namespace: examples.defualtnav

operation:
  name: send_email_mock
  inputs:
    - recipient
    - subject
  action:
    python_script:
      print 'Email sent to ' + recipient + ' with subject - ' + subject
```

####Example3 - Subflow
This example uses the flow from **Example 1** as a subflow. It takes in four numbers (or uses default ones) to call `division_flow` twice. If either division returns the `ILLEGAL` result, navigation is routed to the `on_failure` task and the flow ends with a result of `FAILURE`. If both divisions are successful, the `on_failure` task is skipped and the flow ends with a result of `SUCCESS`.

Note: To run this flow, the files from **Example 1** should be placed in the same folder as this flow file or use the `--cp` flag at the command line.

**Flow - master_divider.sl**

```yaml
namespace: examples.divide

imports:
  ops: examples.divide

flow:
  name: master_divider

  inputs:
    - dividend1: "'3'"
    - divisor1: "'2'"
    - dividend2: "'1'"
    - divisor2: "'0'"

  workflow:
    - division1:
        do:
          ops.division:
            - input1: dividend1
            - input2: divisor1
        publish:
          - ans: quotient
        navigate:
          SUCCESS: division2
          ILLEGAL: failure_task

    - division2:
        do:
          ops.division:
            - input1: dividend2
            - input2: divisor2
        publish:
          - ans: quotient
        navigate:
          SUCCESS: SUCCESS
          ILLEGAL: failure_task
    - on_failure:
      - failure_task:
          do:
            ops.print:
              - text: ans
```

####Example 4 - Loops
This example demonstrates the different types of values that can be looped on and various methods for handling loop breaks. 

**Flow - loops.sl**

```yaml
namespace: examples.loops

imports:
  ops: examples.loops

flow:
  name: loops

  inputs:
    - sum:
        default: 0
        overridable: false

  workflow:
    - fail3a:
        loop:
          for: value in [1,2,3,4,5]
          do:
            ops.fail3:
              - text: value
        navigate:
          SUCCESS: fail3b
          FAILURE: fail3b
    - fail3b:
        loop:
          for: value in [1,2,3,4,5]
          do:
            ops.fail3:
              - text: value
          break: []
    - custom3:
        loop:
          for: value in "1,2,3,4,5"
          do:
            ops.custom3:
              - text: value
          break:
            - CUSTOM
        navigate:
          CUSTOM: aggregate
          SUCCESS: skip_this
    - skip_this:
        do:
          ops.print:
            - text: "'This will not run.'"
    - aggregate:
        loop:
          for: value in range(1,6)
          do:
            ops.print:
              - text: value
          publish:
            - sum: fromInputs['sum'] + out
    - print:
        do:
          ops.print:
            - text: sum
```

**Operation - custom3.sl**

```yaml
namespace: examples.loops

operation:
  name: custom3
  inputs:
    - text
  action:
    python_script: print text
  results:
    - CUSTOM: int(fromInputs['text']) == 3
    - SUCCESS
```

**Operation - fail3.sl**

```yaml
namespace: examples.loops

operation:
  name: fail3
  inputs:
    - text
  action:
    python_script: print text
  results:
    - FAILURE: int(fromInputs['text']) == 3
    - SUCCESS
```

**Operation - print.sl**
```yaml
namespace: examples.loops

operation:
  name: print
  inputs:
    - text
  action:
    python_script: print text
  outputs:
    - out: text
  results:
    - SUCCESS
```

##CloudSlang Best Practices
The following is a list of best practices for authoring CloudSlang files. Many of these best practices are checked when using the [CloudSlang Verifier](#/docs#cloudslang-verifier).

-	The namespace for a file matches the suffix of the file path in which the file resides.
    Example: The send\_mail operation is found in the **cloudslang-content/io/cloudslang/cloudslangs/base** folder. It uses the namespace `io.cloudslang.cloudslang.base.mail`.
- Namespaces should be comprised of only lowercase alphanumeric characters (a-z and 0-9), underscores (_), periods(.) and hyphens (-).
-	A flow or operation has the same name as the file it is in.
-	Each file has one flow or one operation. 
-	Flows and operations reside together in the same folders.
- Identifiers (flow names, operation names, input names, etc.) are written:
  -  In snake\_case, lowercase letters with underscores (\_)	between words, in all cases other than inputs to a Java @Action.
  - In camelCase, starting with a lowercase letter and each additional word starting with an uppercase letter appended without a delimiter, for inputs to a Java @Action. 
- Flow and operation files begin with a commented description and list of annotated inputs, outputs and results.
  - Optional parameters and default values are noted.

Note: In future releases some of the above best practices may be required by the CloudSlang compiler. 

**Example - commented description of operation to count occurrences of a string in another string**
```yaml
####################################################
# Counts the occurrences of a string in another string 
#
# Inputs:
#   - string_in_which_to_search - string where to search
#   - string_to_find - string to be found
#   - ignore_case - optional - ignores case if set to true - Default: true
# Outputs:
#   - occurrences - number of times string_to_find was found
# Results:
#   - SUCCESS - string_to_find is found at least once
#   - FAILURE - otherwise
####################################################
```

## CloudSlang Comments Style Guide

###Structure
The structure and spacing of the comments are as in the example below:
```
####################################################
# Does something fantastic.
#
# Prerequisites: some Python module
#
# Inputs:
#   - input1 - first input
#   - input2 - optional - port for something - Default: 8080
#   - list - a list of things - Format: comma delimited list of things
# Outputs:
#   - output1 - some sort of message
# Results:
#   - SUCCESS - everything went well
#   - FAILURE - otherwise 
####################################################
```

###Description

+ Written as a sentence, beginning with a capital letter and ending with a period.
+ Written in the present tense (e.g. "Prints text.").
+ Does not include "This flow" or "This operation" or anything similar.

###Prerequisites

+ Flows and operations that assume prerequisites include a prerequisite line beginning with "Prerequisites:", followed by a comma delimited list of prerequisites.

###Inputs, Outputs and Results
+ Fields appear in the same order as they appear in the code.
+ Description begins with a lowercase letter (unless a proper name or capitalized acronym) and does not end with a period.
+ Usage of the words "the" and "a" are strongly discouraged, especially at the beginning of the description.
+ Does not include "this flow", "this operation", "this field" or anything similar.
+ Proper names and acronyms that are normally capitalized are capitalized (e.g. HTTP, Docker, ID).

###Inputs and Outputs
+ Written in the present tense (e.g. "true if job exists").
+ Non-required fields contain the "optional" label.
+ Additional labels are "Default:", "Example:", "Valid:" and "Format:".

###Results
+ Actions written in the past tense (e.g. "error occurred") and states written in the present tense (e.g. "application is up").
+ Results are always included, even if just listing the default results without explanations. 

###Recurring Fields
+ Fields that appear often with the same meaning should have the same name and description across flows and operations. However, if the meaning is specific to the flow or operation, the field description may be different. Some examples are.
  + FAILURE - otherwise
  + error_message - error message if error occurred 
  + command - command to execute

##CloudSlang Verifier
The CloudSlang Verifier is a tool that checks the syntactic validity of CloudSlang files along with adherence to many of the [best practices](#/docs#cloudslang-best-practices). 

The CloudSlang Verifier can be downloaded from [here](https://github.com/cloudslang/cloudslang/releases).

To use the CloudSlang Verifier, run `java -jar cloudslang-content-verifier.jar <directory_path>`. The Verifier will recursively search the directory for CloudSlang files by extension and verify the validity of their syntax.

##CloudSlang CLI
There are several ways to get started with the CloudSlang CLI. 

###Download and Run Pre-built CLI
**Prerequisites :** To run the CloudSlang CLI, Java JRE version 7 or higher is required.

1. Go to the CloudSlang [website](/#/) and scroll to the **Getting Started** section.
2. Click **Download latest version**. 
3. Locate the downloaded file and unzip the archive.  
    The decompressed file contains:
    + a folder called **cloudslang** with the CLI tool and its necessary dependencies.
    + some other folders with ready-made content.
4. Navigate to the folder `cloudslang\bin\`.
5. Run the executable:
  - For Windows : `cloudslang.bat`.
  - For Linux : `bash cloudslang`.

###Download, Build and Run CLI
**Prerequisites :** To build the CloudSlang CLI, Java JDK version 7 or higher and Maven version 3.0.3 or higher are required.

1. Git clone (or GitHub fork and then clone) the [source code](https://github.com/cloudslang/cloudslang).
2. Using the Command Prompt, navigate to the project root directory.
3. Build the project by running `mvn clean install`.
4. After the build finishes, navigate to the `cloudslang\cloudslang\target\cloudslang\bin` folder.
5. Run the executable:
  - For Windows : `cloudslang.bat`.
  - For Linux : `bash cloudslang`.

###Download and Install npm Package
**Prerequisites :** To download the package, Node.js is required. To run the CloudSlang CLI, Java JRE version 7 or higher is required.

1. At a command prompt, enter `npm install -g cloudslang-cli`.
	+ If using Linux, the sudo command might be neccessary: `sudo npm install -g cloudslang-cli`. 
2. Enter the `cloudslang` command at any command prompt.

###Use the CLI

When a flow is run, the entire directory in which the flow resides is scanned recursively (including all subfolders) for files with a valid CloudSlang extension. All of the files found are compiled by the CLI. If the `--cp` flag is used, all of the directories listed there will be scanned and compiled recursively as well. 

The usage of forward slashes (`/`) in all file paths is recommended even on Windows.

####Run a Flow or Operation
To run a flow located at `c:/.../your_flow.sl`, enter the following at the `cslang>` prompt:
```bash
cslang>run --f c:/.../your_flow.sl
```

####Run a Flow with Inputs
If the flow takes in input parameters, use the `--i` flag and a comma-separated list of key=value pairs:
```bash
cslang>run --f c:/.../your_flow.sl --i input1=root,input2=25
```
Commas can be used as part of the input values by escaping them with a backslash (`\`).

Alternatively, inputs made be loaded from a file. Input files are written in flat [YAML](http://www.yaml.org), containing a map of names to values. Input files end with the .yaml  or .yml extensions. If multiple input files are being used and they contain an input with the same name, the input in the file that is loaded last will overwrite the others with the same name. 

**Example - inputs file**

```yaml
input: hello
input_list:
  - one
  - two
  - three
input_map:
  one: a
  two: b
  three: c
``` 

Input files can be loaded automatically if placed in a folder named `inputs` in the directory from which the CLI is run. If the flow requires an input file that is not loaded automatically, use the `--if` flag and a comma-separated list of file paths. Inputs passed with the `--i` flag will override the inputs passed using a file. 

```bash
cslang>run --f c:/.../your_flow.sl --if c:/.../inputs.yaml --i input1=value1
```

####Run a Flow with Dependencies 
If the flow requires dependencies from another location, use the `--cp` flag: 
```bash
cslang>run --f c:/.../your_flow.sl --i input1=root,input2=25 --cp c:/.../yaml
```

####Run a Flow with System Properties

System properties files are written in flat [YAML](http://www.yaml.org), containing a map of names to values. System property files end with the .yaml  or .yml extensions. If multiple system properties files are being used and they contain a system property with the same fully qualified name, the property in the file that is loaded last will overwrite the others with the same name. 

**Example - system properties file**

```yaml
examples.sysprops.hostname: smtp.somedomain.com
examples.sysprops.port: 587
``` 

System property files can be loaded automatically if placed in a folder named `properties` in the directory from which the CLI is run. If the flow requires a system properties file that is not loaded automatically, use the `--spf` flag and a comma-separated list of file paths. 

```bash
cslang>run --f c:/.../your_flow.sl --spf c:/.../yaml
```

####Run a Flow in Quiet Mode
Normally a flow's task names are printed to the screen as they are run. To disable the task names from being printed, use the `--q` flag.

```bash
cslang>run --f c:/.../your_flow.sl --q
```

####Run a Flow in Non-Interactive Mode
A flow can be run without first starting up the CLI using the non-interactive mode. 

From a shell prompt:
```bash
>cloudslang run --f c:/.../your_flow.sl
```


####Other Commands
Some of the available commands are:

+ `env --setAsync` - Sets the execution mode to be synchronous (`false`) or asynchronous (`true`). By default the execution mode is synchronous, meaning only one flow can run at a time. 

	```bash
	cslang>env --setAsync true
	```
+ `inputs` - Lists the inputs of a given flow.

	```bash
	cslang>inputs --f c:/.../your_flow.sl
	```

+ `slang --version` - Displays the version of **score** being used.

	```bash
	cslang>slang --version
	```

####Execution Log
The execution log is saved in the directory in which the CLI was started in a file named `execution.log`. The log file stores all the [events](#/docs#cloudslang-events) that have been fired, and therefore it allows for tracking a flow's execution.

####Help
To get a list of available commands, enter `help` at the CLI `cslang>` prompt. For further help, enter `help` and the name of the command.

##Sublime Integration

Although CloudSlang files can be composed in any text editor, using a modern code editor with support for YAML syntax highlighting is recommended. 

To ease the CloudSlang coding process you can use our Sublime Text snippets. 

###Download, Install and Configure Sublime Text for Windows:

1. Download and install [Sublime Text](http://www.sublimetext.com/).
2. Download the [cloudslang-sublime package](https://github.com/orius123/slang-sublime/releases/download/0.1.0/slang-sublime-0.1.0.sublime-package). 
3. Copy the downloaded package file into C:\Users\&lt;User&gt;\AppData\Roaming\Sublime Text 2\Installed Packages
4. Restart Sublime Text.
5. New files with the .sl extension will be recognized as CloudSlang files. For existing files you may have to change the language manually.

To use the templates start typing the template name and press enter when it appears on the screen. 

The following templates are provided:

Keyword|Description
---|---
slang|template for a CloudSlang file
flow|template for a flow
task|template for a task
operation|template for an operation
  
Note: Optional CloudSlang elements are marked as comments (begin with #).
