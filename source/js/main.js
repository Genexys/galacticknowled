import {forEachPolyfill} from './utils/polyfill-foreach';
import {initIe11Download} from './utils/init-ie11-download';
import {fixHeader} from "./modules/fixHeader";
import {animateBtn} from "./modules/animateBtn";

// Utils
// ---------------------------------
forEachPolyfill();
initIe11Download();


// Modules
// ---------------------------------
fixHeader();
animateBtn();
