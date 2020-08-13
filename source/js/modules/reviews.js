const reviews = () => {

  const reviewSlider = new Swiper(`.reviews__container`, {
    // loop: true,
    slidesPerView: 1,
    spaceBetween: 10,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    breakpoints: {
      1074: {
        slidesPerView: 3,
        spaceBetween: 10,
      },

      690: {
        slidesPerView: 2,
        spaceBetween: 10,
      }
    }
  });
};

export {reviews};
