const modalYoutube = () => {
  $(`[data-fancybox]`).fancybox({
    youtube: {
      controls: 0,
      showinfo: 0
    },
    vimeo: {
      color: `f00`
    }
  });
};

export {modalYoutube};
