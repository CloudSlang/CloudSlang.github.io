namespace: user.examples.hello_world

imports:
  ops: user.examples.hello_world

flow:
  name: hello_world
  workflow:
    - sayHi:
        do:
          ops.print:
            - text: "'Hello, World'"
