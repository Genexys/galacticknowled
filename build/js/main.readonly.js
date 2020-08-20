import smoothscroll from 'smoothscroll-polyfill';

import {forEachPolyfill} from './utils/polyfill-foreach';
import {initIe11Download} from './utils/init-ie11-download';
import {fixHeader} from "./modules/fixHeader";
import {animateBtn} from "./modules/animateBtn";
import {parallax} from "./modules/parallax";
import {phoneMask} from "./modules/phoneMask";
import {validateMainForm} from "./modules/validateMainForm";
import {reviews} from "./modules/reviews";
import {goToBtn} from "./modules/goToBtn";
import {modalYoutube} from "./modules/modalYoutube";

// Utils
// ---------------------------------
// kick off the polyfill!
smoothscroll.polyfill();
forEachPolyfill();
initIe11Download();


// Modules
// ---------------------------------
fixHeader();
animateBtn();
parallax();
phoneMask();
validateMainForm();
reviews();
goToBtn();
modalYoutube();

const ie11Download = (el) => {
  if (el.href === ``) {
    throw Error(`The element has no href value.`);
  }

  let filename = el.getAttribute(`download`);
  if (filename === null || filename === ``) {
    const tmp = el.href.split(`/`);
    filename = tmp[tmp.length - 1];
  }

  el.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.onloadstart = () => {
      xhr.responseType = `blob`;
    };
    xhr.onload = () => {
      navigator.msSaveOrOpenBlob(xhr.response, filename);
    };
    xhr.open(`GET`, el.href, true);
    xhr.send();
  });
};

const downloadLinks = document.querySelectorAll(`a[download]`);

const initIe11Download = () => {
  if (window.navigator.msSaveBlob) {
    if (downloadLinks.length) {
      downloadLinks.forEach((el) => {
        ie11Download(el);
      });
    }
  }
};

export {initIe11Download};

const forEachPolyfill = () => {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
};

export {forEachPolyfill};

const body = document.querySelector(`body`);

const getScrollbarWidth = () => {
  const outer = document.createElement(`div`);
  outer.style.visibility = `hidden`;
  outer.style.overflow = `scroll`;
  outer.style.msOverflowStyle = `scrollbar`;
  body.appendChild(outer);
  const inner = document.createElement(`div`);
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};

const getBodyScrollTop = () => {
  return (
    self.pageYOffset ||
    (document.documentElement && document.documentElement.ScrollTop) ||
    (body && body.scrollTop)
  );
};

const disableScrolling = () => {
  const scrollWidth = getScrollbarWidth();
  body.setAttribute(`style`, `padding-right: ` + scrollWidth + `px;`);
  body.dataset.scrollY = `${getBodyScrollTop()}`;
  body.style.top = `-${body.dataset.scrollY}px`;
  body.classList.add(`scroll-lock`);
};

const enableScrolling = () =>{
  body.removeAttribute(`style`);
  body.classList.remove(`scroll-lock`);
  window.scrollTo(0, +body.dataset.scrollY);
};

export {enableScrolling, disableScrolling};

const animateBtn = () => {
  const btnItems = document.querySelectorAll(`.animate-btn`);

  btnItems.forEach(function (btnItem) {
    const circlesTopLeft = btnItem.querySelectorAll(`.circle.top-left`);
    const circlesBottomRight = btnItem.querySelectorAll(`.circle.bottom-right`);

    const tl = new TimelineLite();
    const tl2 = new TimelineLite();

    const btTl = new TimelineLite({ paused: true });

    tl.to(circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
    tl.to(circlesTopLeft[0], 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
    tl.to(circlesTopLeft[1], 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
    tl.to(circlesTopLeft[2], 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
    tl.to(circlesTopLeft[0], 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
    tl.to(circlesTopLeft[1], 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
    tl.to(circlesTopLeft[2], 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

    const tlBt1 = new TimelineLite();
    const tlBt2 = new TimelineLite();

    tlBt1.set(circlesTopLeft, { x: 0, y: 0, rotation: -45 });
    tlBt1.add(tl);

    tl2.set(circlesBottomRight, { x: 0, y: 0 });
    tl2.to(circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
    tl2.to(circlesBottomRight[0], 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
    tl2.to(circlesBottomRight[1], 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
    tl2.to(circlesBottomRight[2], 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
    tl2.to(circlesBottomRight[0], 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
    tl2.to(circlesBottomRight[1], 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
    tl2.to(circlesBottomRight[2], 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');

    tlBt2.set(circlesBottomRight, { x: 0, y: 0, rotation: 45 });
    tlBt2.add(tl2);

    btTl.add(tlBt1);
    btTl.to(btnItem.querySelector('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
    btTl.add(tlBt2, 0.2);
    btTl.to(btnItem.querySelector('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

    btTl.timeScale(2.6);

    btnItem.addEventListener(`mouseenter`, () => {
      btTl.restart();
    });
  });
};

export {animateBtn}

const findPos = (obj) => {
  let curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return [curtop];
  }
};

export {findPos};

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

import MicroModal from 'micromodal';
import validate from '../vendor/validate.min';

export const validateForm = function (form, config, closeModal= false) {
  if (form) {
    form.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handleFormSubmit(form);
    });

    const inputs = form.querySelectorAll(`input, textarea, select`);

    for (let i = 0; i < inputs.length; ++i) {

      inputs.item(i).addEventListener(`change`, function (ev) {
        let errors = validate(form, config) || {};
        showErrorsForInput(this, errors[this.name]);
      });

      inputs.item(i).addEventListener(`focus`, function () {
        this.parentNode.classList.remove(`input-wrapper--error`);
        this.parentNode.classList.remove(`input-wrapper--success`);
      });
    }

    function handleFormSubmit(form, input) {
      let errors = validate(form, config);
      showErrors(form, errors || {});
      if (!errors) {
        showSuccess();
      }
    }

    function showErrors(form, errors) {
      form.querySelectorAll(`input[name], select[name]`).forEach(function (input) {
        showErrorsForInput(input, errors && errors[input.name]);
      });
    }

    function showErrorsForInput(input, errors) {

      let formGroup = closestParent(input.parentElement, `input-wrapper`);

      resetFormGroup(formGroup);

      if (errors) {
        formGroup.classList.add(`input-wrapper--error`);
      } else {
        formGroup.classList.add(`input-wrapper--success`);
      }
    }

    function closestParent(child, className) {
      if (!child || child === document) {
        return null;
      }
      if (child.classList.contains(className)) {
        return child;
      } else {
        return closestParent(child.parentNode, className);
      }
    }

    function resetFormGroup(formGroup) {
      formGroup.classList.remove(`input-wrapper--error`);
      formGroup.classList.remove(`input-wrapper--success`);
    }

    function showSuccess() {
      const data = new FormData(form);

      fetch(form.getAttribute(`action`), {
        method: form.getAttribute(`method`),
        body: data,
      })
        .then(response => {
          return response.text();
        })
        .then(text => {
          form.reset();

          if (closeModal) {
            MicroModal.close(`modal-1`);
          }

          MicroModal.show(`tnx-modal`);

          setTimeout(() => {
            MicroModal.close(`tnx-modal`);
          }, 2000);

        }).catch(error => {
        console.error(error);
      });

    }
  }
};

const getValueCourse = () => {
  const courseButtons = document.querySelectorAll(`.courses__button`);
  const form = document.querySelector(`.main-form`);
  const hiddenInput = form.querySelector(`input[hidden]`);
  for (const courseButton of courseButtons) {

    courseButton.addEventListener(`click`, function () {
      hiddenInput.setAttribute(`value`, this.dataset.valueCourse);
    });
  }
};

export {getValueCourse};

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
      const activeLink = Array.from(menuLinks).filter((el) => el.dataset.btnScroll === link);
      activeLink[0].classList.add(`header__item-link--active`)
    };
    const removeActive = (link) => {
      menuLinks[link].classList.remove(`header__item-link--active`)
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


  const scrollToBtn = document.querySelector(`.scroll-to-btn`);

  scrollToBtn.addEventListener(`click`, () => {
    window.scroll({top: 0, left: 0, behavior: `smooth`});
  });

  window.addEventListener(`scroll`, () => {
    if (window.scrollY > 400) {
      scrollToBtn.classList.add(`scroll-to-btn__visible`);
    } else {
      scrollToBtn.classList.remove(`scroll-to-btn__visible`);
    }
  });


};

export {goToBtn};

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

const parallax = () => {
  const controller = new ScrollMagic.Controller();

  const banner = document.querySelector(`.main-banner`);
  const courses = document.querySelector(`.courses`);
  const why = document.querySelector(`.why-way`);
  const planets = banner.querySelectorAll(`.animate-planet`);
  const rocket = banner.querySelector(`.rocket`);
  const asteroid = document.querySelector(`.asteroid`);
  const comet = document.querySelector(`.comet`);
  const tlBanner = new TimelineMax();
  const tlCourses = new TimelineMax();
  const tlWhy = new TimelineMax();

  // tlBanner
  //   .to(planets[0], 6, {
  //     y: 100
  //   })
  //   .to(planets[1], 6, {
  //     y: 150
  //   }, '-=6')
  //   .to(rocket, 6, {
  //     y: -200
  //   }, '-=6');

  tlCourses
    .to(asteroid, 6, {
      y: 100,
      x: -100,
    });

  tlWhy
    .to(comet, 6, {
      y: 100,
      x: -100,
    });

  // let sceneBanner = new ScrollMagic.Scene({
  //   triggerElement: banner,
  //   duration: "200%",
  //   triggerHook: 0
  // })
  //   .setTween(tlBanner)
  //   .addTo(controller);

  let sceneCourse = new ScrollMagic.Scene({
    triggerElement: planets[0],
    duration: "200%",
    triggerHook: 0
  })
    .setTween(tlCourses)
    .addTo(controller);

  let sceneWhy = new ScrollMagic.Scene({
    triggerElement: why,
    duration: "200%",
    triggerHook: 0
  })
    .setTween(tlWhy)
    .addTo(controller);

  const parallaxPanets = function(e) {
    let _w = window.innerWidth/2;
    let _h = window.innerHeight/2;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;

    // console.log(_mouseY, _mouseY)

    // rocket.style.transform = `translate(-${(_mouseY - _h) * 0.01}%, ${(_mouseX - _w) * 0.01}%)`;
    TweenLite.to(rocket, 1, {transform: `translate(-${(_mouseY - _h) * 0.01}%, ${(_mouseX - _w) * 0.01}%)`, ease:Power2.easeOut});
    // planets[0].style.transform = `translateY(-${(_mouseY - _h) * 0.02}%)`;
    // planets[1].style.transform = `translateY(${(_mouseY - _h) * 0.008}%)`;
  };

  window.addEventListener("mousemove", parallaxPanets);

};

export {parallax};

import Inputmask from "inputmask";

const phoneMask = () => {

  Inputmask({
    mask: "+7(999)999-99-99",
    showMaskOnHover: false,
  }).mask(document.querySelectorAll(`input[type="tel"]`));

};

export {phoneMask};

const reviews = () => {

  const reviewSlider = new Swiper(`.reviews__container`, {
    // loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    roundLengths: true,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    breakpoints: {
      1074: {
        slidesPerView: 3,
        spaceBetween: 10,
      },

      690: {
        slidesPerView: 2,
        spaceBetween: 10,
      }
    }
  });
};

export {reviews};

import {validateForm} from './getValidate';

const validateMainForm = () => {
  const form = document.querySelector(`.main-form`);

  const constraints = {
    name: {
      presence: true,
    },
    phone: {
      presence: true,
      format: {
        pattern: /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/
      }
    },
  };

  validateForm(form, constraints);
};

export {validateMainForm};
