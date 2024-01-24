// TO-DO

// Add function for add
// Add function for substract
// Add function for multiply
// Add function for divide

let num1 = null;
let operator = null;
let num2 = null;
let input = null;
let history = null;
let displayResult = document.querySelector('.display-result')
let numButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelectorAll('.operator');
let equalButton = document.querySelector('.equals')

// Assign event listeners to all numbers
numButtons.forEach((button) => {
    button.addEventListener('click', () => {
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
        operator = button.innerText;
        if (num1 === null) {
            num1 = input;
        }
        else {
            num2 = input;
        }
        input = null;

    })
})

equalButton.addEventListener('click', () => {
    if (num1 === null && input != null) {
        console.log(input);
    }
    else if (num2 === null) {
        console.log(operate(parseInt(num1), operator, parseInt(input)))
        
    }
    else {
        console.log(operate(parseInt(num1), operator, parseInt(num2)));
    }
})

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            if (num2 === 0) return 'Cannot divide by 0'
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

