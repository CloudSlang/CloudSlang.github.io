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