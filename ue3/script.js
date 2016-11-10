// global variables for indexing and setting squares
var x = 0;
var y = 0;
var textInput = "";
var stdGrey = "#eeeeee";
var cssProperties = "";
var squareCount = 16;
var idTable = "tableTopRoot";

function setX(elementID) {
    // TODO check if number

    var tmp = document.getElementById(elementID).value;
    tmp = parseInt(tmp, 10);

    x = tmp;
}

function setY(elementID) {
    // TODO: check input

    var tmp = document.getElementById(elementID).value;
    tmp = parseInt(tmp, 10);

    y = tmp;
}

function addNeededSqaures(index) {

    var table = document.getElementById(idTable);

    if (x <= 100 && y <= 100) {
        for (var i = 0; i < index; i++) {
            // create a row each 4 td
            if (i % 4 == 0) {
                var node = document.createElement("tr");
                table.appendChild(node);
            }
            var node = document.createElement("td");
            table.appendChild(node);
            squareCount++;
        }
    } else {
        window.alert("x and y must be <= 100 !");
    }
}

function setText(elementID) {

    var tmp = document.getElementById(elementID).value;
    // TODO: check input
    textInput = tmp;
}

function resetSquare(htmlElement) {

    // TODO idea: use onload() and save a std sqaure element with all default css values

    htmlElement.innerHTML = "";
    htmlElement.style.backgroundColor = stdGrey;
}

function setCssProperties(elementID) {
    // add css properties to global string variable
    // TODO: test if input are correct css properties
    cssProperties = document.getElementById(elementID).value;
}

/**
 * update the html element and its style (x,y)
 */
function updateSquare() {
    var index = x + (y * 4);

    if (index > squareCount) {
        addNeededSqaures(index);
    }

    var	nodelist = document.getElementsByTagName("td");
    nodelist[index].innerHTML = textInput;
    nodelist[index].setAttribute("style", cssProperties);
}

