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