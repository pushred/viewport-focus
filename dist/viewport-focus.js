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
  var PREFIX = 'viewport-focus:';

  /**
   * getViewportFocus
   * Returns the element closest to the middle of the browser viewport
   *
   * @param {Array|NodeList} elements
   * @param {String} [offset] - shift trigger to middle of element if set to 'middle'
   * @returns {HTMLElement} - closest element
   */

  function getViewportFocus(elements, offset) {
    if (!elements && !Array.isArray(elements) && !(elements instanceof NodeList)) {
      return console.error(PREFIX, 'Array or NodeList of HTML elements required');
    }

    if (elements instanceof NodeList) elements = [].slice.call(elements);

    var isMiddleOffset = offset && /center|middle/.test(offset);
    if (offset && !isMiddleOffset) console.warn(PREFIX, 'only "middle" offset is supported');

    var midY = window.scrollY + window.innerHeight / 2;

    var isTop = window.scrollY === 0;
    var isBottom = window.scrollY + window.innerHeight === document.scrollingElement.scrollHeight;

    if (isTop) {
      return elements[0];
    } else if (isBottom) {
      return elements.slice(-1)[0];
    }

    var offsets = elements.reduce(function (offsets, el, index) {
      var rect = el.getBoundingClientRect();
      var elTop = Math.abs(window.scrollY + rect.top);

      var elOffset = isMiddleOffset ? Math.abs(rect.height / 2) : rect.height;

      var distance = Math.abs(midY - (elTop + elOffset));
      offsets[distance] = index;

      if (elOffset === rect.height) {
        var topDistance = Math.abs(midY - elTop);
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