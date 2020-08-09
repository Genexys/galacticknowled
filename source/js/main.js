import {forEachPolyfill} from './utils/polyfill-foreach';
import {initIe11Download} from './utils/init-ie11-download';
import {fixHeader} from "./modules/fixHeader";
import {animateBtn} from "./modules/animateBtn";
import {parallax} from "./modules/parallax";
import {phoneMask} from "./modules/phoneMask";

// Utils
// ---------------------------------
forEachPolyfill();
initIe11Download();


// Modules
// ---------------------------------
fixHeader();
animateBtn();
parallax();
phoneMask();
