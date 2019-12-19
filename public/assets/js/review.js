function summit(){
    $('#exampleModal').modal('hide');
    window.location.reload(true); 
}
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

function avg(p1){
    let sum=0;
    let avg=0;
    for(var i = 0; i < p1.length; i++) {
         sum += p1[i];
    }
    avg=sum/p1.length;
    return avg;
}
function counting(p1){
    let fantasticCount=0;
    let VeryGoodCount=0;
    let SatisfyingCount=0;
    let AverageCount=0;
    let PoorCount=0;
    for(var i = 0; i < p1.length; i++) {
         if(p1[i]<10&&p1[i]>9){
            fantasticCount++;
         }
         else if(p1[i]<9&&p1[i]>8){
            VeryGoodCount++;
         }
         else if(p1[i]<8&&p1[i]>7){
            SatisfyingCount++;
         }
         else if(p1[i]<7&&p1[i]>6){
            AverageCount++;
         }
         else{
            PoorCount++;
         }

    }
    return fantasticCount,VeryGoodCount,SatisfyingCount,AverageCount,PoorCount;
}