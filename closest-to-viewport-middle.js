export default function closestToViewportMiddle (elements, offset) {
  const isMiddleOffset = offset && /center|middle/.test(offset);

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
    let elOffset;

    if (isMiddleOffset) elOffset = Math.abs(rect.height / 2);
    if (!offset) elOffset = rect.height;

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
