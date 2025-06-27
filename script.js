const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let shouldReset = false;

// Button click handling
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("number")) {
      appendNumber(value);
    } else if (button.classList.contains("operator")) {
      appendOperator(value);
    } else if (button.classList.contains("equals")) {
      calculate();
    } else if (button.classList.contains("clear")) {
      clearDisplay();
    } else if (button.classList.contains("delete")) {
      deleteLast();
    }
  });
});

// Keyboard input handling
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendOperator(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});

function appendNumber(number) {
  if (display.textContent === "0" || shouldReset) {
    display.textContent = number;
    shouldReset = false;
  } else {
    display.textContent += number;
  }
  currentInput = display.textContent;
}

function appendOperator(operator) {
  if (shouldReset) shouldReset = false;

  if (!/[+\-*/]$/.test(display.textContent)) {
    display.textContent += operator;
    currentInput = display.textContent;
  }
}

function calculate() {
  try {
    display.textContent = eval(display.textContent);
    currentInput = display.textContent;
    shouldReset = true;
  } catch (e) {
    display.textContent = "Error";
    shouldReset = true;
  }
}

function clearDisplay() {
  display.textContent = "0";
  currentInput = "";
}

function deleteLast() {
  if (display.textContent.length === 1 || display.textContent === "Error") {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
  currentInput = display.textContent;
}
