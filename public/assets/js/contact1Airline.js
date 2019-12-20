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
  
var numberSeatType = 1; 

function add(){
    if(numberSeatType < 3){
      document.getElementById('field' + (numberSeatType+1)).style.display = "flex"
      numberSeatType++;
    }
  }
  function remove(){
    if(numberSeatType > 1){
      document.getElementById('field' + numberSeatType).style.display = "none"
      --numberSeatType;
    }
  }

  function checkingAirline(validType1, validType2, validType3) {
    for (let i = 1; i <= numberSeatType; ++i) {
      if (!document.getElementById('field' + i).getElementsByClassName('form-control')[1].value) {
        alert('Insert Your Airline Min Prices');
        return false;
      }
      if( !document.getElementById('field' + i).getElementsByClassName('form-control')[2].value) {
        alert('Insert Your Airline Max Prices')
        return false;
      }
      if (validType1[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] != 0) {
        alert('Change Your Seat Type');
        return false;
      }
      validType1[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] = 
        parseInt(document.getElementById('field' + i).getElementsByClassName('form-control')[1].value, 10);
      validType2[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] = 
        parseInt(document.getElementById('field' + i).getElementsByClassName('form-control')[2].value, 10);
      validType3[document.getElementById('field' + i).getElementsByClassName('form-control')[0].value - 1] = 
        document.getElementById('field' + i).getElementsByClassName('custom-file-input')[0].value;
    }
    return true;
  }
  
  function submitForm() {
    let validType1 = [0, 0, 0]
    let validType2 = [0, 0, 0]
    let validType3 = ["","",""]
    let checking = [3, 2, 1]
    if (checkingAirline(validType1,validType2,validType3)) {
      for (let i = 1; i <= 3; ++i) {
        document.getElementById('field' + i).style.display = "flex";
        if (i <= numberSeatType) {
          document.getElementById('field' + i).getElementsByClassName('custom-file-input')[0].name = "airlineSeatTypePicture" + document.getElementById('field' + i).getElementsByClassName('form-control')[0].value;
          checking.splice(checking.indexOf(parseInt(document.getElementById('field' + i).getElementsByClassName('form-control')[0].value, 10)), 1);
        } else {
          document.getElementById('field' + i).getElementsByClassName('custom-file-input')[0].name = "airlineSeatTypePicture" + checking.pop()
        }
        // console.log(checking)
        document.getElementById('field' + i).getElementsByClassName('form-control')[0].selectedIndex = i;
        document.getElementById('field' + i).getElementsByClassName('form-control')[1].value = validType1[i - 1];
        document.getElementById('field' + i).getElementsByClassName('form-control')[2].value = validType2[i - 1];
      }
        document.getElementById("addNewAirline").submit();
    }
  }