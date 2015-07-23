namespace: examples.async

flow:
  name: async_loop_aggregate
  inputs:
    - values: [1,2,3,4]
  workflow:
    - print_values:
        async_loop:
          for: value in values
          do:
            print_branch:
              - ID: value
          publish:
            - name
            - num
        aggregate:
            - name_list: map(lambda x:str(x['name']), branches_context)
            - first_name: branches_context[0]['name']
            - last_name: branches_context[-1]['name']
            - total: sum(map(lambda x:x['num'], branches_context))
  outputs:
    - name_list
    - first_name
    - last_name
    - total