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
            renderGbAtStart(JSON.parse(this.responseText));
        }
    };
    xHttp.open("GET", vsrUrl, true);
    xHttp.send();
}

function renderGbAtStart(gbObject) {
    allGbEntries = gbObject;

    // process the js object
    for (var i = 0; i < allGbEntries.length; i++) {
        var newItem = createGbEntry(allGbEntries[i]);
        listTop.insertBefore(newItem, listTop.childNodes[0]);
    }
}

function createGbEntry(jsObject) {
    var liEntry = document.createElement("li");
    var divName = document.createElement("div");
    var divText = document.createElement("div");
    var xHref = document.createElement("a");

    divName.innerHTML = jsObject.name;
    divName.style.fontWeight = "bold";
    divText.innerHTML = jsObject.text;
    xHref.innerHTML = "(X)";
    xHref.href = "#";
    xHref.alt = "Delete entry";
    xHref.addEventListener("click", function () {
        // remove childs
        while (liEntry.firstChild) {
            liEntry.removeChild(liEntry.firstChild);
        }
        // after that remove the parent node (li)
        listTop.removeChild(liEntry);
    });

    liEntry.appendChild(divName);
    liEntry.appendChild(divText);
    liEntry.appendChild(xHref);
    return liEntry;
}
