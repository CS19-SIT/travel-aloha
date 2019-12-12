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
  var max_fields_limit      = 8; //set limit for maximum input fields
  var x = 1; //initialize counter for text box
  $('.add_more_button').click(function(e){ //click event on add more fields button having class add_more_button
      e.preventDefault();
      if(x < max_fields_limit){ //check conditions
          x++; //counter increment
          $('.input_fields_container_part').append('<div><input type="text" name="tags"/><a href="#" class="remove_field" style="margin-left:10px;">Remove</a></div>'); //add input field
      }
  });  
  $('.input_fields_container_part').on("click",".remove_field", function(e){ //user click on remove text links
      e.preventDefault(); $(this).parent('div').remove(); x--;
  })
});