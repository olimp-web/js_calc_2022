"use strict";

let display = document.getElementById("datafield"); //output string
let firstArgument = "", secondArgument = "", currentOperation = "";
let isOperatorChosen = false;
let historyArray = [];

function clearAll() {
    firstArgument = "";
    secondArgument = "";
    isOperatorChosen = false;
    currentOperation = "";
    display.innerHTML = "";
}

function addToHistory(result) {
    if (historyArray.length <= 10) historyArray.unshift(result);
    else {
        historyArray.unshift(result); //add first
        historyArray.pop(); //delete last
    }
    document.getElementById("history").innerHTML = historyArray.join("<br>"); 
    //display array in history div separated by line breaks
}

// document.querySelectorAll(".calc-button").addEventListener("click", setArgument(this.id));
//наверное можно сделать эффективнее, чем через onclick в html, но конкретно вот это ^ не работает.

function setArgument(buttonId) {
    if ((buttonId == "+")||(buttonId == "-")||(buttonId == "*")||(buttonId == "/")) {

        if (((buttonId == "+")||(buttonId == "-"))&&(firstArgument === "")) { 
            //if + or - entered before 1st argument, add them to 1st argument
            firstArgument += buttonId;
        } else {
            isOperatorChosen = true;
            currentOperation = buttonId;
        }
    } else {
        if (isOperatorChosen === false) {
            firstArgument += buttonId; //input before operator is chosen -> first argument
        } else {
            secondArgument += buttonId;
        }
    }
    display.innerHTML = firstArgument + currentOperation + secondArgument;
}

function backspace() {
    if (isOperatorChosen === false) {
        firstArgument = firstArgument.slice(0, -1); //delete last element of string
    } else {
        if (secondArgument === "") { //if no second argument, delete operator
            currentOperation = "";
            isOperatorChosen = false;
        }
        secondArgument = secondArgument.slice(0, -1);
    }
    display.innerHTML = firstArgument + currentOperation + secondArgument;
}

function compute() {
    switch(currentOperation) {
        case "+":
            display.innerHTML = +firstArgument + +secondArgument;
            break;
        case "-":
            display.innerHTML = +firstArgument - +secondArgument;
            break;
        case "*":
            display.innerHTML = +firstArgument * +secondArgument;
            break;
        case "/":
            display.innerHTML = +(+firstArgument / +secondArgument).toPrecision(5);
            break;
    }
    addToHistory(display.innerHTML);
    firstArgument = "";
    secondArgument = "";
    isOperatorChosen = false;
    currentOperation = "";
}

function changeToStyle1() {
    document.getElementsByTagName("link")[0].href="styles/style-minimal.css";
}
function changeToStyle2() {
    document.getElementsByTagName("link")[0].href="styles/style-old.css";
}