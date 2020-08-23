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
import {mobileMenu} from "./modules/mobileMenu";
import {accordion} from "./modules/accordion";

document.addEventListener(`DOMContentLoaded`, ()=> {
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
  mobileMenu();
  accordion();


});
