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