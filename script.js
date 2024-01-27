let num1 = null;
let operator = null;
let num2 = null;
let result = null;
let input = null;
let history = null;
let displayResult = document.querySelector('.display-result');
let displayHistory = document.querySelector('.display-history');
let numButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let equalButton = document.querySelector('.equals');
let clearButton = document.querySelector('.clear');
let zeroDisplay = document.querySelector('.zero-division-message');
let decimalButton = document.querySelector('.decimal')

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = '';
        if (input === null) {
            input = button.innerText;
        }
        else {
            input += button.innerText;
        }
        displayResult.innerText = input;
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = '';
        else if (num1 === null && input != null) {
            num1 = input;
            operator = button.innerText;
            displayHistory.innerText = input + ' ' + operator;
        }
        else {
            num2 = parseFloat(input);
            result = operate(parseFloat(num1), operator , num2);
            if (result === 'IMPOSSIBLE') displayZeroError();
            else {
                displayResult.innerText = result;  
                num1 = result;
                num2 = null;
                operator = button.innerText;
                displayHistory.innerText = result + ' ' + operator;
            }
        }

        input = null;

    })
})

equalButton.addEventListener('click', () => {
    // If equals is clicked and no input has been received, do nothing
    if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = '';
    else if (num1 === null) { 
        if (input === null) displayResult.innerText = ' ';
        else displayResult.innerText = input;
    }
    // 
    else if (num2 === null) {
        num2 = parseFloat(input);
        if (isNaN(num2)) {
            num2 = num1;
        }
        displayHistory.innerText += ' ' + num2;
        result = operate(parseFloat(num1), operator, num2);
        if (result === 'IMPOSSIBLE') displayZeroError();
        else displayResult.innerText = result;
    }
    // 
    else {
        result = operate(parseFloat(num1), operator, parseFloat(num2));
        if (result === 'IMPOSSIBLE') displayZeroError();
        else displayResult.innerText = result;
    }
})

clearButton.addEventListener('click', () => {
    num1 = null;
    num2 = null;
    input = null;
    history = null;
    displayResult.innerText = '';
    displayHistory.innerText = '';
    zeroDisplay.innerText = '';
})

decimalButton.addEventListener('click', () => {
    if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = '';
    
    if (input === null) {
        input = '0.';
        displayResult.innerText = input;
    }
    else if (input.indexOf('.') == -1) { // Prevent user from adding multiple decimals in one number
        input += '.';
        displayResult.innerText = input;
    }
})

function displayZeroError() {
    num1 = null;
    num2 = null;
    input = null;
    history = null;
    result = null;
    displayHistory.innerText = '';
    displayResult.innerText = '';
    zeroDisplay.innerText = 'Cannot divide by 0';
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return Math.round((num1 + num2) * 10000000000000) / 10000000000000;
        case '-':
            return Math.round((num1 - num2) * 10000000000000) / 10000000000000;
        case 'x':
            return Math.round((num1 * num2) * 10000000000000) / 10000000000000; 
        case '/':
            if (num2 === 0) return 'IMPOSSIBLE';            
            return Math.round((num1 / num2) * 10000000000000) / 10000000000000;
    }
}
