const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let displayValue = "";
let currentValue = "";
let operator = null;

/**
 * Actualiza el contenido de la pantalla de la calculadora con el valor proporcionado.
 * @param {string} value - El nuevo valor a mostrar en la pantalla.
 */
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

/**
 * Maneja la entrada de números y puntos decimales.
 * Si se ingresa un punto decimal, asegura que solo se permita uno.
 * Actualiza los valores de displayValue y currentValue, y refresca la pantalla.
 * @param {string} value - El número o el punto decimal ingresado.
 */
function handleNumber(value) {
  if (value === "." && currentValue.includes(".")) return;
  currentValue += value;
  displayValue += value;
  updateDisplay(displayValue);
}

/**
 * Maneja la entrada de operadores y la lógica de cálculo cuando se presiona "=".
 * Si se presiona un operador, lo establece como el operador actual.
 * Si se presiona "=", se calcula y muestra el resultado.
 * @param {string} value - El operador ingresado o "=".
 */
function handleOperator(value) {
  if (value === "=") {
    calculateResult();
  } else {
    if (currentValue === "" && operator !== null) {
      displayValue = displayValue.slice(0, -1) + value;
    } else {
      displayValue += value;
    }
    operator = value;
    updateDisplay(displayValue);
    currentValue = "";
  }
}

/**
 * Calcula el resultado de la operación actual utilizando `eval`.
 * Muestra el resultado en la pantalla o un mensaje de error si la operación no es válida.
 */
function calculateResult() {
  try {
    const result = eval(displayValue);
    displayValue = result.toString();
    updateDisplay(displayValue);
    currentValue = displayValue;
    operator = null;
  } catch (error) {
    updateDisplay("Error");
  }
}

/**
 * Resetea todos los valores y limpia la pantalla de la calculadora.
 * Se utiliza cuando se presiona el botón de limpiar.
 */
function clearDisplay() {
  displayValue = "";
  currentValue = "";
  operator = null;
  updateDisplay("0");
}

clearDisplay();
