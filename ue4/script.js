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

    // event listener
    document.getElementsByTagName("button")[0].addEventListener("click", function (event) {
            event.preventDefault(); // prevent new load?!
            SubmitEntry();
    });

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

function renderGbAtStart(gbResponse) {
    allGbEntries = gbResponse;

    // process the js object
    for (var i = 0; i < allGbEntries.length; i++) {
        var tmp = allGbEntries[i];
        var newItem = createGbEntry(tmp.id, tmp.name, tmp.text);
        listTop.insertBefore(newItem, listTop.childNodes[0]);
    }
}

function createGbEntry(id, name, text) {
    var liEntry = document.createElement("li");
    var divName = document.createElement("div");
    var divText = document.createElement("div");
    var xHref = document.createElement("a");

    divName.innerHTML = String(name);
    divName.style.fontWeight = "bold";
    divText.innerHTML = String(text);
    xHref.innerHTML = "(X)";
    xHref.href = "#";
    xHref.alt = "Delete entry";
    xHref.addEventListener("click", function () {
        removeElement(liEntry, String(id));
    });

    liEntry.appendChild(divName);
    liEntry.appendChild(divText);
    liEntry.appendChild(xHref);
    return liEntry;
}

function removeElement(liEntry, id) {
    // delete entry from remote gb
    var idPara = "id=" + id;
    var xHttpR = new XMLHttpRequest();
    xHttpR.open("DELETE", vsrUrl + "?" + idPara, true);
    xHttpR.send();

    // remove childs ("local")
    while (liEntry.firstChild) {
        liEntry.removeChild(liEntry.firstChild);
    }
    // after that remove the parent node (li)
    listTop.removeChild(liEntry);
}

function SubmitEntry() {
    var nameV = encodeURIComponent(document.getElementById("name").value);
    var textV = encodeURIComponent(document.getElementById("text").value);
    var toSend = "name=" + nameV + "&text=" + textV;

    // error cases
    if (nameV === "") {
        alert("Please provide a name.");
        return;
    }
    if (textV === "") {
        alert("Please provide some text.");
        return;
    }

    var xHttp = new XMLHttpRequest();
    xHttp.open("POST", vsrUrl, true);
    xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xHttp.onreadystatechange = function () {
        var resp;
        if (this.readyState == 4 && this.status == 200) {

            resp = JSON.parse(this.responseText);

            // append Entry
            var newItem = createGbEntry(resp.id, nameV, textV);
            listTop.insertBefore(newItem, listTop.childNodes[0]);
        }
    };

    xHttp.send(toSend);
}
