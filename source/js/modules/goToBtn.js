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
            e.preventDefault();
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
      console.log(menuLinks)
      const activeLink = menuLinks.filter( el => el.dataset.btnScroll === link);

      console.log(activeLink.classList);

      // menuLinks[link].classList.add(`header__item-link--active`)
    };
    const removeActive = (link) => menuLinks[link].classList.remove(`header__item-link--active`);
    const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));
    const sectionMargin = 200;
    let currentIndex = 0;

    window.addEventListener(`scroll`, () => {
      // const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1
      const findSection = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1;
      const currentSection = sections[findSection].dataset.content;

      if (findSection !== currentIndex) {
      //   console.log(current, currentActive)
      //   removeAllActive();
      //   currentActive = current;
        makeActive(currentSection);
      }
    });
  };
  // spyScrolling();
};

export {goToBtn};
