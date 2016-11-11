// global variables for indexing and setting squares
var x = 0;
var y = 0;
var textInput = "";
var stdGrey = "#eeeeee";
var cssProperties = "";
var squareCount = 16;
var idTable = "tableTopRoot";

// IDs
var textID = "text";
var xFieldID = "field_x";
var yFieldID = "field_y";
var cssFieldID = "css";
var btnID = "mybutton";

window.onload = function () {
    document.getElementById(textID).addEventListener("change", setText);
    document.getElementById(xFieldID).addEventListener("change", setX);
    document.getElementById(yFieldID).addEventListener("change", setY);
    document.getElementById(cssFieldID).addEventListener("change", setCssProperties);
    document.getElementById(btnID).addEventListener("click", updateSquare);
}

//===============================
// setter functions
//===============================

function setText() {

    var tmp = document.getElementById(textID).value;
    // TODO: check input
    textInput = tmp;
}


function setX() {
    // TODO check if number

    var tmp = document.getElementById(xFieldID).value;
    tmp = parseInt(tmp, 10);

    x = tmp;
}

function setY() {
    // TODO: check input

    var tmp = document.getElementById(yFieldID).value;
    tmp = parseInt(tmp, 10);

    y = tmp;
}

function setCssProperties() {
    // add css properties to global string variable
    // TODO: test if input are correct css properties
    cssProperties = document.getElementById(cssFieldID).value;
}


//===============================
// manipulate squares
//===============================


function addNeededSquares(count) {

    var table = document.getElementById(idTable);

    // who needs so many td's ? :D
    if (x <= 100 && y <= 100) {

        // create rows
        var trCount = count / 4;

        for (var i = 0; i < trCount; i++) {

            if (count >= 4) {
                var node = document.createElement("tr");
                // add class name to identify these cells
                node.insertCell(0).className = "square";
                node.insertCell(1).className = "square";
                node.insertCell(2).className = "square";
                node.insertCell(3).className = "square";

                table.appendChild(node);
                squareCount += 4;
                count -= 4;
            }
        }

        // create td's
        for (var i = 0; i < count; i++) {
            var node = document.createElement("td");
            node.className = "square";
            table.appendChild(node);
            squareCount++;
        }
    } else {
        window.alert("x and y must be <= 100 !");
    }
}

function resetSquare(htmlElement) {

    // TODO idea: use onload() and save a std sqaure element with all default css values

    htmlElement.innerHTML = "";
    htmlElement.style.backgroundColor = stdGrey;
}

/**
 *
 * TODO: use   DOM API
 * document.getEByTagname(tbody)[0]
 *
 *
 */


/**
 * update the html element and its style (x,y)
 */
function updateSquare() {
    var index = x + (y * 4);

    // TODO: bug with tr count ?

    // TODO: bug: empty table cells when adding multiple new squares

    var neededSquares = index + 1;

    if (neededSquares > squareCount) {
        addNeededSquares(neededSquares - squareCount);
    }

    var	nodelist = document.getElementsByClassName("square");
    nodelist[index].innerHTML = textInput;
    nodelist[index].setAttribute("style", cssProperties);
}

