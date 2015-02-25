namespace: examples.hello_world

imports:
  ops: examples.hello_world

flow:
  name: hello_world
  workflow:
    sayHi:
      do:
        ops.print:
          - text: "'Hello, World'"