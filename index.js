const buttons = document.querySelector(".buttons"),
  expression = document.querySelector(".expression"),
  displayValue = document.querySelector(".display-value");

let prevValue = 0,
  prevOperation = "",
  isNewNumber = true,
  result;

buttons.addEventListener("click", (event) => {
  handleKeyPress(event.target.textContent);
});
document.addEventListener("keydown", (e) => {
  handleKeyPress(e.key);
});

function handleKeyPress(value) {
  const operators = ["+", "-", "/", "*", "%", "=", "Enter"];
  const clearOperators = ["AC", "\u21d0", "Escape", "Backspace"];
  if (value >= "0" && value <= "9") numberHandling(value);
  if (value === ".") decimalHandling();
  if (operators.includes(value)) operationHandling(value);
  if (clearOperators.includes(value)) clearHandling(value);
}
function numberHandling(value) {
  if (displayValue.textContent == "0" || isNewNumber) {
    displayValue.textContent = value;
    isNewNumber = false;
    if (!prevOperation) expression.textContent = "";
  } else {
    if (displayValue.textContent.length < 16) {
      displayValue.textContent += value;
    }
  }
}
function decimalHandling() {
  if (isNewNumber) {
    displayValue.textContent = "0.";
    isNewNumber = false;
    if(!prevOperation) expression.textContent = '';
  } else if (!displayValue.textContent.includes(".")) {
    displayValue.textContent += ".";
    isNewNumber = false;
  }
}
function operationHandling(operation) {
  if (!expression.textContent) {
    result = parseFloat(displayValue.textContent);
  } else {
    switch (prevOperation) {
      case "+":
        result = prevValue + +displayValue.textContent;
        break;
      case "-":
        result = prevValue - displayValue.textContent;
        break;
      case "/":
        result = prevValue / displayValue.textContent;
        break;
      case "*":
        result = prevValue * displayValue.textContent;
        break;
      case "%":
        result = (displayValue.textContent / 100) * prevValue;
        break;
    }
  }

  if (operation === "=" || operation === "Enter") {
    expression.textContent = prevOperation
      ? prevValue + prevOperation + displayValue.textContent + "="
      : displayValue.textContent + "=";
    prevOperation = "";
  } else {
    expression.textContent = result + operation;
    prevOperation = operation;
  }
  prevValue = result;
  displayValue.textContent = result;
  isNewNumber = true;
}

function clearHandling(type) {
  if (type === "\u21d0" || type === "Backspace") {
    displayValue.textContent =
      displayValue.textContent.length > 1
        ? displayValue.textContent.slice(0, -1)
        : "0";
  } else if (type === "AC" || type === "Escape") {
    displayValue.textContent = "0";
    prevValue = 0;
    prevOperation = "";
    isNewNumber = true;
    result = 0;
    expression.textContent = "";
  }
}
