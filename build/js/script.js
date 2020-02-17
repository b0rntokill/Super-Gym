const getRebootProtection = (inputFields) => {
  if (window.localStorage) {
    let elements = document.querySelectorAll(inputFields);
    let storage = {};
    let checkStorage = JSON.parse(localStorage.getItem(`inputMemory`));
    checkStorage !== null ? storage = checkStorage : console.log(`Казна пуста, милорд`);
    Array.from(elements).forEach((element) => {
      let name = element.getAttribute(`name`);
      element.value = storage[name] || ``;
      element.onkeyup = function () {
        storage[name] = element.value;
        localStorage.setItem(`inputMemory`, JSON.stringify(storage));
      };
    });
  }
};

const setPhoneMask = (phoneMask, fields) => {
  const maskOptions = {mask: phoneMask};
  let elements = document.querySelectorAll(fields);
  Array.from(elements).forEach((element) => {
    let mask = IMask(element, maskOptions);
  });
};

getRebootProtection(`input`);
setPhoneMask(`+{7}(000)000-00-00`, `input[type="tel"]`);

