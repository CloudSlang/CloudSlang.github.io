namespace: examples.async

operation:
  name: print_branch
  inputs:
     - ID
  action:
    python_script: |
        name = 'branch ' + str(ID)
        print 'Hello from ' + name
  outputs:
    - name
    - num: ID