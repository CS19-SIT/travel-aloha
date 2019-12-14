$(document).ready(() => {
  $("#admin-hotel").submit(function(event) {
    event.preventDefault();
    var isEdit = $(this).attr("data-isedit") === "true";
    var hotelNumber = $("#hotelId").val();
    var formData = $(this).serialize();
    $.ajax({
      url: isEdit ? "/admin/hotel/" + hotelNumber : "/admin/hotel",
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

function deleteHotel(hotelNumber) {
  var isSure = confirm("Are you sure to delete " + hotelNumber + "?");
  if (isSure) {
    $.ajax({
      url: "/admin/hotel/" + hotelNumber,
      method: "DELETE",
      success: function(data) {
        alert(hotelNumber + " deleted!");
        location.reload();
      },
      error: function(data) {
        console.log("ERR: " + data);
      }
    });
  }
}
