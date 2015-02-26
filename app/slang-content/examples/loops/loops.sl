namespace: examples.loops

imports:
  ops: examples.loops

flow:
  name: loops

  workflow:
    - fail3a:
        loop:
          for: value in [1,2,3,4,5]
          do:
            ops.fail3:
              - text: value
          break: []
    - custom3:
        loop:
          for: value in range(1,6)
          do:
            ops.custom3:
              - text: value
          break:
            - CUSTOM
        navigate:
          CUSTOM: fail3b
    - skip_this:
        do:
          ops.print:
            - text: "'This will not run.'"
    - fail3b:
        loop:
          for: value in "1,2,3,4,5"
          do:
            ops.fail3:
              - text: value