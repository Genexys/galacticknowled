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
};

export {goToBtn};
