const trainersSwiper = new Swiper(`.swiper-container`, {
  loop: true,
  navigation: {
    nextEl: `.trainers__slider-button-next`,
    prevEl: `.trainers__slider-button-prev`,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
    600: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    800: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 60,
    },
    830: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 70,
    },
    860: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 80,
    },
    900: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 95,
    },
    950: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 5,
    },
    1050: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
    },
    1100: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 25,
    },
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 25,
    },
    1250: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 30,
    },
    1300: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 40,
    },
    1450: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 10,
    },
  },
});
