const inputField = document.getElementById('inputField');
const buttons = document.querySelectorAll('button');
const equation = document.getElementById('equation');

const numbers = [];
const operators = [];
const isDecimalAdded = false;

let result = 0;

buttons.forEach(button => {
    button.addEventListener('click', e => {
        console.log(button.value);
        console.log(numbers.length);
        if(['+','-','X','/'].includes(button.value) && button.value !== undefined) {
            checkPrecedence(button.value);
            inputField.value = 0;
            equation.textContent += ` ${button.value} `;
            console.log('lol');
        }
        else {
            console.log('haha');
            if(Number(button.value) <= 0) return;

            if(inputField.value === '0') {
                inputField.value = button.value;
                equation.textContent += button.value;
                return;
            }

            inputField.value += button.value;
            equation.textContent += button.value;
            console.log(button.value);
        }
    });
});

function checkPrecedence(operator) {
    if(operators.length === 0) {
        operators.push(operator);
        numbers.push(Number(inputField.value));
        console.log(numbers);
        console.log(operators);
        return;
    }
    const lastOperator = operators[operators.length - 1];
    if(assignPrecedence(operator) > assignPrecedence(lastOperator)) {
        operators.push(operator);
        numbers.push(Number(inputField.value));
        console.log(numbers);
        console.log(operators);
        return;
    }
    numbers.push(Number(inputField.value));
    console.log(numbers);
    console.log(operators);
    calculate();

    operators.push(operator);
}

function assignPrecedence(operator) {
    if(operator === '/' || operator === 'X') return 2;
    if(operator === '+' || operator === '-') return 1;
}

function calculate() {
    while(operators.length) {
        const operator = operators.pop();
        const b = numbers.pop();
        const a = numbers.pop();

        switch(operator) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case 'X': result = a * b; break;
            case '/': result = a / b; break;
        }
        numbers.push(result);
    }
    console.log(`Temp Result: ${result}`);
}

function displayResult() {
    if(operators.length === 0) return;

    numbers.push(Number(inputField.value));
    calculate();

    inputField.value = result;
}

function clr() {
    numbers.length = 0;
    operators.length = 0;
    inputField.value = '0';
    equation.textContent = '>';
    console.log('Cleared');
    console.log(numbers);
}
function del() {
    numbers.pop();
    inputField.value = inputField.value.slice(0, -1); 
    equation.textContent = equation.textContent.slice(0, -1);
    console.log('Deleted');
    console.log(numbers);

    if(inputField.value === '') inputField.value = '0';
}

function special() {
    document.getElementById('calculator').style.visibility = 'hidden';
    document.body.style.background = "url('lebron.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
}
function normal() {
    inputField.value = '67!';
}