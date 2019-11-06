<<<<<<< HEAD
var htmlContent_1 = ' <div class="history-item"><div class="headerInfo"><span class="left"><div><h5><b>';
var htmlContent_2 = '</b></h5></div><div><h6>';
var htmlContent_3 = '</h6></div></span><span class="right"><div class="child"><a href="#"><button type="button" class="btn-link">View details</button></a></div></span><span class="icon"><div class="bed-icon"><img src="';
var htmlContent_4 = '" width="30px" height="30px"></div></span></div></div>';

var nameHeader = ["KFC Airline - VIP", "Poseidon", "GG Hotel", "Lorem Ipsum Airline"];
var dateHeader = ["30-10-2019", "21-10-2019", "30-09-2019", "01-01-2018"];
var timeHeader = ["1:00", "15:46", "18:11", "00:23"];
var bookType = [1, 0, 0, 1];

console.log('test');
var icon = ["bed_icon.png", "plane_icon.png"];

function onloadTest(){
    alert(Hello);
}
function showDetail(){
    for(let i = 0; i < nameHeader.length; i++){
        var newHTML = htmlContent_1 + nameHeader[i] + '<span style="color: grey"> (Render from JavaScript)</span>' + htmlContent_2 +
        dateHeader[i] + ' | ' + timeHeader[i] + htmlContent_3 + icon[bookType[i]] + htmlContent_4;

        document.getElementById('histList').innerHTML += newHTML;
    }
=======
var htmlContent_1 = ' <div class="history-item"><div class="headerInfo"><span class="left"><div><h5><b>';
var htmlContent_2 = '</b></h5></div><div><h6>';
var htmlContent_3 = '</h6></div></span><span class="right"><div class="child"><a href="#"><button type="button" class="btn-link">View details</button></a></div></span><span class="icon"><div class="bed-icon"><img src="';
var htmlContent_4 = '" width="30px" height="30px"></div></span></div></div>';

var nameHeader = ["KFC Airline - VIP", "Poseidon", "GG Hotel", "Lorem Ipsum Airline"];
var dateHeader = ["30-10-2019", "21-10-2019", "30-09-2019", "01-01-2018"];
var timeHeader = ["1:00", "15:46", "18:11", "00:23"];
var bookType = [1, 0, 0, 1];

console.log('test');
var icon = ["bed_icon.png", "plane_icon.png"];

function onloadTest(){
    alert(Hello);
}
function showDetail(){
    for(let i = 0; i < nameHeader.length; i++){
        var newHTML = htmlContent_1 + nameHeader[i] + '<span style="color: grey"> (Render from JavaScript)</span>' + htmlContent_2 +
        dateHeader[i] + ' | ' + timeHeader[i] + htmlContent_3 + icon[bookType[i]] + htmlContent_4;

        document.getElementById('histList').innerHTML += newHTML;
    }
>>>>>>> e6d558d33bd6316b49e22414798c0ef3547237f8
}