/**
 * Created by matthias on 17.11.16.
 */

var listTop = {};
var allGbEntries;
var vsrUrl = "";

window.onload = function () {
    // init. variables
    listTop =document.getElementsByTagName("ul")[0];
    vsrUrl = document.getElementsByTagName("form")[0].action;

    // onLoad event
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // parse response from JSON in js object
            allGbEntries = JSON.parse(this.responseText);

            // process the js object
            for (var i = 0; i < allGbEntries.length; i++) {
                var newItem = document.createElement("li");
                var textNode = document.createElement("p");
                textNode.innerHTML = getTextFromJsObj(allGbEntries[i]);

                newItem.appendChild(textNode);
                listTop.insertBefore(newItem, listTop.childNodes[0]);
            }
        }
    };
    xHttp.open("GET", vsrUrl, true);
    xHttp.send();
}

function getTextFromJsObj(jsObject) {

    // TODO: find better solution, use dom navigation / element creating, append etc

    var string = "";
    string += "<strong>" + jsObject.name + "</strong> " + jsObject.text;
    return string;
}
