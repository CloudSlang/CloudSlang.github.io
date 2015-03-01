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