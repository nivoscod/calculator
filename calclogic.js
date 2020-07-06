function DisplayNextState(jsonState, input) {
   let display = !jsonState ? '' : JSON.parse(jsonState)['display']
   let firstOperand = !jsonState ? '' : JSON.parse(jsonState)['firstOperand'];
   let operator = !jsonState ? '' : JSON.parse(jsonState)['operator'];
   let secondOperand = !jsonState ? '' : JSON.parse(jsonState)['secondOperand'];
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
            let result = String(performCalculation(currentState))
            currentState.display = result
            currentState.firstOperand = result
            currentState.secondOperand = ''
            currentState.operator = input
        }
    }

    if (currentState.display === '') currentState.display = '0'
    return JSON.stringify(currentState)
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

// let s = null
// s = DisplayNextState(s, '-')
// console.log(JSON.parse(s).display)
// s = DisplayNextState(s, '2')
// console.log(JSON.parse(s).display)
// s = DisplayNextState(s, '+')
// console.log(JSON.parse(s).display)
// s = DisplayNextState(s, '1')
// console.log(JSON.parse(s).display)
// s = DisplayNextState(s, '2')
// console.log(JSON.parse(s).display)
// s = DisplayNextState(s, '+')
// console.log(JSON.parse(s).display)
module.exports ={
    DisplayNextState
}