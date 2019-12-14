var showRecord = [];
var showDetail;

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
function extractRecords(){
    for(let i = 0; i < allRecord.length; i++){
        showRecord.push(allRecord[i]);
    }
}

// Onload function
function loadPage() {
    extractRecords();

    if (showRecord.length > 0) {
        for(let i = 0; i < showRecord.length; i++){
            printRecordAt(i);
        }
    }
    else {
        document.getElementById("histList").innerHTML = "You don't have any history in your account.";
    }
}

//Rendering info
function printRecordAt(recAt) {
    var newHTML = html_1 + showRecord[recAt].hotelname + '<span style="color: brown"> (Show from JavaScript)</span>' +
        html_2 + showRecord[recAt].timestamp + html_3 + "paid" +
        html_4 + "Dummy" + html_5 + html_6 +
        html_7 + recAt + html_8;

    document.getElementById("histList").innerHTML += newHTML;
}

function clearHistList() {
    document.getElementById("histList").innerHTML = "";
}

function renderDetail(detailAt) {
    document.getElementById('detailContent').innerHTML = allRecord[detailAt].hotelname + "<br>" +
        allRecord[detailAt].hoteladdress + "<br>" + allRecord[detailAt].hotelTelNumber + '<br>' + allRecord[detailAt].timestamp;
    ;
}