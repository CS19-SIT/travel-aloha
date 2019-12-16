(function() {
	var parent = document.querySelector(".range-slider");
	if (!parent) return;

	var rangeS = parent.querySelectorAll("input[type=range]"),
		numberS = parent.querySelectorAll("input[type=number]");

	rangeS.forEach(function(el) {
		el.oninput = function() {
			var slide1 = parseFloat(rangeS[0].value),
				slide2 = parseFloat(rangeS[1].value);

			if (slide1 > slide2) {
				[slide1, slide2] = [slide2, slide1];
				// var tmp = slide2;
				// slide2 = slide1;
				// slide1 = tmp;
			}

			numberS[0].value = slide1;
			numberS[1].value = slide2;
		};
	});

	numberS.forEach(function(el) {
		el.oninput = function() {
			var number1 = parseFloat(numberS[0].value),
				number2 = parseFloat(numberS[1].value);

			if (number1 > number2) {
				var tmp = number1;
				numberS[0].value = number2;
				numberS[1].value = tmp;
			}

			rangeS[0].value = number1;
			rangeS[1].value = number2;
		};
	});
})();

//Fav icon

var check_status = false;
var like_cnt = $("#like-cnt");
var like_parent = $(".like-container");

var burst = new mojs.Burst({
  parent: like_parent,
  radius:   { 20: 60 },
  count: 15,
  angle:{0:30},
  children: {
    delay: 250,
    duration: 700,
    radius:{10: 0},
    fill:   [ '#ddca7e' ],
    easing: 		mojs.easing.bezier(.08,.69,.39,.97)
  }
});

$("#like-cnt").click(function(){
  var t1 = new TimelineLite();
  var t2 = new TimelineLite();
  if(!check_status){
    t1.set(like_cnt, {scale:0});
    t1.set('.like-btn', {scale: 0});
    t1.to(like_cnt, 0.6, {scale:1, background: '#ddca7e',ease: Expo.easeOut});
    t2.to('.like-btn', 0.65, {scale: 1, ease: Elastic.easeOut.config(1, 0.3)}, '+=0.2');
//    t1.timeScale(5);
    check_status=true;
    //circleShape.replay();
    burst.replay();
  }
  else{
    t1.to(like_cnt, 1, {scale:1})
      .to(like_cnt, 1, {scale:1, background: 'rgba(255,255,255,0.3)', ease: Power4.easeOut});
    t1.timeScale(7);
    check_status=false;
  }
  
})
//

$( document ).ready(function() {
var scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
   var el = document.querySelector('.button'),
	// mo.js timeline obj
	timeline = new mojs.Timeline(),

	// tweens for the animation:

	// burst animation
	tween1 = new mojs.Burst({
		parent: el,
  radius:   { 0: 100 },
  angle:    { 0: 45 },
  y: -10,
  count:    10,
   radius:       100,
  children: {
    shape:        'circle',
    radius:       30,
    fill:         [ 'red', 'white' ],
    strokeWidth:  15,
    duration:     500,
  }
	});


	tween2 = new mojs.Tween({
		duration : 900,
		onUpdate: function(progress) {
			var scaleProgress = scaleCurve(progress);
			el.style.WebkitTransform = el.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
		}
	});
  		tween3 = new mojs.Burst({
		parent: el,
  radius:   { 0: 100 },
  angle:    { 0: -45 },
  y: -10,
  count:    10,
   radius:       125,
  children: {
    shape:        'circle',
    radius:       30,
    fill:         [ 'white', 'red' ],
    strokeWidth:  15,
    duration:     400,
  }
	});

// add tweens to timeline:
timeline.add(tween1, tween2, tween3);


// when clicking the button start the timeline/animation:
$( ".button" ).click(function() {
	if ($(this).hasClass('active')){
		$(this).removeClass('active');
	}else{
  timeline.play();
  $(this).addClass('active');
	}
});


});

  $(".heart.fa").click(function() {
	$(this).toggleClass("fa-heart fa-heart-o");
  });
  