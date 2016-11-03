/**
 * Created by matthias on 02.11.16.
 */

var lastField = null;
var currentFillColor = ''; // ???
var changeCounter = 0;     // ???

var stdGrey = "rgb(238, 238, 238)"; // grey color: bad, because it is hard coded :(

/**
 * bug: have to click twice to change color of element
 * @param element contains the current html element
 */
function setField(element) {
    element.style.backgroundColor = (element.style.backgroundColor == stdGrey)? currentFillColor : stdGrey;

    changeCounter++;
    if (changeCounter == 10) {
        window.alert("You have clicked 10 times on the field!");
    }
}

/**
 * pick a color from a html element (css: background-color)
 * @param color is the value of the html element i clicked on, color should be a string
 */
function setFillColor(color) {
    // color should be a string
    currentFillColor = color;

    // create new element with name, text & color value
    var newText = document.createElement("newText");
    newText.innerHTML = "Color changed ";
    newText.style.color = currentFillColor;

    // append it to the div with the id "Log"
    document.getElementById("Log").appendChild(newText);
}
