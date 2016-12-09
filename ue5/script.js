/**
 * Created by matthias on 24.11.16.
 */

var nameInput;
var nameList;
var tableCss;
var MAX_NAME_SIZE = 100;

$(document).ready(function(){
    tableCss = {"border": "1px solid black", "border-collapse": "collapse"};
    nameInput = $("#name");
    nameList = $("#nameList");

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
    // TODO: problem: names with starting capital letter will come before SMALL starting letter
    // TODO: also numbers could produce problems (use special order function for sort() )

    // all elements, first excluded (table header)
    var nameRows = $("tr").first().nextAll();

    var tempEl = nameRows.first()
    var namesArrayToSort = [];

    // extract the names and save it to an array
    for (var i = 0; i < nameRows.length; i++) {
        namesArrayToSort.push(tempEl.children("td").html());
        tempEl = tempEl.next();
    }

    // sort names
    namesArrayToSort.sort();

    // put the sorted name values in the table rows (update)
    var tempChange = nameRows.first();
    for (var i = 0; i < nameRows.length; i++) {
        tempChange.children("td").html(namesArrayToSort[i]);
        tempChange = tempChange.next();
    }
}
