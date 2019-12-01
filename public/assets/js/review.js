$(document).ready(function(){
$('.like, .dislike').on('click', function() {
    event.preventDefault();
    $('.active').removeClass('active');
    $(this).addClass('active');
});
$("#hotelsend").submit(function(event) {
  event.preventDefault();
  $.ajax({
    url:"/review/hotel",
    method: "POST",
    data: { hotel_hotelId : "2"},
    type:json,
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