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

function checky(validType) {
  for (let i = 1; i <= numberHotelType; ++i) {
    if (!document.getElementById('field' + i).getElementsByClassName('form-control')[1].value) {
      alert('Insert Your Hotel Prices');
      return false;
    }
    if (validType[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] != 0) {
      alert('Change Your Room Type');
      return false;
    }
    validType[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] = parseInt(document.getElementById('field' + i).getElementsByClassName('form-control')[1].value, 10);
  }
  return true;
}

function submitForm() {
  let validType = [0, 0, 0, 0, 0, 0]
  if (checky(validType)) {
    for (let i = 1; i <= 6; ++i) {
      document.getElementById('field' + i).style.display = "flex";
      document.getElementById('field' + i).getElementsByClassName('form-control')[0].selectedIndex = i;
      document.getElementById('field' + i).getElementsByClassName('form-control')[1].value = validType[i - 1];
    }
    document.getElementById("addNewHotel").submit();
  }
}
