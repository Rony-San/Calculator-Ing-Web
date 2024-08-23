const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let displayValue = "";
let currentValue = "";
let previousValue = "";
let operator = null;

function updateDisplay(value) {
  display.value = value;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;

    if (button.classList.contains("operator")) {
      handleOperator(buttonValue);
    } else if (button.classList.contains("clear")) {
      clearDisplay();
    } else {
      handleNumber(buttonValue);
    }
  });
});

function handleNumber(value) {
  if (value === "." && currentValue.includes(".")) return;
  currentValue += value;
  displayValue += value;
  updateDisplay(displayValue);
}

function handleOperator(value) {
  if (value === "=") {
    calculateResult();
  } else {
    if (currentValue === "" && previousValue !== "") {
      operator = value;
      displayValue = displayValue.slice(0, -1) + value;
      updateDisplay(displayValue);
      return;
    }
    if (operator === null) {
      previousValue = currentValue;
    } else {
      calculateResult(false);
    }
    operator = value;
    displayValue += value;
    updateDisplay(displayValue);
    currentValue = "";
  }
}

function calculateResult(finalCalculation = true) {
  let result = 0;
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  previousValue = currentValue;

  if (finalCalculation) {
    displayValue = currentValue;
  } else {
    displayValue += currentValue;
  }

  operator = null;
  updateDisplay(displayValue);
}

function clearDisplay() {
  displayValue = "";
  currentValue = "";
  previousValue = "";
  operator = null;
  updateDisplay("0");
}

clearDisplay();
