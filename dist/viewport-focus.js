(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.viewportFocus = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getViewportFocus;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var PREFIX = 'viewport-focus:';

  /**
   * Viewport focal point presets
   * @typedef {(top|quarter|middle)} FocalPoint
   */

  /**
   * getViewportFocus
   * Returns the element closest to the middle of the browser viewport
   *
   * @param {Array|NodeList} elements
   * @param {Object} options
   * @param {FocalPoint|Number} [options.focalPoint] - point within viewport that elements are compared against; defaults to 'middle'
   * @param {String} [options.offset] - shift trigger to middle of element if set to 'middle'
   * @returns {HTMLElement} - closest element
   */

  function getViewportFocus(elements, options) {
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') return console.error(PREFIX, 'options must be specified as an object');

    // stop if required DOM interfaces are missing
    if (window === undefined || window.scrollY === undefined || window.innerHeight === undefined) return;
    if (document === window || !document.scrollingElement) return;

    var _options$focalPoint = options.focalPoint,
        focalPoint = _options$focalPoint === undefined ? 'middle' : _options$focalPoint,
        offset = options.offset;


    var hasElements = elements !== undefined && (Array.isArray(elements) || elements instanceof NodeList) && elements.length;

    if (!hasElements) return console.error(PREFIX, 'Array or NodeList of HTML elements required');
    if (elements instanceof NodeList) elements = [].slice.call(elements);

    var isMiddleOffset = offset && /center|middle/.test(offset);
    if (offset && !isMiddleOffset) console.warn(PREFIX, 'only "middle" offset is supported');

    // focalPoint presets

    var focalPointY = !/top|quarter|middle/i.test(focalPoint) && window.scrollY + parseInt(focalPoint, 10);
    if (focalPoint === 'top') focalPointY = window.scrollY;
    if (focalPoint === 'quarter') focalPointY = window.scrollY + window.innerHeight / 4;
    if (focalPoint === 'middle') focalPointY = window.scrollY + window.innerHeight / 2;
    if (typeof focalPointY !== 'number') return console.error(PREFIX, 'focalPoint must be a pixel value, or one of: top, quarter, middle');

    // auto-select first/last elements at top and bottom of viewport, where they may not reach the focal point

    var isTop = window.scrollY === 0;
    var isBottom = window.scrollY + window.innerHeight === document.scrollingElement.scrollHeight;

    if (isTop) {
      return elements[0];
    } else if (isBottom) {
      return elements.slice(-1)[0];
    }

    // determine element closest to focal point (with any offset applied)

    var offsets = elements.reduce(function (offsets, el, index) {
      var rect = el.getBoundingClientRect();
      var elTop = Math.abs(window.scrollY + rect.top);

      var elOffset = isMiddleOffset ? Math.abs(rect.height / 2) : rect.height;

      var distance = Math.abs(focalPointY - (elTop + elOffset));
      offsets[distance] = index;

      if (elOffset === rect.height) {
        var topDistance = Math.abs(focalPointY - elTop);
        offsets[topDistance] = index;
      }

      return offsets;
    }, {});

    var index = Object.keys(offsets).sort(function (a, b) {
      return parseFloat(a) - parseFloat(b);
    })[0];
    var elIndex = offsets[index];

    return elements[elIndex];
  }
  module.exports = exports['default'];
});