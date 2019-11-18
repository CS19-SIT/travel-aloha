//star function
function displayStar(dots,score){
    const allStar=Math.floor(score);
    const halfstar=(allStar<score);
    const tStar=Math.ceil(5-score);
    for(var i=1;i<=score;i++){
      $('div.dot-'+i,dots).addClass('green-dot');
    }
    if(halfstar){
      $('.dot-'+i,dots).addClass('yellow-dot');
    }
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