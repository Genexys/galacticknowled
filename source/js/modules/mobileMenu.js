const mobileMenu = () => {
  const button = document.querySelector(`.mobile-button`);
  const buttonInner = button.querySelector(`.mobile-button__inner`);
  const menu = document.getElementById(`header-nav`);
  const menuList = menu.querySelector(`.header__list-menu`);
  const menuLink = menu.querySelector(`.header__item-link`);
  const menuItem = menu.querySelector(`.header__item-menu`);

  document.body.addEventListener(`click`, (e) => {
    if (!menu.classList.contains(`header__nav--open`) && e.target === button || e.target === buttonInner) {
      menu.classList.add(`header__nav--open`);
    } else {
      menu.classList.remove(`header__nav--open`);
    }
  });
};

export {mobileMenu};
