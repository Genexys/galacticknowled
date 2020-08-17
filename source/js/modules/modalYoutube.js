import MicroModal from 'micromodal';

const modalYoutube = () => {
  const btnModals = document.querySelectorAll(`.btn-modal-youtube`);

  for (const el of btnModals) {
    el.addEventListener(`click`, () => {
      MicroModal.show(`${el.dataset.micromodalTrigger}`, {
        onShow: modal => {
          modal.querySelector('iframe').setAttribute('src', `${el.dataset.videoSrc}`);
        },
        onClose: modal => {
          modal.querySelector('iframe').setAttribute('src', modal.querySelector('iframe').getAttribute('src'));
        },
      });
    });
  }

  // MicroModal.init({
  //   onShow: modal => {
  //
  //   },
  //   onClose: modal => {
  //     modal.querySelector('iframe').setAttribute('src', modal.querySelector('iframe').getAttribute('src'));
  //   },
  // });
};

export {modalYoutube};
