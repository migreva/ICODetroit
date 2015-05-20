requirejs(["config"], function() {
    requirejs(["jquery", "subpage", "swiper"], function($, subpage, Swiper) {
      var mySwiper = new Swiper('.swiper-container', {
        "prevButton": ".swiper-button-prev",
        "nextButton": ".swiper-button-next"
      }); 
    });
});