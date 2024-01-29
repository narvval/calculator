// TO-DO
// Add title / styling to whole page

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
let deleteButton = document.querySelector('.delete');
let zeroDisplay = document.querySelector('.zero-division-message');
let decimalButton = document.querySelector('.decimal');
let percentButton = document.querySelector('.percent')

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        addColumn();
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
        if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = ''; // If 'cannot divide by 0' message is showing, delete it
        else if (num1 === null && input != null) {
            num1 = input;
            operator = button.innerText;
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
                operator = button.innerText;
                displayHistory.innerText = result + ' ' + operator;
            }
        }

        input = null;

    })
})

equalButton.addEventListener('click', () => {
    if (zeroDisplay.innerText.length != 0) zeroDisplay.innerText = ''; // If 'cannot divide by 0' message is showing, delete it
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
    result = null;
    displayResult.innerText = '';
    displayHistory.innerText = '';
    zeroDisplay.innerText = '';
})

deleteButton.addEventListener('click', () => {
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
        input = input.slice(0, -1);
        displayResult.innerText = input;
        historyDisplayFix();
    }
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

percentButton.addEventListener('click', () => {
    if (input) {
        input = parseFloat(input) * .01;
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
