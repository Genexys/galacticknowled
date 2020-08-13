import VMasker from 'vanilla-masker';

const phoneMask = () => {

  VMasker(document.querySelector(".data-phone-input")).maskPattern("+9(999)999-99-99");

};

export {phoneMask};
