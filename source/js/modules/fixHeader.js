const fixHeader = () => {
  const header = document.querySelector(`.header`);
  let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  if (bodyScrollTop >= 100) {
    header.classList.add(`header--fix`);
  } else {
    header.classList.remove(`header--fix`);
  }

  window.addEventListener(`scroll`, () => {
    bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (bodyScrollTop >= 100) {
      header.classList.add(`header--fix`);
    } else {
      header.classList.remove(`header--fix`);
    }
  });
};

export {fixHeader};
