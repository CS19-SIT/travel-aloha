var showRecord_hotel = [];
var showRecord_flight = [];


//Array data for use
var rank = ["Silver", "Gold"];
var rankClass = ["badge-silver", "badge-gold"];

var icon = ["bed_icon.png", "plane_icon.jpg"];
var iconClass = ["hotel", "flight"];

var statusClass = ["paid", "done", "canceled"];
var statusText = ["Paid - Trip Upcoming", "Done", "Canceled"];

//==============================================================================

var html_1 = '<div class="history-item"><div class="headerInfo"><span class="brief-info"><div><h5><b>';
var html_2 = '</b></h5></div><div><h6>';
var html_3 = '</h6></div></span><span class="status ';
var html_4 = '">';
var html_5 = '</span><span class="icon"><div class="book-icon">';
var html_6 = ''; // Unused
var html_7 = '</div></span><span class="toDetail"><button type="button" onclick="';
var html_7A = ["renderDetail_hotel(", "renderDetail_flight("];
var html_8 = ')" class="btn btn-info" data-toggle="modal"data-target="#detailModal">View details</button></span></div></div>';



//================================================================
//Show user info / Onload
function extractRecords(){
    for(let i = 0; i < allRecord_hotel.length; i++){
        showRecord_hotel.push(allRecord_hotel[i]);
    }
    for(let i = 0; i < allRecord_flight.length; i++){
        showRecord_flight.push(allRecord_flight[i]);
    }
}

function removeDuplicates(){
    for(let i = 0; i < showRecord_hotel.length; i++){
        if(showRecord_hotel[i] != null){
            for(let j = i + 1; j < showRecord_hotel.length; j++){
                if(showRecord_hotel[i].bookingId_detail == showRecord_hotel[j].bookingId_detail){
                    showRecord_hotel[j] = null;
                }
            }
        }
    }
    let newArr = [];
    for(let i = 0; i < showRecord_hotel.length; i++){
        if(showRecord_hotel[i] != null){
            newArr.push(showRecord_hotel[i]);
        }
    }

    showRecord_hotel = newArr;

//========================
    for(let i = 0; i < showRecord_flight.length; i++){
        if(showRecord_flight[i] != null){
            for(let j = i + 1; j < showRecord_flight.length; j++){
                if(showRecord_flight[i].booking_ref == showRecord_flight[j].booking_ref){
                    showRecord_flight[j] = null;
                }
            }
        }
    }
    newArr = [];
    for(let i = 0; i < showRecord_flight.length; i++){
        if(showRecord_flight[i] != null){
            newArr.push(showRecord_flight[i]);
        }
    }
    showRecord_flight = newArr;

}

// Onload function
function loadPage() {
    extractRecords();

    removeDuplicates();

    if (showRecord_hotel.length > 0 || showRecord_flight.length > 0) {
        for(let i = 0; i < showRecord_hotel.length; i++){
            printRecordAt_hotel(i);
        }
        for(let i = 0; i < showRecord_flight.length; i++){
            printRecordAt_flight(i);
        }
    }
    else {
        document.getElementById("histList").innerHTML = "You don't have any history in your account.";
    }
}

//Rendering info
function printRecordAt_hotel(recAt) {
    var newHTML = html_1 + showRecord_hotel[recAt].hotelname + '<span style="color: brown"> (Show from JavaScript)</span>' +
        html_2 + showRecord_hotel[recAt].timestamp + html_3 + "done" +
        html_4 + "Hotel" + html_5 + html_6 +
        html_7 + html_7A[0] + recAt + html_8;

    document.getElementById("histList").innerHTML += newHTML;
}

function printRecordAt_flight(recAt) {
    var newHTML = html_1 + showRecord_flight[recAt].airlineName + " " + showRecord_flight[recAt].flight_number +'<span style="color: brown"> (Show from JavaScript)</span>' +
        html_2 + showRecord_flight[recAt].book_date + html_3 + "done" +
        html_4 + "Hotel" + html_5 + html_6 +
        html_7 + html_7A[1] + recAt + html_8;

    document.getElementById("histList").innerHTML += newHTML;
}


function clearHistList() {
    document.getElementById("histList").innerHTML = "";
}


function renderDetail_hotel(detailAt) {
    document.getElementById('detailContent').innerHTML = showRecord_hotel[detailAt].hotelname + "<br>" +
        showRecord_hotel[detailAt].hoteladdress + "<br>" + showRecord_hotel[detailAt].hotelTelNumber + '<br>' +
        showRecord_hotel[detailAt].timestamp;
    ;
}

function renderDetail_flight(detailAt) {
    document.getElementById('detailContent').innerHTML = showRecord_flight[detailAt].airlineName + "<br>" +
        showRecord_flight[detailAt].flight_Number + "<br>" + showRecord_flight[detailAt].book_date + '<br>' +
        showRecord_flight[detailAt].Departure + '<br>' + showRecord_flight[detailAt].Destination
        ;
}