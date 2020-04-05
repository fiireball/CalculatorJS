function add(num1, num2){
    return parseFloat(num1) + parseFloat(num2)
}

function subtract(num1, num2){
    return parseFloat(num1) - parseFloat(num2)
}

function multiply(num1, num2){
    return parseFloat(num1) * parseFloat(num2)
}

function devide(num1, num2){
    if (num2 == 0) {
        clearAll()
        return "ERROR - Can't devide by zero"
    } 
    return parseFloat(num1) / parseFloat(num2)
}

function operate(operator, num1, num2){
    switch (operator) {
        case "add":
            return add(num1, num2)
            break;
        case "subtract":
            return subtract(num1, num2)
            break;
        case "multiply":
            return multiply(num1, num2)
            break;
        case "devide":
            return devide(num1, num2)
            break;
        default:
            console.warn("I did an oopsie.")
            break;
    }
}


let displayValue = "0";
let firstValue;
let secondValue;
let operator;
let previousKeyType;
let didCalculation = false;

const calculator = document.querySelector('.container-calc')
const buttons = document.querySelectorAll('button')
const display = document.querySelector('#display-main')
const calcButtons = document.querySelector('.calc-buttons')


      



buttons.forEach(button => {

    const key = button.textContent
    const action = button.dataset.action
    

    if (!action) {
        button.addEventListener('click', e => {
            console.log('number key ' + key)
            if (displayValue === "0" || previousKeyType === "operator" || previousKeyType === "equals") {
                displayValue = key
            } else {
                displayValue += key
            }
            display.textContent = displayValue
            previousKeyType = 'number'
            removeDepressed()
        });
        
    } else if (action === "add" || action === "subtract" || action === "multiply" || action === "devide") {
        button.addEventListener('click', e => {
            console.log('operator')
            if (!!firstValue && secondValue != displayValue && previousKeyType != "equals") {   // for stringing multiple operations together
                secondValue = displayValue;                                                     // but not if previous action was "equals"
                displayValue = operate(operator, firstValue, secondValue)                       // otherwise hitting an operator after "equals"
                display.textContent = displayValue                                              // performs another unwanted calculation
                firstValue = displayValue
                operator = action;
            } else {
                firstValue = displayValue;
                operator = action;
            }
            previousKeyType = 'operator';
            removeDepressed()
            button.classList.add('is-depressed');
        });
    } else if (action === "clear") {
        button.addEventListener('click', e => {
            console.log('clear button')
            clearAll()
            removeDepressed()
            previousKeyType = 'clear';
        });
    } else if (action === "backspace") {
        button.addEventListener('click', e => {
            console.log('backspace button')
            previousKeyType = 'backspace'
        });
    } else if (action === "decimal") {
        button.addEventListener('click', e => {
            console.log('decimal button')
            if (!displayValue.includes(".")) {
               displayValue += '.';
               display.textContent = displayValue;
            }
            
            previousKeyType = 'decimal'
        });
    } else if (action === "equals")
        button.addEventListener('click', e => {
            if (previousKeyType === "equals") {
                firstValue = displayValue
                displayValue = operate(operator, firstValue, secondValue)
                display.textContent = displayValue
            } else if (!operator && !firstValue) {
                console.warn("Error - missing operator or operand")
            } else {
                console.log('equals button')
                secondValue = displayValue;
                displayValue = operate(operator, firstValue, secondValue)
                display.textContent = displayValue
                previousKeyType = 'equals'
            }
    });
});

function clearAll() {
    displayValue = "0"
    firstValue = null
    secondValue = null
    display.textContent = displayValue
}

function removeDepressed() {
    Array.from(calcButtons.children).forEach(k => k.classList.remove('is-depressed'))
}

