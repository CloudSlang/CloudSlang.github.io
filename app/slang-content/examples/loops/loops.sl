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