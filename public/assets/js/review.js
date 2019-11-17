$(document).ready(function(){
//star rating
    $(".my-rating").starRating({
    initialRating: 0,
    strokeColor: 'yellow',
    strokeWidth: 10,
    starSize: 25,
    useGradient: true,
    onHover: function(currentIndex, currentRating, $el){
        $('.live-rating').text(currentIndex);
      },
    onLeave: function(currentIndex, currentRating, $el){
        $('.live-rating').text(currentRating);
      }
  });
  $(".my-rating-2").starRating({
    initialRating: 0,
    strokeColor: 'yellow',
    strokeWidth: 10,
    starSize: 25,
    useGradient: true,
    onHover: function(currentIndex, currentRating, $el){
        $('.live-rating-2').text(currentIndex);
      },
    onLeave: function(currentIndex, currentRating, $el){
        $('.live-rating-2').text(currentRating);
      }
  });
  $(".my-rating-3").starRating({
    initialRating: 0,
    strokeColor: 'yellow',
    strokeWidth: 10,
    starSize: 25,
    useGradient: true,
    onHover: function(currentIndex, currentRating, $el){
        $('.live-rating-3').text(currentIndex);
      },
    onLeave: function(currentIndex, currentRating, $el){
        $('.live-rating-3').text(currentRating);
      }
  });
  $(".my-rating-4").starRating({
    initialRating: 0,
    strokeColor: 'yellow',
    strokeWidth: 10,
    starSize: 25,
    useGradient: true,
    onHover: function(currentIndex, currentRating, $el){
        $('.live-rating-4').text(currentIndex);
      },
    onLeave: function(currentIndex, currentRating, $el){
        $('.live-rating-4').text(currentRating);
      }
  });
  $(".my-rating-5").starRating({
    initialRating: 0,
    strokeColor: 'yellow',
    strokeWidth: 10,
    starSize: 25,
    useGradient: true,
    onHover: function(currentIndex, currentRating, $el){
        $('.live-rating-5').text(currentIndex);
      },
    onLeave: function(currentIndex, currentRating, $el){
        $('.live-rating-5').text(currentRating);
      }
  });
  
});
