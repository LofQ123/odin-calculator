//Initiate buttons
let buttons = document.querySelectorAll(".button")
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
btnAC.addEventListener("click", () => allClear())
btnDel.addEventListener("click", () => del())
btnDot.addEventListener("click", () => enterDot())
btnAdd.addEventListener("click", () => enterOperator("+"))
btnSubtract.addEventListener("click", () => enterOperator("-"))
btnDivide.addEventListener("click", () => enterOperator("/"))
btnMultiply.addEventListener("click", () => enterOperator("*"))



//Initiate UI display elements
let currentDisplay = document.getElementById("currentDisplay");
let previousDisplay = document.getElementById("previousDisplay");
//---------------------------------------------------------------------

let currentOperation = "";
let previousOperation = "";

let firstOperand = [];
let secondOperand = [];
let operator = "";

let currentOperand = 1;

let result;

const allClear = () => {
    firstOperand = [];
    secondOperand = [];
    operator = "";
    updateCurrentOperation();
    currentDisplay.innerText = "0"
}

const del = () => {
    if (currentOperand === 1) {
        if(firstOperand.length > 1) {
            firstOperand.pop();
            updateCurrentOperation();
            updateCurrentDisplay();
        } else if (firstOperand.length === 1) {
            firstOperand.pop();
            updateCurrentOperation();
            currentDisplay.innerText = "0";
        } 
    } else if (currentOperand === 2) {
        if(secondOperand.length >= 1) {
            secondOperand.pop();
            updateCurrentOperation();
            updateCurrentDisplay();
        } else if (secondOperand.length === 0) {
            operator = "";
            updateCurrentOperation();
            updateCurrentDisplay();
            switchOperands();
        }           
    }
}


const switchOperands = () => {
    if (currentOperand === 1) {
        currentOperand = 2
    } else if (currentOperand === 2) {
        currentOperand = 1
    }
}

const updateCurrentOperation = () => currentOperation = `${firstOperand.join("")}${operator}${secondOperand.join("")}`

const updateCurrentDisplay = () => currentDisplay.innerText = currentOperation;

const updatePreviousDisplay = () => previousDisplay.innerText = previousOperation;

const enterNumber = (n) => {
    if (n === 0) {
        if (currentOperand === 1 && firstOperand[0] !== 0 && firstOperand.length !== 0) {
            firstOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
        } else if (currentOperand === 2 && secondOperand[0] !== 0 && firstOperand.length !== 0) {
            secondOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
        }
    } else {
        if (currentOperand === 1) {
            firstOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
        } else if (currentOperand === 2) {
            secondOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
        }
    }
    
    
}

const enterDot = () => {
    if (currentOperand === 1) {
        if (firstOperand.length !== 0) {
            firstOperand.push(".")
            updateCurrentOperation()
            updateCurrentDisplay()
        } else {
            firstOperand.push("0")
            firstOperand.push(".")
            updateCurrentOperation()
            updateCurrentDisplay()
        }
    } else if (currentOperand === 2) {
        if (secondOperand.length !== 0) {
            secondOperand.push(".")
            updateCurrentOperation()
            updateCurrentDisplay()
        } else {
            secondOperand.push("0")
            secondOperand.push(".")
            updateCurrentOperation()
            updateCurrentDisplay()
        }
    }
}

const enterOperator = (op) => {
    if (currentOperand === 1) {
        operator = op;
        updateCurrentOperation()
        updateCurrentDisplay()
        switchOperands()
    } else if (currentOperand === 2) {
        if (secondOperand.length === 0) {
            operator = op;
            updateCurrentOperation()
            updateCurrentDisplay()
        } else {
            getResult();
            firstOperand = result;
            operator = op;
            switchOperands();
        }
    }
}
























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