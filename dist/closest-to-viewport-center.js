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
  function getClosestToViewportCenter(elements, offset) {
    var isCenterOffset = offset && /center|middle/.test(offset);

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
      var elOffset = void 0;

      if (isCenterOffset) elOffset = Math.abs(rect.height / 2);
      if (!offset) elOffset = rect.height;

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
  module.exports = exports["default"];
});