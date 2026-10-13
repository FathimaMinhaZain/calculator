let firstNumber
let secondNumber
let step = 0
let operation
let result = 0

let numArray = []
let secondNumberArr = []

let display = document.getElementById('inputBox');
let equation = document.getElementById('equation');

function getNumber(num) {
	if (step === 0 || step === 1) {
		numArray.push(num)
		step = 1
		firstNumber = Number(numArray.join(''))
		display.textContent = firstNumber
	} else if (step === 2) {
		secondNumberArr.push(num)
		secondNumber = Number(secondNumberArr.join(''))
		display.textContent = secondNumber

		 equation.textContent = firstNumber + ' ' + operation
	}
}

function getOperator(operator) {
	step = 2
	operation = operator

	equation.textContent = firstNumber + ' ' + operation;
}

function calculateResult() {
	console.log('first number', firstNumber, 'second number', secondNumber)
	equation.textContent = firstNumber + ' ' + operation + ' ' + secondNumber;


	if (operation === '+') {
		result = firstNumber + secondNumber
	} else if (operation === '-') {
		result = firstNumber - secondNumber
	} else if (operation === '*') {
		result = firstNumber * secondNumber
	} else if (operation === '/') {
		result = firstNumber / secondNumber
	}

	display.textContent = result
}

function clearDisplay() {
	display.textContent = 0
	firstNumber = null
	secondNumber = null
	step = 0
	operation = null
	result = 0
	numArray = []
	secondNumberArr = []
}