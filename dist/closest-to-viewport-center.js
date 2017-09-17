(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.closestToViewportCenter = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getClosestToViewportCenter;
  function getClosestToViewportCenter(elements) {
    var offsets = {};
    var midY = window.scrollY + window.innerHeight / 2;

    var isTop = window.scrollY === 0;
    var isBottom = window.scrollY + window.innerHeight === document.scrollingElement.scrollHeight;

    if (isTop) {
      return elements[0];
    } else if (isBottom) {
      return elements.slice(-1)[0];
    }

    elements.forEach(function (el, index) {
      var rect = el.getBoundingClientRect();
      var elTop = Math.abs(rect.top);
      var elMiddle = Math.abs(rect.height / 2);
      var distance = Math.abs(midY - (window.scrollY + elTop + elMiddle));
      offsets[distance] = index;
    });

    var index = Object.keys(offsets).sort()[0];
    var elIndex = offsets[index];

    return elements[elIndex];
  }
  module.exports = exports["default"];
});