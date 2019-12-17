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