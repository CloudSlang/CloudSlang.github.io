namespace: examples.defualtnav

imports:
  ops: examples.defualtnav

flow:
  name: nav_flow

  inputs:
    - navigation_type
    - email_recipient

  workflow:
    -  produce_default_navigation:
        do:
          ops.produce_default_navigation:
            - navigation_type

    # default navigation - go to this task on success
    - do_something:
        do:
          ops.something:

    # default navigation - go to this task on failure
    - on_failure:
      - send_error_mail:
          do:
            ops.send_email_mock:
              - recipient: email_recipient
              - subject: "'Flow failure'"