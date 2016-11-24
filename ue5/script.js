/**
 * Created by matthias on 24.11.16.
 */

var nameInput;
var nameList;
var tableCss;

$(document).ready(function(){
    tableCss = {"border": "1px solid black", "border-collapse": "collapse"};
    nameInput = $("#name");
    nameList = $("#nameList");
    nameList.css(tableCss);


    // event for add button
    $("#add").click(addEntry);

});

function addEntry() {
    // empty input field
    if (nameInput.val() === "") {
        window.alert("please enter a name");
    } else {
        var tmpEl = $("<tr></tr>");
        tmpEl.css(tableCss);

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
