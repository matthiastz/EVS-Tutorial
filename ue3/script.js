// global variables for indexing and setting squares
var x = 0;
var y = 0;
var textInput = "";
var cssProperties = "";
var squareCount = 16;

// IDs
var textID = "text";
var xFieldID = "field_x";
var yFieldID = "field_y";
var cssFieldID = "css";
var btnID = "mybutton";

// table list thingy
var tbodyListTop = {};

window.onload = function () {
    tbodyListTop = document.getElementsByTagName("tbody")[0];
    document.getElementById(textID).addEventListener("change", setText);
    document.getElementById(xFieldID).addEventListener("change", setX);
    document.getElementById(yFieldID).addEventListener("change", setY);
    document.getElementById(cssFieldID).addEventListener("change", setCssProperties);
    document.getElementById(btnID).addEventListener("click", updateSquare);

    // add event listener to reset squares
    var sq = tbodyListTop.getElementsByTagName("td");

    // only last element gets eventhandler...wtf
    for (var i = 0; i < sq.length; i++) {
        var temp = sq[i];
      sq[i].addEventListener("click", function () {
          resetSquare(temp)
      });
    }
    sq.addEventListener("click", resetSquare);
   // window.alert(sq.length);
}

function foo() {
    window.alert("foo");
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

    if (tmp >= 0 && tmp <= 10) {
        x = tmp;
    } else {
        window.alert("x must be >= 0 && <= 10");
    }
}

function setY() {
    // TODO: check input

    var tmp = document.getElementById(yFieldID).value;
    tmp = parseInt(tmp, 10);

    if (tmp >= 0 && tmp <= 10) {
        y = tmp;
    } else {
        window.alert("y must be >= 0 && <= 10");
    }
}

function setCssProperties() {
    // add css properties to global string variable
    // TODO: test if input are correct css properties
    cssProperties = document.getElementById(cssFieldID).value;
}


//===============================
// manipulate squares
//===============================


function addRows() {
    var tableRows = tbodyListTop.getElementsByTagName("tr");
    var rowCountExisting = tableRows.length;
    var rowCountToAdd  = y - rowCountExisting;
    var colCountExisting = tbodyListTop.getElementsByTagName("td").length / tableRows.length;

    if (rowCountToAdd > 0) {
        for (var i = 0; i < rowCountToAdd; i++) {
            var row = tbodyListTop.insertRow(-1);
            for (var j = 0; j < colCountExisting; j++) {
                row.insertCell(-1);
            }
        }
    }
}

function addColumns() {
    var tableRows = tbodyListTop.getElementsByTagName("tr");
    var colCountExisting = tbodyListTop.getElementsByTagName("td").length / tableRows.length;
    var colCountToAdd =  x - colCountExisting;
    var rowCountExisting = tableRows.length;

    if (colCountToAdd > 0) {
        for (var i = 0; i < rowCountExisting; i++) {
            for (var j = 0; j < colCountToAdd; j++) {
                tableRows[i].insertCell(-1);
            }
        }
    }
}

function resetSquare(elem) {

    // TODO idea: use onload() and save a std sqaure element with all default css values

    elem.innerHTML = "";
    elem.style = "";
}


/**
 * update the html element and its style (x,y)
 */
function updateSquare() {
    var index = x + (y * 4);

    // TODO: bug with tr count ?

    // TODO: bug: empty table cells when adding multiple new squares

    var neededSquares = index + 1;

    if (x > 4 || y > 4) {
        addColumns();
        addRows();
    }


    /**
     * TODO: use DOM nav functions, access correct squares
     * TODO: index starts with 1/1 not 0/0
     * TODO: spaltenbreite soll nicht 4 bleiben, sondern sich eben anpassen (5+ spalten, mehr zeilen)
     * TODO: remove table and create new??? :D
     */


    var squareList = tbodyListTop.getElementsByTagName("td");

    squareList[index].innerHTML = textInput;
    squareList[index].setAttribute("style", cssProperties);
}

