//hidden selection
function optional() {
  var checkBox = document.getElementById("defaultCheck1");
  var x = document.getElementById("hiddenLogo");
  if (checkBox.checked == true) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

var numberHotelType = 1; 

function add(){
  if(numberHotelType < 6){
    document.getElementById('field' + (numberHotelType+1)).style.display = "flex"
    numberHotelType++;
  }
}
function remove(){
  if(numberHotelType > 1){
    document.getElementById('field' + numberHotelType).style.display = "none"
    --numberHotelType;
  }
}

function checkingHotel(validType1,validType2) {
  for (let i = 1; i <= numberHotelType; ++i) {
    if (!document.getElementById('field' + i).getElementsByClassName('form-control')[1].value) {
      alert('Insert Your Hotel Prices');
      return false;
    }
    if (validType1[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] != 0) {
      alert('Change Your Room Type');
      return false;
    }
    validType1[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] = 
      parseInt(document.getElementById('field' + i).getElementsByClassName('form-control')[1].value, 10);
    validType2[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] = document.getElementById('field' + i).getElementsByClassName('custom-file-input')[0].value;
  }
  return true;
}

function submitForm() {
  let validType1 = [0, 0, 0, 0, 0, 0]
  let validType2 = ["","","","","",""]
  let checking = [6, 5, 4, 3, 2, 1]
  if (checkingHotel(validType1,validType2)) {
    for (let i = 1; i <= 6; ++i) {
      document.getElementById('field' + i).style.display = "flex";
      if (i <= numberHotelType) {
        document.getElementById('field' + i).getElementsByClassName('custom-file-input')[0].name = "hotelRoomPicture" + document.getElementById('field' + i).getElementsByClassName('form-control')[0].value;
        checking.splice(checking.indexOf(parseInt(document.getElementById('field' + i).getElementsByClassName('form-control')[0].value, 10)), 1);
      } else {
        document.getElementById('field' + i).getElementsByClassName('custom-file-input')[0].name = "hotelRoomPicture" + checking.pop()
      }
      console.log(checking)
      document.getElementById('field' + i).getElementsByClassName('form-control')[0].selectedIndex = i;
      document.getElementById('field' + i).getElementsByClassName('form-control')[1].value = validType1[i - 1];
    }
      document.getElementById("addNewHotel").submit();
  }
}
