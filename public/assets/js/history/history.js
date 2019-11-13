var statusClass = ["paid", "done", "canceled"];
var statusText = ["Paid - Trip Upcoming", "Done", "Canceled"];

/*ตรงนี้มี file path ไว้แก้ตอนเป็น ejs*/
var icon = ["../../../assets/img/bed_icon.png", "../../../assets/img/plane_icon.png"];
var iconClass = ["hotel", "flight"];


var html_1 = '<div class="history-item"><div class="headerInfo"><span class="brief-info"><div><h5><b>';
var html_2 = '</b></h5></div><div><h6>';
var html_3 = '</h6></div></span><span class="status ';
var html_4 = '">';

/*File Path*/
var html_5 = '</span><span class="icon"><div class="book-icon"><img src="';
var html_6 = '" class="';
var html_7 = '"></div></span><span class="toDetail"><a href="#"><button type="button" class="btn-link">View details</button></a></span></div></div>';
//==============================================================================================
//Parallel Arrays
var nameHeader = ["KFC Airline - VIP", "Poseidon", "GG Hotel", "Lorem Ipsum Airline"];
var dateHeader = ["30-10-2019", "21-10-2019", "30-09-2019", "01-01-2018"];
var timeHeader = ["01:00", "15:46", "18:11", "00:23"];
var statusCode = [0, 2, 1, 1]; /* 0 - 2 */
var bookType = [1, 0, 0, 1]; /* 0 - 1 */

//2D Array
var record = new Array(2); // 2 records
for (let i = 0; i < record.length; i++) {
    record[i] = new Array(5); // 5 properties of a record
}

record[0][0] = "Vice City Resort";
record[0][1] = "01-02-2015";
record[0][2] = "02:00";
record[0][3] = 1;
record[0][4] = 0;

record[1][0] = "Los Santos Airline";
record[1][1] = "10-02-2014";
record[1][2] = "13:00";
record[1][3] = 2;
record[1][4] = 1;


function renderRecord(i) {
    var newHTML = html_1 + record[i][0] + '<span style="color: brown"> (Show from JavaScript - 2D Array)</span>' + html_2 + record[i][1] + " | " +
        record[i][2] + html_3 + statusClass[record[i][3]] +
        html_4 + statusText[record[i][3]] + html_5 + icon[record[i][4]] + html_6 + iconClass[record[i][4]] + html_7;

    document.getElementById("histList").innerHTML += newHTML;
}

function renderItem(i) {
    var newHTML = html_1 + nameHeader[i] + '<span style="color: brown"> (Show from JavaScript)</span>' + html_2 + dateHeader[i] + " | " +
        timeHeader[i] + html_3 + statusClass[statusCode[i]] +
        html_4 + statusText[statusCode[i]] + html_5 + icon[bookType[i]] + html_6 + iconClass[bookType[i]] + html_7;

    document.getElementById("histList").innerHTML += newHTML;
}

function showDetail() {
    for (let i = 0; i < bookType.length; i++) {
        renderItem(i);
    }
    for(let i = 0; i < record.length; i++){
        renderRecord(i);
    }
}