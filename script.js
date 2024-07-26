//Initiate buttons
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

const updateCurrentDisplay = () => {
    currentDisplay.innerText = currentOperation;
    currentDisplay.innerText.length > 23 ? currentDisplay.style.fontSize = "15px" : currentDisplay.style.fontSize = "27px";
}

const updatePreviousDisplay = () => {
    previousDisplay.innerText = previousOperation;
    if (previousDisplay.innerText.length <= 23) {
        previousDisplay.style.fontSize = "27px";
    } else if (previousDisplay.innerText.length > 23 && previousDisplay.innerText.length <= 40) {
        previousDisplay.style.fontSize = "15px";
    } else if (previousDisplay.innerText.length > 40) {
        previousDisplay.innerText = "ERROR: CAN'T FIT"
    }
}

const displayResult = () => {
    currentDisplay.innerText = `${result}`;
    updatePreviousOperation();
    updatePreviousDisplay();
}

const enterNumber = (n) => {
    if (n === 0) { // To prevent entering numbers starting with 0 (like 00005)
        if (currentOperand === 1 && firstOperand[0] !== 0 && firstOperand.length !== 0 && firstOperand.length < 20) {
            firstOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
            allowContinue = false;
        } else if (currentOperand === 2 && secondOperand[0] !== 0 && secondOperand.length !== 0 && secondOperand.length < 20) {
            secondOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
            allowContinue = false;
        }
    } else {
        if (currentOperand === 1 && firstOperand.length < 20) {
            firstOperand.push(n)
            updateCurrentOperation()
            updateCurrentDisplay()
            allowContinue = false;
        } else if (currentOperand === 2 && secondOperand.length < 20) {
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
//---------------------------------------------------------------------


//Adding dynamic visuals to UI
let buttonsReg = document.querySelectorAll(".reg");
let buttonsAlt = document.querySelectorAll(".alt"); 
let buttonBig = document.querySelector(".big");

buttonsReg.forEach((button) => {
    button.addEventListener("mousemove", () => {
       button.style.border = "3px solid #8d8f1f"
    })
    button.addEventListener("mouseout", () => {
       button.style.border = "3px solid black"
    })
    button.addEventListener("mousedown", () => {
        button.style.border = "3px solid white";
        button.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    })
    button.addEventListener("mouseup", () => {
        button.style.border = "3px solid #8d8f1f";
        button.style["-webkit-text-stroke"] = "2px black";
    })
})

buttonsAlt.forEach((button) => {
    button.addEventListener("mousemove", () => {
        button.style.border = "3px solid #8d8f1f"
     })
     button.addEventListener("mouseout", () => {
        button.style.border = "3px solid black"
     })

     button.addEventListener("mousedown", () => {
         button.style.border = "3px solid white";
         button.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
         button.style.color = "white";
     })
     button.addEventListener("mouseup", () => {
         button.style.border = "3px solid #8d8f1f";
         button.style.color = "#8d8f1f";
     })
})

buttonBig.addEventListener("mousemove", () => {
    buttonBig.style.border = "3px solid #8d8f1f"
 })

buttonBig.addEventListener("mouseout", () => {
    buttonBig.style.border = "3px solid black"
})

buttonBig.addEventListener("mousedown", () => {
    buttonBig.style.border = "3px solid white";
    buttonBig.style.color = "white";
})

buttonBig.addEventListener("mouseup", () => {
    buttonBig.style.border = "3px solid #8d8f1f";
    buttonBig.style.color = "black";
})
//---------------------------------------------------------------------

//Add keyboard support
document.body.addEventListener("keydown", (ev) => {
    if (ev.key === "0") {
        enterNumber(0);
        btn0.style.border = "3px solid white";
        btn0.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "1") {
        enterNumber(1);
        btn1.style.border = "3px solid white";
        btn1.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "2") {
        enterNumber(2);
        btn2.style.border = "3px solid white";
        btn2.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "3") {
        enterNumber(3);
        btn3.style.border = "3px solid white";
        btn3.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "4") {
        enterNumber(4);
        btn4.style.border = "3px solid white";
        btn4.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "5") {
        enterNumber(5);
        btn5.style.border = "3px solid white";
        btn5.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "6") {
        enterNumber(6);
        btn6.style.border = "3px solid white";
        btn6.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "7") {
        enterNumber(7);
        btn7.style.border = "3px solid white";
        btn7.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "8") {
        enterNumber(8);
        btn8.style.border = "3px solid white";
        btn8.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "9") {
        enterNumber(9);
        btn9.style.border = "3px solid white";
        btn9.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "Delete") {
        allClear();
        btnAC.style.border = "3px solid white";
        btnAC.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
        btnAC.style.color = "white";
    } else if (ev.key === "Backspace") {
        del();
        btnDel.style.border = "3px solid white";
        btnDel.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
        btnDel.style.color = "white";
    } else if (ev.key === ".") {
        enterDot();
        btnDot.style.border = "3px solid white";
        btnDot.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
    } else if (ev.key === "+") {
        enterOperator("+");
        btnAdd.style.border = "3px solid white";
        btnAdd.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
        btnAdd.style.color = "white";
    } else if (ev.key === "-") {
        enterOperator("-");
        btnSubtract.style.border = "3px solid white";
        btnSubtract.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
        btnSubtract.style.color = "white";
    } else if (ev.key === "/") {
        enterOperator("/");
        btnDivide.style.border = "3px solid white";
        btnDivide.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
        btnDivide.style.color = "white";
    } else if (ev.key === "*") {
        enterOperator("*");
        btnMultiply.style.border = "3px solid white";
        btnMultiply.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
        btnMultiply.style.color = "white";
    } else if (ev.key === "Enter") {
        operate();
        buttonBig.style.border = "3px solid white";
        buttonBig.style.color = "white";
    } else if (ev.key === "^") {
        enterSqrt();
        btnSqrt.style.border = "3px solid white";
        btnSqrt.style["-webkit-text-stroke"] = "0px rgba(255, 255, 255, 0.747";
        btnSqrt.style.color = "white";
    }
})

document.body.addEventListener("keyup", (ev) => {
    if (ev.key === "0") {
        btn0.style.border = "3px solid black";
        btn0.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "1") {
        btn1.style.border = "3px solid black";
        btn1.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "2") {
        btn2.style.border = "3px solid black";
        btn2.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "3") {
        btn3.style.border = "3px solid black";
        btn3.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "4") {
        btn4.style.border = "3px solid black";
        btn4.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "5") {
        btn5.style.border = "3px solid black";
        btn5.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "6") {
        btn6.style.border = "3px solid black";
        btn6.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "7") {
        btn7.style.border = "3px solid black";
        btn7.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "8") {
        btn8.style.border = "3px solid black";
        btn8.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "9") {
        btn9.style.border = "3px solid black";
        btn9.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "Delete") {
        btnAC.style.border = "3px solid black";
        btnAC.style.color = "#8d8f1f";
    } else if (ev.key === "Backspace") {
        btnDel.style.border = "3px solid black";
        btnDel.style.color = "#8d8f1f";
    } else if (ev.key === ".") {
        btnDot.style.border = "3px solid black";
        btnDot.style["-webkit-text-stroke"] = "2px black";
    } else if (ev.key === "+") {
        btnAdd.style.border = "3px solid black";
        btnAdd.style.color = "#8d8f1f";
    } else if (ev.key === "-") {
        btnSubtract.style.border = "3px solid black";
        btnSubtract.style.color = "#8d8f1f";
    } else if (ev.key === "/") {
        btnDivide.style.border = "3px solid black";
        btnDivide.style.color = "#8d8f1f";
    } else if (ev.key === "*") {
        btnMultiply.style.border = "3px solid black";
        btnMultiply.style.color = "#8d8f1f";
    } else if (ev.key === "Enter") {
        buttonBig.style.border = "3px solid black";
        buttonBig.style.color = "black";
    } else if (ev.key === "^") {
        btnSqrt.style.border = "3px solid black";
        btnSqrt.style.color = "#8d8f1f";
    }




})
