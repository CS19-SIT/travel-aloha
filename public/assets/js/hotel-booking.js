$(document).ready(function() {
  $('#registerModal').modal('show');

  $('#toRegisterButton').click(function(){
    window.location.href = '/register'; //redirect to register page
  })
});
