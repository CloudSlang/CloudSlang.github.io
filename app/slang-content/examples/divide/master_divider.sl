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
          division:
            - input1: dividend1
            - input2: divisor1
        publish:
          - ans: quotient
        navigate:
          SUCCESS: division2
          ILLEGAL: failure_task

    - division2:
        do:
          division:
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
            print:
              - text: ans