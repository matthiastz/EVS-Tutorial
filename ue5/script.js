/**
 * Created by matthias on 24.11.16.
 */

var nameInput;
var nameList;
var tableCss;
var rowId = "nameRow";
var MAX_NAME_SIZE = 100;

$(document).ready(function(){
    tableCss = {"border": "1px solid black", "border-collapse": "collapse"};
    nameInput = $("#name");
    nameList = $("#nameList");
    nameList.css(tableCss);


    // event for buttons
    $("#add").click(addEntry);
    $("#sort").click(sortEntries);

});

function addEntry() {
    // empty input field
    if (nameInput.val() === "") {
        window.alert("please enter a name");
    } else {

        if (nameInput.val().length > MAX_NAME_SIZE) {
            alert("input name length must be <= " + MAX_NAME_SIZE);
            return;
        }

        var tmpEl = $("<tr></tr>");
        tmpEl.css(tableCss);
        tmpEl.attr("id", rowId);

        // text td
        var namEl = $("<td></td>").text(nameInput.val());

        // buttons
        var up = $("<button></button>").text("up");
        up.click(function () {
            pushUp(tmpEl.prev(), tmpEl);
        });

        var down = $("<button></button>").text("down");
        down.click(function () {
            pushDown(tmpEl.next(), tmpEl);
        });

        // append parts to tempEl (tr) -> pass it to nameList (table)
        tmpEl.append(namEl, up, down);
        nameList.append(tmpEl);
    }
}

function pushUp(a, b) {
    // prevent to swap the table header
    if (a.find("th").length === 0) {
        a.before(b);
    }
}

function pushDown(a, b) {
    // $(tmpEl.next()).after(tmpEl);
    a.after(b);
}

function sortEntries() {

    // all elements, first excluded (table header)
    var nameRows = $("tr").first().nextAll();
    var n = nameRows.length;

    // bubbleSort
    for (var j = 0; j < n; j++) {

        var elemA = nameRows.first();
        var elemB = elemA.next();

        for (var i = 0; i < n; i++) {
            var textA = elemA.children("td").html();
            var textB = elemB.children("td").html();

            // swap elements
            if (textA > textB) {
                elemB.after(elemA);
            }

            elemA = elemA.next();
            elemB = elemA.next();
        }
    }
}
