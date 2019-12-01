$(document).ready(function(){
$('.like, .dislike').on('click', function() {
    event.preventDefault();
    $('.active').removeClass('active');
    $(this).addClass('active');
});
$('#hotelsend').click(function(){
  $.get("/review/hotel",{
    hotel_hotelId:"55"
  },
  function(data,status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});

});