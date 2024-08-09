// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.screen');
    const keys = document.querySelector('.keys');

    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let resultDisplayed = false;

    // Function to update the screen with the full expression
    const updateScreen = () => {
        screen.value = `${previousInput} ${operator} ${currentInput}`;
    };

    // Function to perform calculations
    const calculate = () => {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = current === 0 ? 'Error' : prev / current;
                break;
            default:
                return;
        }

        currentInput = computation.toString();
        operator = '';
        previousInput = '';
    };

    // Event listener for button clicks
    keys.addEventListener('click', (e) => {
        const target = e.target;

        if (!target.matches('button')) return;

        const value = target.value;

        // If AC (Clear) button is pressed
        if (target.classList.contains('clear')) {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateScreen();
            return;
        }

        // If operator button is pressed
        if (target.classList.contains('operator')) {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            } else {
                resultDisplayed = false;
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            updateScreen();
            return;
        }

        // If equal button is pressed
        if (target.classList.contains('equal')) {
            if (currentInput === '' || previousInput === '') return;
            calculate();
            updateScreen();
            resultDisplayed = true;
            return;
        }

        // If decimal button is pressed
        if (value === '.') {
            if (currentInput.includes('.')) return;
            if (currentInput === '') {
                currentInput = '0.';
            } else {
                currentInput += '.';
            }
            updateScreen();
            return;
        }

        // For number buttons
        if (resultDisplayed) {
            currentInput = value;
            resultDisplayed = false;
        } else {
            currentInput += value;
        }

        updateScreen();
    });
});
