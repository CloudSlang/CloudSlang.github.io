#Developer (Contributer) Guide
##score - Architecture Overview
##score - Design Overview
##score - Execution

score is a workflow engine and can execute workflows or Execution Plans.
**Execution** Plan An execution plan as the name implies, is a set of steps for score to run. In order to trigger an execution you need to pass the execution plan to score. The execution plan consists mainly of a set of steps to perform. These steps are called Execution Steps. Each execution step has a position within the execution plan – the position of the first step in the execution plan is usually zero.
If we were to draw an execution plan it might look something like this:


**Control Action** So what is a control action? And a navigation action? Well, they are both java methods. Score invokes these methods by reflection so there is no API or naming convention for them. There are some recommendations and reserved argument names, we’ll get to that later. In the diagram above we have three control actions – One that checks if a file exists, another that writes a message to the standard output and a third one that creates files. A control action method can have input arguments and they will be Injected by the score engine. There are several methods by which score can populate arguments:
+ 1.	From the execution context.
+ 2.	From values set during the creation of the execution plan.

#How to contribute code

TBD - instructions for code contribution