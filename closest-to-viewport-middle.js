const PREFIX = 'closest-to-viewport-middle:';

/**
 * closestToViewportMiddle
 * Returns the element closest to the middle of the browser viewport
 *
 * @param {Array|NodeList} elements
 * @param {String} [offset] - shift trigger to middle of element if set to 'middle'
 * @returns {HTMLElement} - closest element
 */

export default function closestToViewportMiddle (elements, offset) {
  if (!elements && !Array.isArray(elements) && !(elements instanceof NodeList)) {
    return console.error(PREFIX, 'Array or NodeList of HTML elements required');
  }

  if (elements instanceof NodeList) elements = [].slice.call(elements);

  const isMiddleOffset = offset && /center|middle/.test(offset);
  if (offset && !isMiddleOffset) console.warn(PREFIX, 'only "middle" offset is supported');

  const midY = window.scrollY + (window.innerHeight / 2);

  const isTop = window.scrollY === 0;
  const isBottom = (window.scrollY + window.innerHeight) === document.scrollingElement.scrollHeight;

  if (isTop) {
    return elements[0];
  } else if (isBottom) {
    return elements.slice(-1)[0];
  }

  const offsets = elements.reduce((offsets, el, index) => {
    const rect = el.getBoundingClientRect();
    const elTop = Math.abs(window.scrollY + rect.top);

    const elOffset = isMiddleOffset
      ? Math.abs(rect.height / 2)
      : rect.height;

    const distance = Math.abs(midY - (elTop + elOffset));
    offsets[distance] = index;

    if (elOffset === rect.height) {
      const topDistance = Math.abs(midY - elTop);
      offsets[topDistance] = index;
    }

    return offsets;
  }, {});

  const index = Object.keys(offsets).sort((a, b) => parseFloat(a) - parseFloat(b))[0];
  const elIndex = offsets[index];

  return elements[elIndex];
}
