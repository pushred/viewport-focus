const serve = require('serve');
const Nightmare = require('nightmare');

const HOST = 'http://localhost';
const PORT = 5000;
const DEMO_URL = `${HOST}:${PORT}/demo.html`;
const W = 300;
const H = 600;
const M = 16;
const Q = H / 4;
const T = Q;

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

test('element passing under the viewport middle is returned', () => {
  return Nightmare()
    .goto(DEMO_URL)
    .viewport(W, H)
    .scrollTo(Q * 1.1, 0)
    .evaluate(() => window.closestEl)
    .end()
    .then(closestEl => expect(closestEl).not.toBeNull() && expect(closestEl.id).toEqual('2'));
});

test('trigger can be offset to element middle', () => {
  return Nightmare()
    .goto(DEMO_URL + '?offset=middle')
    .viewport(W, H)
    .scrollTo(T + (Q * 3.5) + M, 0)
    .evaluate(() => window.closestEl)
    .end()
    .then(closestEl => expect(closestEl).not.toBeNull() && expect(closestEl.id).toEqual('3'));
});
