import {findPos} from "./findPos";

const goToBtn = () => {
  const btnLearnMore = function () {
    const btnItems = document.querySelectorAll(`.btn-action`);
    const contentItems = document.querySelectorAll(`.data-content`);

    for (const item of btnItems) {
      const tabId = item.dataset.btnScroll;

      for (const content of contentItems) {

        const contentId = content.dataset.content;

        item.addEventListener(`click`, function (e) {
          if (tabId === contentId) {
            window.scroll({top: findPos(content) - 100, left: 0, behavior: `smooth`});
          }
        });
      }
    }
  };

  btnLearnMore();

  const spyScrolling = () => {
    const sections = document.querySelectorAll(`section.data-content`);
    const menuLinks = document.querySelectorAll(`a.btn-action`);
    const makeActive = (link) => {
      const activeLink = Array.from(menuLinks).filter((el) => el.dataset.btnScroll === link);

      if (activeLink[0]) {
        activeLink[0].classList.add(`header__item-link--active`)
      }
    };
    const removeActive = (link) => {
      if (menuLinks[link]) {
        menuLinks[link].classList.remove(`header__item-link--active`)
      }
    };
    const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));
    const sectionMargin = 200;
    let currentIndex;

    window.addEventListener(`scroll`, () => {
      // const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1
      const findSection = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1;

      if (!sections[findSection]) {
        currentIndex = 99;
        for (const linkItem of menuLinks) {
          linkItem.classList.remove(`header__item-link--active`)
        }
      } else {
        const currentSection = sections[findSection].dataset.content;

        if (findSection !== currentIndex) {
          removeAllActive();
          currentIndex = findSection;
          makeActive(currentSection);
        }
      }
    });
  };
  spyScrolling();


  const scrollToBtn = document.querySelector(`.scroll-up-btn`);

  scrollToBtn.addEventListener(`click`, () => {
    window.scroll({top: 0, left: 0, behavior: `smooth`});
  });

  window.addEventListener(`scroll`, () => {
    if (window.scrollY > 400) {
      scrollToBtn.classList.add(`scroll-up-btn__visible`);
    } else {
      scrollToBtn.classList.remove(`scroll-up-btn__visible`);
    }
  });


};

export {goToBtn};
