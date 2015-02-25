namespace: examples.divide

operation:
  name: divide
  inputs:
    - dividend
    - divisor
  action:
    python_script: |
      if divisor == '0':
        quotient = 'division by zero error'
      else:
        quotient = float(dividend) / float(divisor)
  outputs:
    - quotient
  results:
    - ILLEGAL: quotient == 'division by zero error'
    - SUCCESS