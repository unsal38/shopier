//////  SWİPER /////////
$(() => {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: "#index .swiper-button-next",
      prevEl: "#index .swiper-button-prev",
    },
  });
  function mySwiper1(slidesPerView) {
    var swiper = new Swiper(".mySwiper1", {
      slidesPerView,
      spaceBetween: 30,
      navigation: {
        nextEl: "#blog .swiper-button-next",
        prevEl: "#blog .swiper-button-prev",
      },
    });
  }
  
  $(window).resize(function () {
    const document_with = $(window).width();
    if (document_with < 1000) mySwiper1(2)
    if (document_with > 1000) mySwiper1(3)
  });
  const document_with = $(window).width();
  if (document_with < 1000) mySwiper1(2)
  if (document_with > 1000) mySwiper1(3)

})
//////  SWİPER /////////