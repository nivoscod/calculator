function DisplayNextState(jsonState, input) {
   let display = !jsonState ? '' : jsonState.display;
   let firstOperand = !jsonState ? '' : jsonState.firstOperand;
   let operator = !jsonState ? '' : jsonState.operator;
   let secondOperand = !jsonState ? '' : jsonState.secondOperand;
    let isNumber = !['+', '-', '/', '*', '='].includes(input)
    let currentState = {
        display: display,
        firstOperand: firstOperand,
        operator: operator,
        secondOperand: secondOperand
    }

    if (isNumber) {
        if (!operator) currentState.display += input
        if (operator && secondOperand) {
            currentState.secondOperand += input
            currentState.display = currentState.secondOperand
        }
        if (operator && !secondOperand) {
            currentState.firstOperand = display
            currentState.secondOperand += input
            currentState.display = currentState.secondOperand
        }
        if (operator === '=') {
            currentState.display = input
            currentState.firstOperand = input
            currentState.secondOperand = ''
            currentState.operator = ''
        }
    }
    else {
        if (!operator || (operator && !secondOperand)) currentState.operator = input
        if (operator && secondOperand) {
            let result = performCalculation(currentState)
            currentState.display = result
            currentState.firstOperand = result
            currentState.secondOperand = ''
            currentState.operator = input
        }
    }

    if (currentState.display === '') currentState.display = '0'
    return currentState
}

function performCalculation(jsonState) {
    switch (jsonState.operator) {
        case '/':
            return !jsonState.secondOperand ? parseInt(jsonState.firstOperand) / parseInt(jsonState.secondOperand) : 'cant divide by 0'
        case '*':
            return parseInt(jsonState.firstOperand) * parseInt(jsonState.secondOperand)
        case '+':
            return parseInt(jsonState.firstOperand) + parseInt(jsonState.secondOperand)
        case '-':
            return parseInt(jsonState.firstOperand) - parseInt(jsonState.secondOperand)
        case '=':
            return parseInt(jsonState.firstOperand) + parseInt(jsonState.secondOperand)
    }
}

let s = null
s = DisplayNextState(s, '-')
console.log(s.display)
s = DisplayNextState(s, '2')
console.log(s.display)
s = DisplayNextState(s, '+')
console.log(s.display)
s = DisplayNextState(s, '2')
console.log(s.display)
s = DisplayNextState(s, '-')
console.log(s.display)
s = DisplayNextState(s, '4')
console.log(s.display)
s = DisplayNextState(s, '-')
console.log(s.display)
s = DisplayNextState(s, '2')
console.log(s.display)
s = DisplayNextState(s, '-')
console.log(s.display)