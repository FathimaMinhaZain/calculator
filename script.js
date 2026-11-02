let firstNumber
let secondNumber
let step = 0
let operation
let result = 0

let numArray = []
let secondNumberArr = []

let history = JSON.parse(sessionStorage.getItem("history") || "[]")


let display = document.getElementById('inputBox');
let equation = document.getElementById('equation');

let justCalculated = 'false';

function getNumber(num) {
	if (justCalculated === 'true') {
		clearDisplay()
		getNumber(num)
	}
	else if (step === 0 || step === 1) {
		numArray.push(num)
		step = 1
		firstNumber = Number(numArray.join(''))
		display.textContent = firstNumber

		// console.log(firstNumber + ' getNumber step 0/1')
	} else if (step === 2) {
		secondNumberArr.push(num)
		secondNumber = Number(secondNumberArr.join(''))
		display.textContent = secondNumber

		// console.log(firstNumber + ' getNumber step 2')

		equation.textContent = firstNumber + ' ' + operation + ' ' + secondNumber
	}
}

function getDecimal() {
	if (step === 0 || step === 1) {
		if (numArray.includes('.'))
			return
		else if (numArray.length == 0)
			numArray.push(0)
		numArray.push('.')
		firstNumber = numArray.join('')
		display.textContent = firstNumber
	} else if (step === 2) {
		if (secondNumberArr.includes('.'))
			return
		else if (secondNumberArr.length == 0)
			secondNumberArr.push(0)
		secondNumberArr.push('.')
		secondNumber = secondNumberArr.join('')
		display.textContent = secondNumber

		equation.textContent = firstNumber + ' ' + operation
	}
}

function getSign() {
	if (step <= 1) {
		if (numArray[0] == '-')
			numArray.shift()
		else
			numArray.unshift('-')
		firstNumber = Number(numArray.join(''))
		display.textContent = firstNumber
	} else if (step === 2) {
		if (secondNumberArr[0] == '-')
			secondNumberArr.shift()
		else
			secondNumberArr.unshift('-')
		secondNumber = Number(secondNumberArr.join(''))
		display.textContent = secondNumber
		equation.textContent = firstNumber + ' ' + operation + ' ' + secondNumber

	}
}

function getOperator(operator) {

	if (secondNumber != null) {
		firstNumber = calculate()
		secondNumber = null
		secondNumberArr = []
		display.textContent = null
	}

	step = 2
	operation = operator

	equation.textContent = firstNumber + ' ' + operation;
}

function getPercent() {
	display.textContent += '%'
	if (step === 1) {
		equation.textContent = firstNumber + '%'
		firstNumber = firstNumber / 100
	} else if (step === 2 && (operation === '/' || operation === '*')) {
		equation.textContent = firstNumber + ' ' + operation + secondNumber + '%'
		secondNumber = secondNumber / 100
	} else {
		equation.textContent = firstNumber + ' ' + operation + secondNumber + '%';
		secondNumber = firstNumber * (secondNumber / 100)
	}
}

function calculate() {
	if (operation === '+') {
		result = firstNumber + secondNumber
	} else if (operation === '-') {
		result = firstNumber - secondNumber
	} else if (operation === '*') {
		result = firstNumber * secondNumber
	} else if (operation === '/') {
		if (secondNumber === 0)
			return 'stupid and undefined'
		result = firstNumber / secondNumber
	}
	result = Math.round(result * 1e10) / 1e10

	return result
}

function calculateResult() {
	let historyItem = 0;
	if (secondNumber == null) {
		display.textContent = firstNumber

		historyItem = equation.textContent + ' = ' + firstNumber;
	} else {
		result = calculate()
		display.textContent = result

		historyItem = equation.textContent + ' = ' + result;


	}
	justCalculated = 'true'

	// save history
	history.push(historyItem)
	sessionStorage.setItem("history", JSON.stringify(history))

}

function clearDisplay() {
	display.textContent = 0
	equation.textContent = null
	firstNumber = null
	secondNumber = null
	step = 0
	operation = null
	result = 0
	numArray = []
	secondNumberArr = []
	justCalculated = 'false'
}