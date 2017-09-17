export default function getClosestToViewportCenter (elements) {
  const offsets = {};
  const midY = window.scrollY + (window.innerHeight / 2);

  const isTop = window.scrollY === 0;
  const isBottom = (window.scrollY + window.innerHeight) === document.scrollingElement.scrollHeight

  if (isTop) {
    return elements[0];
  } else if (isBottom) {
    return elements.slice(-1)[0];
  }

  elements.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const elTop = Math.abs(rect.top);
    const elMiddle = Math.abs(rect.height / 2)
    const distance = Math.abs(midY - (window.scrollY + elTop + elMiddle));
    offsets[distance] = index;
  });

  const index = Object.keys(offsets).sort()[0];
  const elIndex = offsets[index];

  return elements[elIndex];
}
