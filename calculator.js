function add() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];        
    }
    return sum;
}

function subtract() {
    let sub = arguments[0];
    for (let i = 1; i < arguments.length; i++) {        
        sub -= arguments[i];        
    }
    return sub;
}

function multiply() {
    let mul = 1;
    for (let i = 0; i < arguments.length; i++) {
        mul *= arguments[i];        
    }
    return mul;    
}

function divide() {
    let div = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        div /= arguments[i];        
    }
    return div;    
}

function operate(operator, num1, num2) {    
    switch (true) {
        case operator == "+":
            return add(num1, num2);
            break;
        
        case operator == "−":
            return subtract(num1, num2);
            break;
        
        case operator == "×":
            return multiply(num1, num2);
            break;

        case operator == "÷":
            return divide(num1, num2);
            break;
    }
}

let buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("click", calculate);    
});

let flag;

function calculate(e) {
    let display = document.querySelector(".display");
    let equal = document.querySelector(".colorEqual")
    let key = e.target.textContent;    
    let regEx = /[+−×÷]/;
    let regEx1 = /[+−×÷=]/;
    
    if (key == "=") {
        equal.classList.add("active");
    } else {
        equal.classList.remove("active");
    } 
    
    if (display.textContent == "0" && regEx1.test(key) == false) {
        if (key == "DEL") {
            // Do nothing
        } else {
            display.textContent = "";
        }
        flag = 0;       
    }    
    if (display.textContent == "DUUuuUUDE" && key !== "=") {
        display.textContent = "";        
    }
    if (flag == 1 && regEx1.test(key) == false) {         
        if (key == "DEL") {
            // Do nothing
        } else {
            display.textContent = "";            
        }
        flag = 0;
    }    
    if (key !== "=") {
        if (key == "DEL" && display.textContent == "0") {
            display.textContent = "0";
        } else if (key == "DEL" && display.textContent !== "0") {
            display.textContent = display.textContent.slice(0,display.textContent.length-1);
            if (display.textContent == "") {
                display.textContent = "0";
            }
        } else {
            display.textContent += key;                
            let {points, operators} = charCount(display.textContent, ".+−×÷");
            //console.log (pointCount, opCount);
            if (regEx.test(display.textContent) == false && points > 1) {
                display.textContent = display.textContent.slice(0,display.textContent.length-1);                
            } else if (regEx.test(display.textContent) == true) {
                if (points > 2 || operators > 1) {
                    display.textContent = display.textContent.slice(0,display.textContent.length-1);
                }                
            }            
        }            
        flag = 0;
    }    
    if (display.textContent.length > 16) {
        display.textContent = display.textContent.slice(0,16);
    }
    if (key == "Clear") {
        display.textContent = "0";
        return;
    } else if (regEx1.test(key)) {
        let terms = display.textContent.split(regEx);
        //console.log(key);
        let operator = display.textContent[display.textContent.search(regEx)];
        //console.log(operator);        
        if (operator == undefined) return;
        if (terms[0] !== "" && terms[1] !== "") {                       
            //console.log(terms);
            let num1 = +terms[0];
            let num2 = +terms[1];
            //console.log(num1, operator, num2);            
            let result = operate(operator, num1, num2);
            //console.log(result);
            if (result == Infinity || isNaN(result)) {
                display.textContent = "DUUuuUUDE";
                return;
            } 
            display.textContent = +result.toFixed(10);
            if (display.textContent.length > 16) {
                display.textContent = display.textContent.slice(0,16);
            }
            if (regEx.test(key)) display.textContent += key;
            if (key == "=") flag = 1;
            //console.log(flag);
            return;    
        } 
    }    
}

/*function charCount(string, character) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] == character) count++;
    }
    return count;    
}*/

function charCount(string, character) {
    let pointCount = 0;
    let opCount = 0;
    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < character.length; j++) {
            if (string[i] == character[j]) {
                if (string[i] == ".") pointCount++;
                else opCount++;
            }
            //(string[i] == character[j])? (string[i] == ".")? pointCount++: opCount++ : ;                         
        }        
    }    
    return {points: pointCount, operators: opCount};    
}