namespace: user.examples.hello_world

operations:
  - print:
    inputs:
      - text
    action:
      python_script: print text
    results:
      - SUCCESS
