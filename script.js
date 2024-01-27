// TO-DO

// Add function for add
// Add function for substract
// Add function for multiply
// Add function for divide

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


// Assign event listeners to all numbers
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
            num2 = parseInt(input);
            result = operate(parseInt(num1), operator , num2);
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
        num2 = parseInt(input);
        if (isNaN(num2)) {
            num2 = num1;
        }
        displayHistory.innerText += ' ' + num2;
        result = operate(parseInt(num1), operator, num2);
        if (result === 'IMPOSSIBLE') displayZeroError();
        else displayResult.innerText = result;
    }
    // 
    else {
        result = operate(parseInt(num1), operator, parseInt(num2));
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
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            if (num2 === 0) return 'IMPOSSIBLE'
                // num1 = null;
                // num2 = null;
                // input = null;
                // history = null;
                // displayHistory.innerText = '';
                // displayResult.innerText = '';
                // zeroDisplay.innerText = 'Cannot divide by 0';
            
            return num1 / num2;
    }
}


// 1. User clicks a number
    // num is shown in the calculator's main display, and stored in variable (INPUT)
    // Numbers are added as user clicks, to display and to INPUT

// 2. User clicks an operator
    // INPUT is sent to HISTORY (history display), assigned to NUM1 and cleared. 
    // OPERATOR is assigned the value of whatever the user clicked

// 3. User clicks more numbers afterwards = repeat steps 1-2 ()

// 4. User clicks 'equals' button and OPERATE function is called. RESULT is displayed in the main display.

