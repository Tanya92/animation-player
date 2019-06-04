/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/animation.ts":
/*!*********************************!*\
  !*** ./components/animation.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./utils.ts");
var Animation = /** @class */ (function () {
    function Animation(animationContainer) {
        var _this = this;
        this.changeLabel = function () {
            var inputValue = _this.getInputRangeValue();
            var currentRange = _this.animationContainer.querySelector('.current_range');
            currentRange.textContent = String(inputValue);
        };
        this.animationContainer = animationContainer;
        this.animationCanvas = this.animationContainer.querySelector('#animation_canvas');
        this.changeLabel();
        this.setRangeListener();
        this.addFullScreenListener();
    }
    Animation.prototype.getInputRange = function () {
        return this.animationContainer.querySelector('.input_range');
    };
    Animation.prototype.getInputRangeValue = function () {
        var inputRange = this.getInputRange();
        return Number(inputRange.value);
    };
    Animation.prototype.setRangeListener = function () {
        var _this = this;
        var inputRange = this.getInputRange();
        inputRange.addEventListener('mousemove', this.changeLabel);
        inputRange.addEventListener('change', function () {
            _this.stopAnimation();
            _this.animateFrames(_this.imagesArray);
        });
    };
    Animation.prototype.animateFrames = function (array) {
        var rect = this.animationCanvas.getBoundingClientRect();
        var animationContext = this.animationCanvas.getContext('2d');
        var inputRangeValue = this.getInputRangeValue();
        var frameIndex = 0;
        this.imagesArray = array;
        this.stopAnimation = utils_1.animate(function () {
            if (array[frameIndex]) {
                var image = new Image();
                image.src = array[frameIndex];
                animationContext.clearRect(0, 0, rect.width, rect.height);
                animationContext.drawImage(image, 0, 0, rect.width, rect.height);
                frameIndex++;
                if (frameIndex == array.length) {
                    frameIndex = 0;
                }
            }
        }, inputRangeValue);
    };
    Animation.prototype.addFullScreenListener = function () {
        var _this = this;
        var button = this.animationContainer.querySelector('#full_screen');
        button.addEventListener('click', function () {
            _this.animationCanvas.requestFullscreen();
        });
    };
    return Animation;
}());
exports.default = Animation;


/***/ }),

/***/ "./components/frames.ts":
/*!******************************!*\
  !*** ./components/frames.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var emptyFrame = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqAAAAGACAYAAAByeNBuAAAUuklEQVR4Xu3WMQ0AAAzDsJU/6bHI5RGoZO3IzhEgQIAAAQIECBAIBRZumSJAgAABAgQIECBwAtQTECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECAgQP0AAQIECBAgQIBAKiBAU25jBAgQIECAAAECAtQPECBAgAABAgQIpAICNOU2RoAAAQIECBAgIED9AAECBAgQIECAQCogQFNuYwQIECBAgAABAgLUDxAgQIAAAQIECKQCAjTlNkaAAAECBAgQICBA/QABAgQIECBAgEAqIEBTbmMECBAgQIAAAQIC1A8QIECAAAECBAikAgI05TZGgAABAgQIECDwdOcBgTGsrYIAAAAASUVORK5CYII=";
var Frames = /** @class */ (function () {
    function Frames(container, clearCanvas, drawImage) {
        var _this = this;
        this.activeFrame = -1;
        this.counterFrame = 1;
        this.imagesData = [];
        this.createFrame = function () {
            var template = document.createElement('template');
            template.innerHTML = "\n            <div class=\"frame\">\n                <div class=\"number_frame\">\n                    <span class=\"counter_frame\">" + _this.counterFrame + "</span>\n                </div>\n                <div class=\"delete_frame\">\n                    <img src=\"./assets/delete-icon.svg\" alt=\"delete_icon\" class=\"delete_icon\">\n                </div>\n                <div class=\"copy_frame\">\n                    <img src=\"./assets/copy-icon.svg\" alt=\"copy_icon\" class=\"copy_icon\">\n                </div>  \n                <div class=\"expand_frame\">\n                    <img src=\"./assets/expand-icon.svg\" alt=\"expand_icon\" class=\"expand_icon\">\n                </div>            \n            </div>\n        ";
            _this.container.insertBefore(template.content, _this.container.querySelector('#button_add_frame'));
            _this.activeFrame++;
            _this.imagesData[_this.activeFrame] = emptyFrame;
            _this.counterFrame++;
            var frames = _this.getFramesArray();
            var lastFrame = frames[frames.length - 1];
            _this.setFrameEventListeners(lastFrame);
        };
        this.container = container;
        this.drawImage = drawImage;
        this.container.querySelector('button').addEventListener('click', function () {
            _this.createFrame();
            clearCanvas();
        });
    }
    Frames.prototype.frameCounterValue = function (frame) {
        return parseInt(frame.querySelector('.counter_frame').textContent);
    };
    Frames.prototype.setFrameCounterValue = function (frame, index) {
        frame.querySelector('.counter_frame').textContent = String(index);
    };
    Frames.prototype.getFramesArray = function () {
        return this.container.getElementsByClassName('frame');
    };
    Frames.prototype.changeIndexes = function (frameIndex) {
        var framesArray = this.getFramesArray();
        var index = frameIndex;
        var length = framesArray.length;
        while (index < length) {
            this.setFrameCounterValue(framesArray[index], index + 1);
            index += 1;
        }
    };
    Frames.prototype.deleteFrame = function (icon) {
        var frame = icon.parentNode;
        var deleteCounter = this.frameCounterValue(frame);
        var deleteIndex = deleteCounter - 1;
        if (this.activeFrame == deleteIndex) {
            this.drawImage(this.imagesData[deleteIndex - 1]);
        }
        if (this.activeFrame >= deleteIndex) {
            this.activeFrame--;
        }
        this.counterFrame--;
        this.container.removeChild(frame);
        this.changeIndexes(deleteIndex);
        if (this.imagesData[deleteIndex]) {
            this.imagesData.splice(deleteIndex, 1);
        }
    };
    Frames.prototype.copyFrame = function (icon) {
        var frame = icon.parentNode;
        var copyCounter = this.frameCounterValue(frame);
        var copyIndex = copyCounter - 1;
        var elementCopy = frame.cloneNode(true);
        if (frame.nextSibling) {
            this.container.insertBefore(elementCopy, frame.nextSibling);
        }
        this.setFrameEventListeners(elementCopy);
        this.changeIndexes(copyCounter);
        this.activeFrame = copyCounter;
        this.counterFrame++;
        if (this.imagesData[copyIndex]) {
            this.imagesData.splice(copyCounter, 0, this.imagesData[copyIndex]);
        }
    };
    Frames.prototype.updatePreview = function (imageData) {
        var frame = document.getElementsByClassName('frame')[this.activeFrame];
        if (frame) {
            frame.style.backgroundImage = "url(" + imageData + ")";
        }
        this.imagesData[this.activeFrame] = imageData;
    };
    Frames.prototype.setFrameEventListeners = function (frame) {
        var _this = this;
        var deleteIcon = frame.querySelector('.delete_frame');
        deleteIcon.addEventListener('click', function (event) {
            _this.deleteFrame(event.currentTarget);
        });
        var copyIcon = frame.querySelector('.copy_frame');
        copyIcon.addEventListener('click', function (event) {
            _this.copyFrame(event.currentTarget);
        });
    };
    Frames.prototype.getImagesData = function () {
        return this.imagesData;
    };
    return Frames;
}());
exports.default = Frames;


/***/ }),

/***/ "./components/pencil_tool.ts":
/*!***********************************!*\
  !*** ./components/pencil_tool.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ../utils */ "./utils.ts");
var PencilTool = /** @class */ (function () {
    function PencilTool(canvas) {
        var _this = this;
        this.drawing = false;
        this.startDraw = function (event) {
            _this.drawing = true;
            var result = utils_1.relativePos(event, _this.canvas);
            _this.context.beginPath();
            _this.context.moveTo(result.x, result.y);
        };
        this.draw = function (event) {
            if (_this.drawing) {
                var pos = utils_1.relativePos(event, _this.canvas);
                _this.context.lineTo(pos.x, pos.y);
                _this.context.stroke();
            }
        };
        this.stopDraw = function () {
            _this.drawing = false;
            _this.callback();
        };
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }
    PencilTool.prototype.selected = function () {
        this.canvas.addEventListener('mousedown', this.startDraw);
        this.canvas.addEventListener('mousemove', this.draw);
        this.canvas.addEventListener('mouseup', this.stopDraw);
    };
    PencilTool.prototype.unSelected = function () {
        this.canvas.removeEventListener('mousedown', this.startDraw);
        this.canvas.removeEventListener('mousemove', this.draw);
        this.canvas.removeEventListener('mouseup', this.stopDraw);
    };
    PencilTool.prototype.onUpdate = function (callback) {
        this.callback = callback;
    };
    return PencilTool;
}());
exports.default = PencilTool;


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pencil_tool_1 = __webpack_require__(/*! ./components/pencil_tool */ "./components/pencil_tool.ts");
var frames_1 = __webpack_require__(/*! ./components/frames */ "./components/frames.ts");
var animation_1 = __webpack_require__(/*! ./components/animation */ "./components/animation.ts");
__webpack_require__(/*! ./style.css */ "./style.css");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.onCanvasUpdate = function () {
            _this.frames.updatePreview(_this.getState());
        };
        this.clearCanvas = function () {
            var context = _this.getCanvasContext();
            var rect = _this.canvas.getBoundingClientRect();
            context.clearRect(0, 0, rect.width, rect.height);
        };
        this.drawImage = function (imageData) {
            var image = new Image();
            image.src = imageData;
            var context = _this.getCanvasContext();
            var rect = _this.canvas.getBoundingClientRect();
            context.clearRect(0, 0, rect.width, rect.height);
            context.drawImage(image, 0, 0, rect.width, rect.height);
        };
    }
    App.prototype.getCanvasRect = function () {
        return this.canvas.getBoundingClientRect();
    };
    App.prototype.getCanvasContext = function () {
        return this.canvas.getContext('2d');
    };
    App.prototype.start = function () {
        this.canvas = document.getElementById('draw_canvas');
        var rect = this.getCanvasRect();
        this.canvas.setAttribute('width', String(rect.width));
        this.canvas.setAttribute('height', String(rect.height));
        var context = this.getCanvasContext();
        context.lineWidth = 8;
        this.pencilTool = new pencil_tool_1.default(this.canvas);
        this.pencilTool.selected();
        this.pencilTool.onUpdate(this.onCanvasUpdate);
        this.frames = new frames_1.default(document.getElementById('frames'), this.clearCanvas, this.drawImage);
        this.frames.createFrame();
        this.animation = new animation_1.default(document.getElementById('animation_field'));
        var imagesArray = this.frames.getImagesData();
        this.animation.animateFrames(imagesArray);
    };
    App.prototype.getState = function () {
        return this.canvas.toDataURL();
    };
    return App;
}());
var app = new App();
app.start();


/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./utils.ts":
/*!******************!*\
  !*** ./utils.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function relativePos(event, canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.floor(event.clientX - rect.left),
        y: Math.floor(event.clientY - rect.top)
    };
}
exports.relativePos = relativePos;
function animate(draw, rate) {
    var start = performance.now();
    var timeBetweenFrames = Math.floor(1000 / rate);
    var nextFrame = start + timeBetweenFrames;
    var id = requestAnimationFrame(function _animate(time) {
        if (time >= nextFrame) {
            nextFrame += timeBetweenFrames;
            draw();
        }
        id = requestAnimationFrame(_animate);
    });
    return function () {
        cancelAnimationFrame(id);
    };
}
exports.animate = animate;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9hbmltYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9mcmFtZXMudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9wZW5jaWxfdG9vbC50cyIsIndlYnBhY2s6Ly8vLi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zdHlsZS5jc3M/ZWNlZiIsIndlYnBhY2s6Ly8vLi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsZ0VBQWlDO0FBRWpDO0lBTUksbUJBQVksa0JBQWtCO1FBQTlCLGlCQU1DO1FBVUQsZ0JBQVcsR0FBRztZQUNWLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzdDLElBQU0sWUFBWSxHQUFHLEtB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LENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUMxQyxDQUFDO0FBQ04sQ0FBQztBQU5ELGtDQU1DO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQWMsRUFBRSxJQUFZO0lBQ2hELElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xELElBQUksU0FBUyxHQUFHLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztJQUMxQyxJQUFJLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLFFBQVEsQ0FBQyxJQUFJO1FBQ2pELElBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTtZQUNuQixTQUFTLElBQUksaUJBQWlCLENBQUM7WUFDL0IsSUFBSSxFQUFFLENBQUM7U0FDVjtRQUNELEVBQUUsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU87UUFDSCxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7SUFDNUIsQ0FBQztBQUNMLENBQUM7QUFkRCwwQkFjQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7YW5pbWF0ZX0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdGlvbiB7XG4gICAgYW5pbWF0aW9uQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgICBzdG9wQW5pbWF0aW9uOiBGdW5jdGlvbjtcbiAgICBpbWFnZXNBcnJheTogc3RyaW5nW107XG4gICAgYW5pbWF0aW9uQ2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKGFuaW1hdGlvbkNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkNvbnRhaW5lciA9IGFuaW1hdGlvbkNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5hbmltYXRpb25DYW52YXMgPSB0aGlzLmFuaW1hdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjYW5pbWF0aW9uX2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNoYW5nZUxhYmVsKCk7XG4gICAgICAgIHRoaXMuc2V0UmFuZ2VMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmFkZEZ1bGxTY3JlZW5MaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGdldElucHV0UmFuZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfcmFuZ2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIH1cbiAgICBnZXRJbnB1dFJhbmdlVmFsdWUoKXtcbiAgICAgICAgY29uc3QgaW5wdXRSYW5nZSA9IHRoaXMuZ2V0SW5wdXRSYW5nZSgpO1xuICAgICAgICByZXR1cm4gTnVtYmVyKGlucHV0UmFuZ2UudmFsdWUpO1xuICAgIH1cblxuICAgIGNoYW5nZUxhYmVsID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dFZhbHVlID0gdGhpcy5nZXRJbnB1dFJhbmdlVmFsdWUoKTtcbiAgICAgICAgY29uc3QgY3VycmVudFJhbmdlID0gdGhpcy5hbmltYXRpb25Db250YWluZXIucXVlcnlTZWxlY3RvcignLmN1cnJlbnRfcmFuZ2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIGN1cnJlbnRSYW5nZS50ZXh0Q29udGVudCA9IFN0cmluZyhpbnB1dFZhbHVlKTtcbiAgICB9O1xuXG4gICAgc2V0UmFuZ2VMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgaW5wdXRSYW5nZSA9IHRoaXMuZ2V0SW5wdXRSYW5nZSgpO1xuICAgICAgICBpbnB1dFJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuY2hhbmdlTGFiZWwpO1xuICAgICAgICBpbnB1dFJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlRnJhbWVzKHRoaXMuaW1hZ2VzQXJyYXkpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFuaW1hdGVGcmFtZXMoYXJyYXk6IHN0cmluZ1tdKSB7XG5cbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuYW5pbWF0aW9uQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBhbmltYXRpb25Db250ZXh0ID0gdGhpcy5hbmltYXRpb25DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY29uc3QgaW5wdXRSYW5nZVZhbHVlID0gdGhpcy5nZXRJbnB1dFJhbmdlVmFsdWUoKTtcbiAgICAgICAgbGV0IGZyYW1lSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmltYWdlc0FycmF5ID0gYXJyYXk7XG4gICAgICAgIHRoaXMuc3RvcEFuaW1hdGlvbiA9IGFuaW1hdGUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGFycmF5W2ZyYW1lSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSBhcnJheVtmcmFtZUluZGV4XTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25Db250ZXh0LmNsZWFyUmVjdCgwLDAsIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25Db250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIGZyYW1lSW5kZXgrKztcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWVJbmRleCA9PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGlucHV0UmFuZ2VWYWx1ZSk7XG4gICAgfVxuXG4gICAgYWRkRnVsbFNjcmVlbkxpc3RlbmVyKCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSB0aGlzLmFuaW1hdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZnVsbF9zY3JlZW4nKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25DYW52YXMucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cbiIsImNvbnN0IGVtcHR5RnJhbWUgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBcUFBQUFHQUNBWUFBQUJ5ZU5CdUFBQVV1a2xFUVZSNFh1M1dNUTBBQUF6RHNKVS82YkhJNVJHb1pPM0l6aEVnUUlBQUFRSUVDQkFJQlJadW1TSkFnQUFCQWdRSUVDQndBdFFURUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNBZ1FQMEFBUUlFQ0JBZ1FJQkFLaUJBVTI1akJBZ1FJRUNBQUFFQ0F0UVBFQ0JBZ0FBQkFnUUlwQUlDTk9VMlJvQUFBUUlFQ0JBZ0lFRDlBQUVDQkFnUUlFQ0FRQ29nUUZOdVl3UUlFQ0JBZ0FBQkFnTFVEeEFnUUlBQUFRSUVDS1FDQWpUbE5rYUFBQUVDQkFnUUlDQkEvUUFCQWdRSUVDQkFnRUFxSUVCVGJtTUVDQkFnUUlBQUFRSUMxQThRSUVDQUFBRUNCQWlrQWdJMDVUWkdnQUFCQWdRSUVDQWdRUDBBQVFJRUNCQWdRSUJBS2lCQVUyNWpCQWdRSUVDQUFBRUNBdFFQRUNCQWdBQUJBZ1FJcEFJQ05PVTJSb0FBQVFJRUNCQWdJRUQ5QUFFQ0JBZ1FJRUNBUUNvZ1FGTnVZd1FJRUNCQWdBQUJBZ0xVRHhBZ1FJQUFBUUlFQ0tRQ0FqVGxOa2FBQUFFQ0JBZ1FJQ0JBL1FBQkFnUUlFQ0JBZ0VBcUlFQlRibU1FQ0JBZ1FJQUFBUUlDMUE4UUlFQ0FBQUVDQkFpa0FnSTA1VFpHZ0FBQkFnUUlFQ0FnUVAwQUFRSUVDQkFnUUlCQUtpQkFVMjVqQkFnUUlFQ0FBQUVDQXRRUEVDQkFnQUFCQWdRSXBBSUNOT1UyUm9BQUFRSUVDQkFnSUVEOUFBRUNCQWdRSUVDQVFDb2dRRk51WXdRSUVDQkFnQUFCQWdMVUR4QWdRSUFBQVFJRUNLUUNBalRsTmthQUFBRUNCQWdRSUNCQS9RQUJBZ1FJRUNCQWdFQXFJRUJUYm1NRUNCQWdRSUFBQVFJQzFBOFFJRUNBQUFFQ0JBaWtBZ0kwNVRaR2dBQUJBZ1FJRUNEd2RPY0JnVEdzcllJQUFBQUFTVVZPUks1Q1lJST1cIjtcblxudHlwZSBEcmF3SW1hZ2UgPSAoZGF0YTogc3RyaW5nKSA9PiB2b2lkO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZXMge1xuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gICAgYWN0aXZlRnJhbWU6IG51bWJlciA9IC0xO1xuICAgIGNvdW50ZXJGcmFtZTogbnVtYmVyID0gMTtcbiAgICBpbWFnZXNEYXRhOiBzdHJpbmdbXSA9IFtdO1xuICAgIGRyYXdJbWFnZTogRHJhd0ltYWdlO1xuXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCwgY2xlYXJDYW52YXM6IEZ1bmN0aW9uLCBkcmF3SW1hZ2U6IERyYXdJbWFnZSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UgPSBkcmF3SW1hZ2U7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgY2xlYXJDYW52YXMoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGNyZWF0ZUZyYW1lID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXJfZnJhbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb3VudGVyX2ZyYW1lXCI+JHt0aGlzLmNvdW50ZXJGcmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbGV0ZV9mcmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL2RlbGV0ZS1pY29uLnN2Z1wiIGFsdD1cImRlbGV0ZV9pY29uXCIgY2xhc3M9XCJkZWxldGVfaWNvblwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb3B5X2ZyYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvY29weS1pY29uLnN2Z1wiIGFsdD1cImNvcHlfaWNvblwiIGNsYXNzPVwiY29weV9pY29uXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+ICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhwYW5kX2ZyYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvZXhwYW5kLWljb24uc3ZnXCIgYWx0PVwiZXhwYW5kX2ljb25cIiBjbGFzcz1cImV4cGFuZF9pY29uXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5zZXJ0QmVmb3JlKHRlbXBsYXRlLmNvbnRlbnQsIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNidXR0b25fYWRkX2ZyYW1lJykpO1xuICAgICAgICB0aGlzLmFjdGl2ZUZyYW1lKys7XG4gICAgICAgIHRoaXMuaW1hZ2VzRGF0YVt0aGlzLmFjdGl2ZUZyYW1lXSA9IGVtcHR5RnJhbWU7XG4gICAgICAgIHRoaXMuY291bnRlckZyYW1lKys7XG4gICAgICAgIGNvbnN0IGZyYW1lcyA9IHRoaXMuZ2V0RnJhbWVzQXJyYXkoKTtcbiAgICAgICAgY29uc3QgbGFzdEZyYW1lID0gZnJhbWVzW2ZyYW1lcy5sZW5ndGggLSAxXTtcbiAgICAgICAgdGhpcy5zZXRGcmFtZUV2ZW50TGlzdGVuZXJzKGxhc3RGcmFtZSk7XG4gICAgfVxuXG4gICAgZnJhbWVDb3VudGVyVmFsdWUoZnJhbWU6IEhUTUxEaXZFbGVtZW50KSAge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZnJhbWUucXVlcnlTZWxlY3RvcignLmNvdW50ZXJfZnJhbWUnKS50ZXh0Q29udGVudCk7XG4gICAgfVxuXG4gICAgc2V0RnJhbWVDb3VudGVyVmFsdWUoZnJhbWU6IEhUTUxEaXZFbGVtZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyX2ZyYW1lJykudGV4dENvbnRlbnQgPSBTdHJpbmcoaW5kZXgpO1xuICAgIH1cblxuICAgIGdldEZyYW1lc0FycmF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWUnKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VJbmRleGVzKGZyYW1lSW5kZXg6IG51bWJlcil7XG4gICAgICAgIGNvbnN0IGZyYW1lc0FycmF5ID0gdGhpcy5nZXRGcmFtZXNBcnJheSgpO1xuICAgICAgICBsZXQgaW5kZXggPSBmcmFtZUluZGV4O1xuICAgICAgICBjb25zdCBsZW5ndGggPSBmcmFtZXNBcnJheS5sZW5ndGg7XG4gICAgICAgIHdoaWxlKGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZyYW1lQ291bnRlclZhbHVlKGZyYW1lc0FycmF5W2luZGV4XSBhcyBIVE1MRGl2RWxlbWVudCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVGcmFtZShpY29uKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gaWNvbi5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCBkZWxldGVDb3VudGVyID0gdGhpcy5mcmFtZUNvdW50ZXJWYWx1ZShmcmFtZSk7XG4gICAgICAgIGNvbnN0IGRlbGV0ZUluZGV4ID0gIGRlbGV0ZUNvdW50ZXIgLSAxO1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVGcmFtZSA9PSBkZWxldGVJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5kcmF3SW1hZ2UodGhpcy5pbWFnZXNEYXRhW2RlbGV0ZUluZGV4IC0gMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlRnJhbWUgPj0gZGVsZXRlSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRnJhbWUtLTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvdW50ZXJGcmFtZS0tO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZChmcmFtZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlSW5kZXhlcyhkZWxldGVJbmRleCk7XG4gICAgICAgIGlmICh0aGlzLmltYWdlc0RhdGFbZGVsZXRlSW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlc0RhdGEuc3BsaWNlKGRlbGV0ZUluZGV4LDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29weUZyYW1lKGljb24pIHtcbiAgICAgICAgY29uc3QgZnJhbWUgPSBpY29uLnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IGNvcHlDb3VudGVyID0gdGhpcy5mcmFtZUNvdW50ZXJWYWx1ZShmcmFtZSk7XG4gICAgICAgIGNvbnN0IGNvcHlJbmRleCA9IGNvcHlDb3VudGVyIC0gMTtcbiAgICAgICAgY29uc3QgZWxlbWVudENvcHkgPSBmcmFtZS5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTERpdkVsZW1lbnQ7XG5cbiAgICAgICAgaWYoZnJhbWUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmluc2VydEJlZm9yZShlbGVtZW50Q29weSwgZnJhbWUubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RnJhbWVFdmVudExpc3RlbmVycyhlbGVtZW50Q29weSk7XG4gICAgICAgIHRoaXMuY2hhbmdlSW5kZXhlcyhjb3B5Q291bnRlcik7XG4gICAgICAgIHRoaXMuYWN0aXZlRnJhbWUgPSBjb3B5Q291bnRlcjtcbiAgICAgICAgdGhpcy5jb3VudGVyRnJhbWUrKztcbiAgICAgICAgaWYodGhpcy5pbWFnZXNEYXRhW2NvcHlJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzRGF0YS5zcGxpY2UoY29weUNvdW50ZXIsMCwgdGhpcy5pbWFnZXNEYXRhW2NvcHlJbmRleF0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQcmV2aWV3KGltYWdlRGF0YTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWUnKVt0aGlzLmFjdGl2ZUZyYW1lXSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgICBmcmFtZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aW1hZ2VEYXRhfSlgO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW1hZ2VzRGF0YVt0aGlzLmFjdGl2ZUZyYW1lXSA9IGltYWdlRGF0YTtcblxuICAgIH1cblxuICAgIHNldEZyYW1lRXZlbnRMaXN0ZW5lcnMoZnJhbWUpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGVfZnJhbWUnKTtcbiAgICAgICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRnJhbWUoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjb3B5SWNvbiA9IGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5jb3B5X2ZyYW1lJyk7XG4gICAgICAgIGNvcHlJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb3B5RnJhbWUoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEltYWdlc0RhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlc0RhdGE7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge3JlbGF0aXZlUG9zfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVuY2lsVG9vbCB7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBkcmF3aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIGNhbGxiYWNrOiBGdW5jdGlvbjtcblxuXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuc3RhcnREcmF3KTtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kcmF3KTtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuc3RvcERyYXcpO1xuICAgIH1cblxuICAgIHVuU2VsZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuc3RhcnREcmF3KTtcbiAgICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kcmF3KTtcbiAgICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuc3RvcERyYXcpO1xuICAgIH1cblxuICAgIHN0YXJ0RHJhdyA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSB0cnVlO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWxhdGl2ZVBvcyhldmVudCwgdGhpcy5jYW52YXMpO1xuICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8ocmVzdWx0LngsIHJlc3VsdC55KTtcbiAgICB9O1xuXG4gICAgZHJhdyA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSByZWxhdGl2ZVBvcyhldmVudCwgdGhpcy5jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhwb3MueCwgcG9zLnkpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc3RvcERyYXcgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgfTtcblxuICAgIG9uVXBkYXRlKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxufVxuIiwiaW1wb3J0IFBlbmNpbFRvb2wgZnJvbSBcIi4vY29tcG9uZW50cy9wZW5jaWxfdG9vbFwiO1xuaW1wb3J0IEZyYW1lcyBmcm9tIFwiLi9jb21wb25lbnRzL2ZyYW1lc1wiO1xuaW1wb3J0IEFuaW1hdGlvbiBmcm9tIFwiLi9jb21wb25lbnRzL2FuaW1hdGlvblwiO1xuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcblxuY2xhc3MgQXBwIHtcbiAgICBwZW5jaWxUb29sOiBQZW5jaWxUb29sO1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgZnJhbWVzOiBGcmFtZXM7XG4gICAgYW5pbWF0aW9uOiBBbmltYXRpb247XG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBnZXRDYW52YXNSZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgZ2V0Q2FudmFzQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYXdfY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmdldENhbnZhc1JlY3QoKTtcbiAgICAgICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIFN0cmluZyhyZWN0LndpZHRoKSk7XG4gICAgICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgU3RyaW5nKHJlY3QuaGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldENhbnZhc0NvbnRleHQoKTtcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSA4O1xuICAgICAgICB0aGlzLnBlbmNpbFRvb2wgPSBuZXcgUGVuY2lsVG9vbCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMucGVuY2lsVG9vbC5zZWxlY3RlZCgpO1xuICAgICAgICB0aGlzLnBlbmNpbFRvb2wub25VcGRhdGUodGhpcy5vbkNhbnZhc1VwZGF0ZSk7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gbmV3IEZyYW1lcyhcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcmFtZXMnKSBhcyBIVE1MRGl2RWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXMsXG4gICAgICAgICAgICB0aGlzLmRyYXdJbWFnZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZyYW1lcy5jcmVhdGVGcmFtZSgpO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FuaW1hdGlvbl9maWVsZCcpIGFzIEhUTUxEaXZFbGVtZW50KTtcbiAgICAgICAgY29uc3QgaW1hZ2VzQXJyYXkgPSB0aGlzLmZyYW1lcy5nZXRJbWFnZXNEYXRhKCk7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGVGcmFtZXMoaW1hZ2VzQXJyYXkpO1xuICAgIH1cblxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMudG9EYXRhVVJMKCk7XG4gICAgfVxuXG4gICAgb25DYW52YXNVcGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZnJhbWVzLnVwZGF0ZVByZXZpZXcoXG4gICAgICAgICAgICB0aGlzLmdldFN0YXRlKClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjbGVhckNhbnZhcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0Q2FudmFzQ29udGV4dCgpO1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwwLCByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XG4gICAgfVxuXG4gICAgZHJhd0ltYWdlID0gKGltYWdlRGF0YTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltYWdlLnNyYyA9IGltYWdlRGF0YTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0Q2FudmFzQ29udGV4dCgpO1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsMCwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuICAgIH1cblxuXG5cbn1cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLnN0YXJ0KCk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJleHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVQb3MoZXZlbnQ6IE1vdXNlRXZlbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0ge1xuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogTWF0aC5mbG9vcihldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgICAgeTogTWF0aC5mbG9vcihldmVudC5jbGllbnRZIC0gcmVjdC50b3ApXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGUoZHJhdzogRnVuY3Rpb24sIHJhdGU6IG51bWJlcikge1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3QgdGltZUJldHdlZW5GcmFtZXMgPSBNYXRoLmZsb29yKDEwMDAgLyByYXRlKTtcbiAgICBsZXQgbmV4dEZyYW1lID0gc3RhcnQgKyB0aW1lQmV0d2VlbkZyYW1lcztcbiAgICBsZXQgaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gX2FuaW1hdGUodGltZSkge1xuICAgICAgICBpZiAodGltZSA+PSBuZXh0RnJhbWUpIHtcbiAgICAgICAgICAgIG5leHRGcmFtZSArPSB0aW1lQmV0d2VlbkZyYW1lcztcbiAgICAgICAgICAgIGRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShfYW5pbWF0ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==