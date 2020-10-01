const slider = $('.slider').bxSlider({
  pager:false,
  controls:false
});
$('.beat__arrow--left').click(e=>{
  e.preventDefault();
  slider.goToPrevSlide()

})
$('.beat__arrow--right').click(e=>{
  e.preventDefault();
  slider.goToNextSlide()

})

 
