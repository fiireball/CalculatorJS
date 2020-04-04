function add(num1, num2){
    return num1 + num2
}

function subtract(num1, num2){
    return num1 - num2
}

function multiply(num1, num2){
    return num1 * num2
}

function devide(num1, num2){
    if (num2 == 0) {
        return "ERROR - Can't devide by zero"
    } 
    return num1 / num2
}

function operate(operator, num1, num2){
    switch (operator) {
        case "+":
            return add(num1, num2)
            break;
        case "-":
            return subtract(num1, num2)
            break;
        case "*":
            return multiply(num1, num2)
            break;
        case "/":
            return devide(num1, num2)
            break;
        default:
            console.warn("I did an oopsie.")
            break;
    }
}

const equalsFunc = () => {
    if ((operandOne === "" || operandTwo === "") && displayField.textContent.indexOf(operator) !== -1) {
        operandOne = parseFloat(displayField.textContent.slice(0, displayField.textContent.indexOf(operator)-1))
        operandTwo = parseFloat(displayField.textContent.slice(displayField.textContent.indexOf(operator)+2))
    } else if (displayField.textContent.search(/\d+ [-+*\/] \d+/g) !== -1) {
        operandOne = parseFloat(displayField.textContent.slice(0, displayField.textContent.indexOf(operator)-1))
        operandTwo = parseFloat(displayField.textContent.slice(displayField.textContent.indexOf(operator)+2))
    } else if (displayField.textContent.indexOf(operator) !== -1){
        operandOne = parseFloat(displayField.textContent.slice(0, displayField.textContent.indexOf(operator)-1))
        operandTwo = parseFloat(displayField.textContent.slice(displayField.textContent.indexOf(operator)+2))
    }
    if (operandOne === "" || operandTwo === "") {
        console.warn("ERROR - missing operand")
    } else {
        displayField.textContent = `${operate(operator, operandOne, operandTwo)}`;
        operandOne = operate(operator, operandOne, operandTwo);
        didCalculation = true;
    }
}

const checkOperatorAndPaste = () => {
    didCalculation = false;
    if (displayField.textContent.search(/[-+*\/]/g) === -1 || displayField.textContent[0] === "-") {
        displayField.textContent += ` ${operator} `
    } else if (displayField.textContent.search(/[-+*\/]/g) === '/[-+*\/]/g') {
        console.log('Oh-oh...')
        displayField.textContent += operandTwo;
    } else {
    displayField.textContent = displayField.textContent.replace(/[-+*\/]/g, `${operator}`)
    }
}

const clearAll = () => {
    displayField.textContent = '';
    operandOne = "";
    operandTwo = "";
    operatorObj = {};
}


const displayField = document.querySelector('#output-input-para')

const numberButtons = document.querySelectorAll('.numbered-button')

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (didCalculation) {
            clearAll();
            didCalculation = false;
        }
        displayField.textContent += button.textContent       
    })
})

let operandOne = "";
let operandTwo = "";
let operator = "";
let didCalculation = false;

const buttonAdd = document.querySelector('#add')
const buttonSubtract = document.querySelector('#subtract')
const buttonMultiply = document.querySelector('#multiply')
const buttonDevide = document.querySelector('#devide')
const buttonEquals = document.querySelector('#equals')
const buttonBackspace = document.querySelector('#backspace')
const buttonClear = document.querySelector('#clear')
const buttonDecimal = document.querySelector('#decimal')

buttonAdd.addEventListener('click', () => {
    if (displayField.textContent.indexOf(operator) !== -1 && (displayField.textContent.search(/\d+ [-+*\/] \d+/g) !== -1)) {
        equalsFunc()
    }
    operator = '+'
    checkOperatorAndPaste()
}) 

displayField.textContent.search(/\d+ [-+*\/] \d+/g) !== -1

buttonSubtract.addEventListener('click', () => {
    if (displayField.textContent.indexOf(operator) !== -1 && (displayField.textContent.search(/\d+ [-+*\/] \d+/g) !== -1)) {
        equalsFunc()
    }
    operator = '-'
    checkOperatorAndPaste()
})

buttonMultiply.addEventListener('click', () => {
    if (displayField.textContent.indexOf(operator) !== -1 && (displayField.textContent.search(/\d+ [-+*\/] \d+/g) !== -1)) {
        equalsFunc()
    }
    operator = '*'
    checkOperatorAndPaste()
})

buttonDevide.addEventListener('click', () => {
    if (displayField.textContent.indexOf(operator) !== -1 && (displayField.textContent.search(/\d+ [-+*\/] \d+/g) !== -1)) {
        equalsFunc()
    }
    operator = '/'
    checkOperatorAndPaste()
})

buttonBackspace.addEventListener('click', () => {
    displayField.textContent = displayField.textContent.slice(0, -1)
})

buttonClear.addEventListener('click', () => clearAll())



buttonEquals.addEventListener('click', () => equalsFunc())


