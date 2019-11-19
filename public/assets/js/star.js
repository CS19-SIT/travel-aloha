//star function
function displayStar(dots,score){
    const allStar=Math.floor(score);
    const halfstar=(allStar<score);
    for(var i=1;i<=score;i++){
      $('div.dot-'+i,dots).addClass('green-dot');
    }
    if(halfstar){
      $('.dot-'+i,dots).addClass('yellow-dot');
    }
    for(var j=1;j<=5;j++){
    if(!$('.dot-'+i,dots).hasClass('green-dot')&&!$('.dot-'+i,dots).hasClass('yellow-dot')){
      $('.dot-'+i,dots).addClass('red-dot');
    }}
  }

function displaytextscore(score){
    if(score<2){
        $('#text').addClass('red-text');
    }
    else if(score>=2&&score<3.5){
        $('#text').addClass('yellow-text');
    }
    else{
        $('#text').addClass('green-text');
    }
}
var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;

rangeslider.oninput = function() {
  output.innerHTML = this.value;
}
