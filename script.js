let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let memory = 0;
let operators = ['+', '-', '*', '/', '%'];

Array.from(buttons).forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        if (value === '=') {
            try {
                if (string.includes('/0')) {
                    input.value = "Error";
                } else {
                    string = evaluateExpression(string);
                    input.value = string;
                }
            } catch (error) {
                input.value = "Error";
            }
        } else if (value === 'AC') {
            string = "";
            input.value = string;
        } else if (value === 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else if (value === '√') {
            string = Math.sqrt(parseFloat(string)).toString();
            input.value = string;
        } else if (value === 'M+') {
            memory += parseFloat(input.value);
        } else if (value === 'M-') {
            memory -= parseFloat(input.value);
        } else if (value === 'MR') {
            input.value = memory.toString();
            string = memory.toString();
        } else if (value === 'MC') {
            memory = 0;
        } else {
            if (operators.includes(value) && operators.includes(string[string.length - 1])) {
                return;
            } else {
                string += value;
                input.value = string;
            }
        }
    });
});

function evaluateExpression(exp) {
    return Function(`"use strict"; return (${exp})`)();
}
