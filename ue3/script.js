// global variables for indexing and setting squares
var x = 0;
var y = 0;
var textInput = "";
var stdGrey = "#eeeeee";
var cssProperties = {};

function setX(elementID) {
    // TODO check if number

    var tmp = document.getElementById(elementID).value;
    tmp = parseInt(tmp, 10);

    if (tmp >= 0) {
        x = tmp;
    }
}

function setY(elementID) {
    // TODO: check input

    var tmp = document.getElementById(elementID).value;
    tmp = parseInt(tmp, 10);

    if (tmp >= 0) {
        y = tmp;
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
    // split string by ';'
    var string = document.getElementById(elementID).value;
    cssProperties = string.split(';');
}

/**
 * update the html element and its style (x,y)
 */
function updateSquare() {
    // test
    var index = x + (y * 4);

    var	nodelist = document.getElementsByTagName("td");
    //nodelist[index].style.backgroundColor = "red";
    nodelist[index].innerHTML = textInput;

    // split key and value of the css proprties in the list by ':'

    nodelist[index].setAttribute("style", cssProperties[0]);

    //for (var i = 0; i < cssProperties.length; i++) {
    //    nodelist[index].style.backgroundColor = cssProperties[i] ;
    //}

}

