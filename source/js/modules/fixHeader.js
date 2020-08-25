const fixHeader = () => {
  const header = document.querySelector(`.header`);
  let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  if (window.innerWidth >= 1024) {
    if (bodyScrollTop >= 100) {
      header.classList.add(`header--fix`);
    } else {
      header.classList.remove(`header--fix`);
    }
  } else {
    if (bodyScrollTop >= 20) {
      header.classList.add(`header--fix`);
    } else {
      header.classList.remove(`header--fix`);
    }
  }

  window.addEventListener(`scroll`, () => {
    bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (window.innerWidth >= 1024) {
      if (bodyScrollTop >= 100) {
        header.classList.add(`header--fix`);
      } else {
        header.classList.remove(`header--fix`);
      }
    } else {
      if (bodyScrollTop >= 20) {
        header.classList.add(`header--fix`);
      } else {
        header.classList.remove(`header--fix`);
      }
    }
  });
};

export {fixHeader};
