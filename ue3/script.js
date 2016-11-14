// global variables for indexing and setting squares
var x = 0;
var y = 0;
var textInput = "";
var cssProperties = "";

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

/**
 * add css properties to global string variable
 */
function setCssProperties() {
    // TODO: test if input are correct css properties
    cssProperties = document.getElementById(cssFieldID).value;
}


//===============================
// manipulate squares
//===============================

/**
 * add necessary rows to table at the top
 */
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

/**
 * add necessary columns to table at the top
 */
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

/**
 * reset the style and inner html of a given html element
 * @param elem is the given html element
 */
function resetSquare(elem) {
    elem.innerHTML = "";
    elem.style = "";
}


/**
 * update the html element and its style (x,y)
 */
function updateSquare() {

    if (x > 4) {
        addColumns();
    }
    if (y > 4) {
        addRows();
    }

    var elem = tbodyListTop.rows[y-1].getElementsByTagName("td")[x-1];
    elem.innerHTML = textInput;
    elem.setAttribute("style", cssProperties);

    // only set event listener to square that already was changed
    elem.addEventListener("click", function () {
        resetSquare(elem)
    });
}

