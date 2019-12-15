$(document).ready(function() {
  $(".like, .dislike").on("click", function() {
    event.preventDefault();
    $(".active").removeClass("active");
    $(this).addClass("active");
  });
  $(".fa-question-circle").tooltip("enable");
});
