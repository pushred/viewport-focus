const serve = require('serve');
const Nightmare = require('nightmare');

const HOST = 'http://localhost';
const PORT = 5000;
const DEMO_URL = `${HOST}:${PORT}/demo.html`;
const W = 300;
const H = 600;
const M = 16;

beforeAll(() => {
  return new Promise(resolve => {
    setTimeout(resolve, 2000) // wait for serve to start
  });
});

test('first element is returned when at top of viewport', () => {
  return Nightmare()
    .goto(DEMO_URL)
    .viewport(W, H)
    .evaluate(() => window.closestEl)
    .end()
    .then(closestEl => expect(closestEl).not.toBeNull() && expect(closestEl.id).toEqual('1'));
});

test('last element is returned when at bottom of viewport', () => {
  return Nightmare()
    .goto(DEMO_URL)
    .viewport(W, H)
    .scrollTo(H, 0)
    .evaluate(() => window.closestEl)
    .end()
    .then(closestEl => expect(closestEl).not.toBeNull() && expect(closestEl.id).toEqual('4'));
});

test('element passing under the viewport center is returned', () => {
  const CENTER = (H / 4) + (M * 2);

  return Nightmare()
    .goto(DEMO_URL)
    .viewport(W, H)
    .scrollTo(CENTER, 0)
    .evaluate(() => window.closestEl)
    .end()
    .then(closestEl => expect(closestEl).not.toBeNull() && expect(closestEl.id).toEqual('2'));
});
