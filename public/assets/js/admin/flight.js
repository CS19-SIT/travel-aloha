$(document).ready(() => {
  $("#admin-flight").submit(function(event) {
    event.preventDefault();
    var isEdit = $(this).attr("data-isedit") === "true";
    var flightNumber = $("#flightNumber").val();
    var formData = $(this).serialize();
    $.ajax({
      url: isEdit ? "/admin/flight/" + flightNumber : "/admin/flight",
      method: isEdit ? "PUT" : "POST",
      data: formData,
      processData: false,
      success: function(data) {
        alert("Data updated!");
        location.reload();
      },
      error: function(data) {
        console.log("ERR: " + data);
      }
    });
  });
});

function deleteFlight(flightNumber) {
  var isSure = confirm("Are you sure to delete " + flightNumber + "?");
  if (isSure) {
    $.ajax({
      url: "/admin/flight/" + flightNumber,
      method: "DELETE",
      success: function(data) {
        alert(flightNumber + " deleted!");
        location.reload();
      },
      error: function(data) {
        console.log("ERR: " + data);
      }
    });
  }
}
