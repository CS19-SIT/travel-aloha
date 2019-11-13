<<<<<<< Updated upstream
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
=======
import getHotelName from "";

var allRecord = [
    {name: "Hotel A", timeStamp: 1573644567, stat: 0, type: 0},
    {name: "Hotel B", timeStamp: 1573599966, stat: 2, type: 1},
    {name: "Airline C", timeStamp: 1573635554, stat: 2, type: 1},
    {name: "Airline D", timeStamp: 1573611444, stat: 1, type: 1},
    {name: "Hotel E", timeStamp: 1572242267, stat: 1, type: 0},
    {name: "Hotel F", timeStamp: 1511144567, stat: 2, type: 1},
    {name: "Hotel G", timeStamp: 1500044567, stat: 0, type: 0}
];

var user = {
    userName: "rapgod1234",
    name: "Soap Yuri Captain Price",
    lvl: 5,
    point: 100,
    rank: 1
};

//Array data for use
var rank = ["Silver", "Gold"];
var rankClass = ["badge-silver", "badge-gold"];

var icon = ["bed_icon.png", "plane_icon.jpg"];
var iconClass = ["hotel", "flight"];
var detailLink = ["detail-hotel.html","detail-flight.html"];

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
var html_7 = '"></div></span><span class="toDetail"><a href="';                 /*File Path*/
var html_8 = '"><button type="button" class="btn-link">View details</button></a></span></div></div>';


//================================================================
//Show user info / Onload
function renderUser() {
    document.getElementById("userName").innerHTML = user.name;
    document.getElementById("userLvl").innerHTML = user.lvl;
    document.getElementById("userPoints").innerHTML = user.point;
    document.getElementById("userRank").innerHTML = rank[user.rank];

    document.getElementById("userRank").className += rankClass[user.rank];
}
function printAllRec(){
    allRecord.forEach(printRecordObj);
}
// Onload function
function showDetail() {
    renderUser();
    printAllRec();
}

//Rendering info
function printRecordObj(recObj) {
    printItem(recObj.name, getTimeString(recObj.timeStamp), recObj.stat, recObj.type);
}
function printItem(name, dateTime, stat, type) {
    var newHTML = html_1 + name + '<span style="color: brown"> (Show from JavaScript)</span>' +
        html_2 + dateTime + html_3 + statusClass[stat] +
        html_4 + statusText[stat] + html_5 + icon[type] + html_6 + iconClass[type] +
        html_7 + detailLink[type] + html_8;

    document.getElementById("histList").innerHTML += newHTML;
}




//Filter Button
function showByFilter(){
    document.getElementById("histList").innerHTML = "";
    //Clear old list

    var paidCheck = document.getElementById("paidCheck");
    var doneCheck = document.getElementById("doneCheck");
    var cancelCheck = document.getElementById("cancelCheck");

    var statCheck = new Array(3);
    statCheck[0] = paidCheck.checked;
    statCheck[1] = doneCheck.checked;
    statCheck[2] = cancelCheck.checked;

    var filterData = new Array(0);
    for(let i = 0; i < record.length; i++){
        if(paidCheck[record[i][3]]){
            renderSubRecord(i);
        }
    }
}

//Time function
function getTimeString(sqlTime){
    var histDate = new Date(sqlTime * 1000);

    var date = histDate.getDate();
    var month = (histDate.getMonth() + 1).toString();
    var year = histDate.getFullYear().toString();
    var hours = histDate.getHours().toString();
    var min = histDate.getMinutes().toString();


    return date + "-" + month + "-" + year + " | " + twoDigits(hours) + ":" + twoDigits(min);
}
function twoDigits(numStr){
    if(numStr.length == 1){
        return "0" + numStr;
>>>>>>> Stashed changes
    }
    return numStr;
}
