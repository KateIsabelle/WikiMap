// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function(e) {
$likeButton();


});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const $likeButton = function() {
  $('.fa-heart').click(function() {
    console.log("HEART CLICKED")
    $(this).toggleClass('liked');
  })
}
