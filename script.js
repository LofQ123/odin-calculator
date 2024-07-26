//Initiate buttons
let buttons = document.querySelectorAll(".button");
let btnEql = document.getElementById("eql");
let btnSqrt = document.getElementById("sqrt");
let btnDot = document.getElementById("dot");
let btnAdd = document.getElementById("add");
let btnDivide = document.getElementById("divide");
let btnSubtract = document.getElementById("subtract");
let btnMultiply = document.getElementById("multiply");
let btnAC = document.getElementById("AC");
let btnDel = document.getElementById("del");

let btn0 = document.getElementById("0");
let btn1 = document.getElementById("1");
let btn2 = document.getElementById("2");
let btn3 = document.getElementById("3");
let btn4 = document.getElementById("4");
let btn5 = document.getElementById("5");
let btn6 = document.getElementById("6");
let btn7 = document.getElementById("7");
let btn8 = document.getElementById("8");
let btn9 = document.getElementById("9");
//---------------------------------------------------------------------

//Add inputs to the number buttons
btn0.addEventListener("click", () => enterNumber(0));
btn1.addEventListener("click", () => enterNumber(1));
btn2.addEventListener("click", () => enterNumber(2));
btn3.addEventListener("click", () => enterNumber(3));
btn4.addEventListener("click", () => enterNumber(4));
btn5.addEventListener("click", () => enterNumber(5));
btn6.addEventListener("click", () => enterNumber(6));
btn7.addEventListener("click", () => enterNumber(7));
btn8.addEventListener("click", () => enterNumber(8));
btn9.addEventListener("click", () => enterNumber(9));
//---------------------------------------------------------------------

//Add inputs to the rest of the buttons
btnAC.addEventListener("click", () => allClear());
btnDel.addEventListener("click", () => del());
btnDot.addEventListener("click", () => enterDot());
btnAdd.addEventListener("click", () => enterOperator("+"));
btnSubtract.addEventListener("click", () => enterOperator("-"));
btnDivide.addEventListener("click", () => enterOperator("/"));
btnMultiply.addEventListener("click", () => enterOperator("*"));
btnEql.addEventListener("click", () => operate());
btnSqrt.addEventListener("click", () => enterSqrt());

//Initiate UI display elements
let currentDisplay = document.getElementById("currentDisplay");
let previousDisplay = document.getElementById("previousDisplay");
//---------------------------------------------------------------------

//Initiate main variables
let currentOperation = "";
let previousOperation = "";

// Operation is "firstOperand + operator + secondOperand"
let firstOperand = [];
let secondOperand = [];
let operator = "";

let currentOperand = 1;

let result;
let previousResult = 0;

// Is operate() able to be called when operator button is pressed
let allowContinue = false; 

// To make sure only one '.' per operand can be entered
let allowDotFirstOperand = true; 
let allowDotSecondOperand = true;
//---------------------------------------------------------------------

//Main functions
const allClear = () => {
    firstOperand = [];
    secondOperand = [];
    operator = "";
    currentOperation = "";
    previousOperation = "";
    currentDisplay.innerText = "0";
    updatePreviousDisplay();
    result = undefined;
    previousResult = 0;
    allowDotFirstOperand = true;
    allowDotSecondOperand = true;
};

const resetOperation = () => {
    currentOperation = "";
    firstOperand = [];
    secondOperand = [];
    currentOperand = 1;
    operator = ""
    result = undefined;
    allowDotFirstOperand = true;
    allowDotSecondOperand = true;
}

const del = () => {
    if (currentOperand === 1) {
        if(firstOperand.length > 1) {
            let x = firstOperand.pop();
            if (x === ".") {
                allowDotFirstOperand = true
            }
            updateCurrentOperation();
            updateCurrentDisplay();
        } else if (firstOperand.length === 1) {
            let x = firstOperand.pop();
            if (x === ".") {
                allowDotFirstOperand = true
            }
            updateCurrentOperation();
            currentDisplay.innerText = "0";
        } 
    } else if (currentOperand === 2) {
        if(secondOperand.length >= 1) {
            let x = secondOperand.pop();
            if (x === ".") {
                allowDotSecondOperand = true
            }
            updateCurrentOperation();
            updateCurrentDisplay();
        } else if (secondOperand.length === 0) {
            operator = "";
            updateCurrentOperation();
            updateCurrentDisplay();
            switchOperands();
        }           
    }
};

// Switch in what operand numbers are going to be entered
const switchOperands = () => {
    if (currentOperand === 1) {
        currentOperand = 2;
    } else if (currentOperand === 2) {
        currentOperand = 1;
    }
};

const updateCurrentOperation = () => currentOperation = `${firstOperand.join("")}${operator}${secondOperand.join("")}`;

const updatePreviousOperation = () => previousOperation = `${currentOperation}=${result}`;

const updateCurrentDisplay = () => currentDisplay.innerText = currentOperation;

const updatePreviousDisplay = () => {
    previousDisplay.innerText = previousOperation;
    previousDisplay.innerText.length > 25 ? previousDisplay.style.fontSize = "15px" : previousDisplay.style.fontSize = "27px";
}

const displayResult = () => {
    currentDisplay.innerText = `${result}`;
    updatePreviousOperation();
    updatePreviousDisplay();
}

const enterNumber = (n) => {
    if (n === 0) {
        if (currentOperand === 1 && firstOperand[0] !== 0 && firstOperand.length !== 0) {
            firstOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
            allowContinue = false;
        } else if (currentOperand === 2 && secondOperand[0] !== 0 && firstOperand.length !== 0) {
            secondOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
            allowContinue = false;
        }
    } else {
        if (currentOperand === 1) {
            firstOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
            allowContinue = false;
        } else if (currentOperand === 2) {
            secondOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
            allowContinue = false;
        }
    } 
}

const enterDot = () => {
    if (currentOperand === 1 && allowDotFirstOperand) {
        if (firstOperand.length !== 0) {
            firstOperand.push(".");
            updateCurrentOperation();
            updateCurrentDisplay();
            allowDotFirstOperand = false;
        } else {
            firstOperand.push("0");
            firstOperand.push(".");
            updateCurrentOperation();
            updateCurrentDisplay();
            allowDotFirstOperand = false;
        }
    } else if (currentOperand === 2 && allowDotSecondOperand) {
        if (secondOperand.length !== 0) {
            secondOperand.push(".");
            updateCurrentOperation();
            updateCurrentDisplay();
            allowDotSecondOperand = false;
        } else {
            secondOperand.push("0");
            secondOperand.push(".");
            updateCurrentOperation();
            updateCurrentDisplay();
            allowDotSecondOperand = false;
        }
    }
}

const enterSqrt = () => {
    if (currentOperand === 1 && firstOperand.length === 0) {
        firstOperand.push("√");
        updateCurrentOperation();
        updateCurrentDisplay();
    } else if (currentOperand === 2 && secondOperand.length === 0) {
        secondOperand.push("√");
        updateCurrentOperation();
        updateCurrentDisplay();
    }
}

const enterOperator = (op) => {
    if (currentOperand === 1) {
        if (firstOperand.length !== 0) {
            operator = op;
            updateCurrentOperation()
            updateCurrentDisplay()
            switchOperands()
        } else if (allowContinue) {
            continueFromResult();
            operator = op;
            updateCurrentOperation()
            updateCurrentDisplay()
            switchOperands()
            allowContinue = false;
        }    
    } else if (currentOperand === 2) {
        if (secondOperand.length === 0) {
            operator = op;
            updateCurrentOperation()
            updateCurrentDisplay()
        } else {
            operate("continue");
            operator = op;
            secondOperand = [];
            updateCurrentOperation()
            updateCurrentDisplay()
        }
    }
}

// getA and getB are aux functions for main getResult Function
const getA = () => {
    if (firstOperand[0] === "√" && firstOperand.length > 1) {
        firstOperand.shift();
        return Math.sqrt(Number(firstOperand.join("")));
    } else if (firstOperand[0] !== "√" && firstOperand.length > 0) {
        return Number(firstOperand.join(""));
    }
}

const getB = () => {
    if (secondOperand[0] === "√" && secondOperand.length > 1 ) {
        secondOperand.shift();
        return Math.sqrt(Number(secondOperand.join("")));
    } else if (secondOperand[0] !== "√" && secondOperand.length > 0) {
        return Number(secondOperand.join(""));
    }
}

const getResult = () => {
    let a = getA()
    let b = getB()

    if (currentOperation[0] === "√" && firstOperand.length > 0 && secondOperand.length === 0) {
        result = a;
    } else if (firstOperand.length !== 0 && secondOperand.length !== 0) {
        if (operator === "+") {
            result = a + b;
        } else if (operator === "-") {
            result = a - b;
        } else if (operator === "/") {
            if (b === 0) {
                result = "ERROR";
                allowContinue = false;
            } else {
                result = a / b;
            }
        } else if (operator === "*" ) {
            result = (a * b);
        }
    }    
}

const operate = (type) => {
    getResult()
    
    if (result !== "ERROR") {
        previousResult = result;
        allowContinue = true;
    } else {
        allowContinue = false;
    }

    if (result !== undefined) {
        displayResult();
        if (type !== "continue") {
            resetOperation()
        } else {
            continueFromResult();
        }
    }  
}        

// Used when after second operand another operator is entered
const continueFromResult = () => {
    if (result !== "ERROR") {
        let str = previousResult.toString();
        firstOperand = str.split('');
        allowDotSecondOperand = true;
    }  
}

//Adding dynamic visuals to UI
buttons.forEach((button) => {
    button.addEventListener("mousemove", () => {
       button.style.border = "1px solid black"
    })
    button.addEventListener("mouseout", () => {
       button.style.border = "1px solid red"
    })
    button.addEventListener("mousedown", () => {
        button.style.backgroundColor ="blue"
    })
    button.addEventListener("mouseup", () => {
        button.style.backgroundColor =""
    })
})