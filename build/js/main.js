const getRebootProtection = (inputFields) => {
  if (window.localStorage) {
    let elements = document.querySelectorAll(inputFields);
    let storage = {};
    let checkStorage = JSON.parse(localStorage.getItem(`inputMemory`));
    checkStorage !== null ? storage = checkStorage : console.log(`Казна пуста, милорд`);
    for (let i = 0; i < elements.length; i++) {
      let name = elements[i].getAttribute(`name`);
      elements[i].value = storage[name] || ``;
      elements[i].onkeyup = function () {
        storage[name] = elements[i].value;
        localStorage.setItem(`inputMemory`, JSON.stringify(storage));
      };
    }
  }
};

const setPhoneMask = (phoneMask, fields) => {
  const maskOptions = {mask: phoneMask};
  let elements = document.querySelectorAll(fields);
  for (let i = 0; i < elements.length; i++) {
    let mask = IMask(elements[i], maskOptions);
  }
};

getRebootProtection(`input`);
setPhoneMask(`+{7}(000)000-00-00`, `input[type="tel"]`);

const trainersSwiper = new Swiper(`.trainers__slider`, {
  loop: true,
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 40,
  nextButton: `.trainers__slider-button-next`,
  prevButton: `.trainers__slider-button-prev`,
  breakpoints: {
    600: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 1,
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
    }
  },
});

const reviewsSwiper = new Swiper(`.reviews__slider`, {
  loop: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  nextButton: `.reviews__slider-button-next`,
  prevButton: `.reviews__slider-button-prev`
});
