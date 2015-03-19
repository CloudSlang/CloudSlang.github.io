namespace: examples.defualtnav

operation:
  name: send_email_mock
  inputs:
    - recipient
    - subject
  action:
    python_script:
      print 'Email sent to ' + recipient + ' with subject - ' + subject