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
