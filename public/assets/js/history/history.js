var recordFrom = 0;
var recLimit = 12;
var statFilter = [true, true, true];
var typeFilter = [true, true];

var showRecord;
var showDetail;

var user = {
    userName: "rapgod1234",
    name: "Prayuth Chan-O-Cha",
    lvl: 5,
    point: 100,
    rank: 1
};

//Array data for use
var rank = ["Silver", "Gold"];
var rankClass = ["badge-silver", "badge-gold"];

var icon = ["bed_icon.png", "plane_icon.jpg"];
var iconClass = ["hotel", "flight"];
var detailLink = ["detail-hotel.html", "detail-flight.html"];

var statusClass = ["paid", "done", "canceled"];
var statusText = ["Paid - Trip Upcoming", "Done", "Canceled"];
//==============================================================================================
//HTML Assembling
/*ตรงนี้มี file path ไว้แก้ตอนเป็น ejs*/
var html_1 = '<div class="history-item"><div class="headerInfo"><span class="brief-info"><div><h5><b>';
var html_2 = '</b></h5></div><div><h6>';
var html_3 = '</h6></div></span><span class="status ';
var html_4 = '">';
var html_5 = '</span><span class="icon"><div class="book-icon"><img src="';     /*File Path*/
var html_6 = '" class="';
var html_7 = '"></div></span><span class="toDetail"><button type="button" onclick="renderDetail(';
var html_8 = ')" class="btn btn-info" data-toggle="modal"data-target="#detailModal">View details</button></span></div></div>';



//================================================================
//Show user info / Onload
function renderUser() {
    document.getElementById("userName").innerHTML = user.name;
    document.getElementById("userLvl").innerHTML = user.lvl;
    document.getElementById("userPoints").innerHTML = user.point;
    document.getElementById("userRank").innerHTML = rank[user.rank];

    document.getElementById("userRank").className += rankClass[user.rank];
}

// Onload function
function loadPage() {
    alert(x);
    alert(allRecord[0].name + allRecord[2]);
    renderUser();
    if (allRecord.length > 0) {
        showByFilter();
        document.getElementById('filter').innerHTML = '<div class="filter-check"><input type="checkbox" id="paidCheck" checked><b class="status paid"> Paid</b><br><input type="checkbox" id="doneCheck" checked><b class="status done"> Done</b><br><input type="checkbox" id="cancelCheck" checked><b class="status canceled"> Canceled</b></div><div class="filter-type"> <input type="checkbox" id="hotelCheck" style="margin-bottom: 10px;" checked><b> Show Hotels</b><br><input type="checkbox" id="flightCheck" checked><b> Show Flights</b></div><div class="filter-button"><button class="btn btn-primary" onclick="showByFilter()">Show by filter</button></div>';
    }
    else {
        document.getElementById("pager").innerHTML = "";
        document.getElementById("filter").innerHTML = "You don't have any history in your account.";
    }
}
function printRecFrom(start) {
    clearHistList();
    var end = start + recLimit;
    for (let i = start; i < end && i < showRecord.length; i++) {
        printRecordAt(i);
    }
}

//Rendering info
function printRecordAt(recAt) {
    var newHTML = html_1 + showRecord[recAt].name + '<span style="color: brown"> (Show from JavaScript)</span>' +
        html_2 + getTimeString(showRecord[recAt].timeStamp) + html_3 + statusClass[showRecord[recAt].stat] +
        html_4 + statusText[showRecord[recAt].stat] + html_5 + icon[showRecord[recAt].type] + html_6 + iconClass[showRecord[recAt].type] +
        html_7 + recAt + html_8;

    document.getElementById("histList").innerHTML += newHTML;
}

//Filter Button
function showByFilter() {
    statFilter[0] = document.getElementById("paidCheck").checked;
    statFilter[1] = document.getElementById("doneCheck").checked;
    statFilter[2] = document.getElementById("cancelCheck").checked;

    typeFilter[0] = document.getElementById("hotelCheck").checked;
    typeFilter[1] = document.getElementById("flightCheck").checked;

    showRecord = [];
    showDetail = [];

    for (let i = 0; i < allRecord.length; i++) {
        var stCode = allRecord[i].stat;
        var typeCode = allRecord[i].type;

        if (statFilter[stCode] && typeFilter[typeCode]) {
            showRecord.push(allRecord[i]);
            showDetail.push(allDetail[i]);
        }
    }

    recordFrom = 0;
    printRecFrom(recordFrom);
}

//Time function
function getTimeString(sqlTime) {
    var histDate = new Date(sqlTime * 1000);

    var date = histDate.getDate();
    var month = (histDate.getMonth() + 1).toString();
    var year = histDate.getFullYear().toString();
    var hours = histDate.getHours().toString();
    var min = histDate.getMinutes().toString();


    return date + "-" + twoDigits(month) + "-" + year + " | " + twoDigits(hours) + ":" + twoDigits(min);
}
function twoDigits(numStr) {
    if (numStr.length == 1) {
        return "0" + numStr;
    }
    return numStr;
}

function clearHistList() {
    document.getElementById("histList").innerHTML = "";
}

//Pager function
function oldRec() {
    if (recordFrom + recLimit < showRecord.length) {
        recordFrom += recLimit;
        printRecFrom(recordFrom);
    } else {
        alert("These are the oldest records");
    }
}
function newRec() {
    if (recordFrom - recLimit >= 0) {
        recordFrom -= recLimit;
        printRecFrom(recordFrom);
    }
    else {
        alert("These are the newest records");
    }
}

function renderDetail(detailAt) {
    document.getElementById('detailContent').innerHTML = showDetail[detailAt];
}