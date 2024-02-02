// TO-DO
// FIX BUG: 20+20=40; upon pressing a number more than once clears it (LOGIC IS INCORRECT: solution: check history for an operator)

let num1 = null;
let operator = null;
let num2 = null;
let result = null;
let input = null;
let displayResult = document.querySelector('.display-result');
let displayHistory = document.querySelector('.display-history');
let numButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let equalButton = document.querySelector('.equals');
let clearButton = document.querySelector('.clear');
let deleteButton = document.querySelector('.delete');
let zeroDisplay = document.querySelector('.zero-division-message');
let decimalButton = document.querySelector('.decimal');
let percentButton = document.querySelector('.percent')


numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        displayNumber(button.innerText);
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        applyOperator(button.innerText);
    })
})

equalButton.addEventListener('click', () => {
    applyEqual();
})

clearButton.addEventListener('click', () => {
    applyClear();
})

deleteButton.addEventListener('click', () => {
    applyDelete();
})

decimalButton.addEventListener('click', () => {
    applyDecimal();
})

percentButton.addEventListener('click', () => {
    if (input && result === null) {
        input = (parseFloat(input) * .01).toFixed(2); // Fixes incorrect JS math with floats, where 82*.01 = .820000001
        displayResult.innerText = input;
    }
})

function displayZeroError() {
    num1 = null;
    num2 = null;
    input = null;
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
        case '*':
            return Math.round((num1 * num2) * 10000000000000) / 10000000000000; 
        case '/':
            if (num2 === 0) return 'IMPOSSIBLE';            
            return Math.round((num1 / num2) * 10000000000000) / 10000000000000;
    }
}


// Fix CSS styling when display is empty but history is not
let display = document.querySelector('.display');

function historyDisplayFix() {
    if (displayResult.innerText.length == 0 && displayHistory.innerText.length != 0) {
        display.classList.remove('column');
    }
    else {
        display.classList.add('column');
    }
}

// Sometimes historyDisplayFix() does not update in time, even if check for 'input' is added. 
// It was necessary to add below to 'numButton' click event to ensure this gets added even before 'input' is loaded 
function addColumn() {
    display.classList.add('column');
}

// ADD KEYBOARD SUPPORT
document.body.addEventListener('keydown', (ev) => {
    key = ev.key;

    if (key >= 0 && key <= 9) {
        displayNumber(key);
    }
    else if (key == '/' || key == '*' || key == '-' || key == '+') {
        applyOperator(key);
    }
    else if (key == '.' || key == ',') {
        applyDecimal();
    }
    else if (key == 'Enter') {
        ev.preventDefault(); // Prevents 'Enter' key from triggering previously pressed/highlighted key
        applyEqual();
    }
    else if (key == 'Delete' || key == 'Backspace') { // NOTE: these do NOT work with 'keypress', only 'keydown'
        console.log(key)
        applyDelete();
    }
    else if (key == 'Escape') {
        applyClear();
    }
    
})

function displayNumber(number) {
    addColumn();
    if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = '';

    if (input === null) {
        input = number;
    }
    else if (input != null && result != null) { // Prevents user from adding numbers to result; starts fresh
        input = number;
        num1 = null;
        num2 = null;
        result = null;
        displayHistory.innerText = '';
    }
    else {
        input += number;
    }
    displayResult.innerText = input;   
}

function applyOperator(op) {
        if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = ''; // If 'cannot divide by 0' message is showing, delete it
        else if (num1 === null && input != null) {
            num1 = input;
            operator = op;
            displayHistory.innerText = input + ' ' + operator;
        }
        else if (input != null) {
            num2 = parseFloat(input);
            result = operate(parseFloat(num1), operator , num2);
            if (result === 'IMPOSSIBLE') displayZeroError();
            else {
                displayResult.innerText = result;  
                num1 = result;
                num2 = null;
                operator = op;
                displayHistory.innerText = result + ' ' + operator;
            }
        }

        input = null;

}

function applyEqual() {
    if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = ''; // If 'cannot divide by 0' message is showing, delete it
    else if (num1 === null) { 
        if (input === null) displayResult.innerText = ' ';
        else displayResult.innerText = input;
    }
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
    else {
        result = operate(parseFloat(num1), operator, parseFloat(num2));
        if (result === 'IMPOSSIBLE') displayZeroError();
        else displayResult.innerText = result;
    }

}

function applyDecimal() {
    if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = '';
    
    if (input === null && result === null) {
        input = '0.';
        displayResult.innerText = input;
    }
    else if (input != null && result != null) { // Prevents user from adding decimal to result; starts fresh
        input = '0.';
        num1 = null;
        num2 = null;
        result = null;
        displayHistory.innerText = '';
        displayResult.innerText = input;
    }
    else if (input.indexOf('.') == -1 && result === null) { // Prevent user from adding multiple decimals in one number
        input += '.';
        displayResult.innerText = input;
    }

}

function applyDelete() {
    if (result) {
        if (result) {
            result = parseFloat(result.toString().slice(0, -1));
            if (isNaN(result)) result = 0;
            displayResult.innerText = result;
            num1 = null;
            input = result;
            num2 = null;
        }
        historyDisplayFix();
    }
    else if (input) {
        input = input.toString().slice(0, -1);
        displayResult.innerText = input;
        historyDisplayFix();
    }

}

function applyClear() {
    num1 = null;
    num2 = null;
    input = null;
    history = null;
    result = null;
    displayResult.innerText = '';
    displayHistory.innerText = '';
    zeroDisplay.innerText = '';

}

