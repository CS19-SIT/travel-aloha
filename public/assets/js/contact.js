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

$(document).ready(function() {
  $("#addButton1").click(function() {
    $("#field2").toggle();
  });
  $("#addButton2").click(function() {
    $("#field3").toggle();
  });
  $("#addButton3").click(function() {
    $("#field4").toggle();
  });
  $("#addButton4").click(function() {
    $("#field5").toggle();
  });
  $("#addButton5").click(function() {
    $("#field6").toggle();
  });
});
