
console.log("im from js file");
$( "#valid"  ).show(3000);

$( "#used" ).click(function() {
 $( "#usedCoupon" ).slideDown(3000);
 $("valid").hide();
};
$( "#valid" ).click(function() {
 $( "#valid" ).slideDown(3000);
 $("usedCoupon").hide();
};
// $( "div:hidden" ).show( 3000 );
// $( "#valid"  ).click(function () {
//   if ( $("#eachcoupon" ).first().is( ":hidden" ) ) {
//     $( "div" ).slideDown( "slow" );
//   } else {
//     $( "div" ).hide();
//   }
// });
