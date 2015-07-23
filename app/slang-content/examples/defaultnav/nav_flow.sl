namespace: examples.defualtnav

flow:
  name: nav_flow

  inputs:
    - navigation_type
    - email_recipient

  workflow:
    -  produce_default_navigation:
        do:
          produce_default_navigation:
            - navigation_type

    # default navigation - go to this task on success
    - do_something:
        do:
          something:

    # default navigation - go to this task on failure
    - on_failure:
      - send_error_mail:
          do:
            send_email_mock:
              - recipient: email_recipient
              - subject: "'Flow failure'"