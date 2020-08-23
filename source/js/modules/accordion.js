const accordion = () => {
  const quBlock = document.querySelector(`.accordion`);

  if (quBlock) {

    const blocksServices = quBlock.querySelectorAll(`.accordion__item`);

    for (const block of blocksServices) {

      block.classList.add(`accordion--js`);
      const t = function (n) {
        const e = this.parentElement.querySelector(`.accordion__wrapper`);
        const t = e.scrollHeight + `px`;
        const button = this;
        e.classList.toggle(`open`);
        button.classList.toggle(`open`);

        if (!e.classList.contains(`open`)) {
          e.setAttribute(`aria-hidden`, `false`);

          button.setAttribute(`aria-expanded`, `false`);
        } else {
          e.setAttribute(`aria-hidden`, `true`);
          button.setAttribute(`aria-expanded`, `true`);
        }

        e.style.height = 0 === e.offsetHeight ? t : 0;
      };
      const n = block.querySelectorAll(`.accordion__title`);

      n.forEach(function (el) {
        el.addEventListener(`click`, t);
      });
    }
  }
};

export {accordion};
