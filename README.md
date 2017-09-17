closest-to-viewport-middle
==========================

> Given a list of DOM elements, return the one closest to the middle of the browser viewport

[Demo](https://pushred.github.io/closest-to-viewport-middle/demo.html)

Table of Contents
-----------------

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

Install
-------

```sh
npm install closest-to-viewport-middle --save
yarn add closest-to-viewport-middle
```

Install a [document.scrollingElement][] polyfill for [older browser support][support]

Usage
-----

```javascript
<script src="//unpkg.com/underscore@1.8.3/underscore.js"></script>
<script src="//unpkg.com/closest-to-viewport-middle/dist/closest-to-viewport-middle.js"></script>
<script>
  var closestToMiddle = window.closestToViewportMiddle;
  var elements = document.querySelectorAll('section');
  // jQuery: var elements = $('section')[0];

  function getClosestEl() {
    var closestEl = closestToMiddle(elements);
    // closestEl is at your command
  }

  getClosestEl();
  window.addEventListener('scroll', _.throttle(getClosestEl, 100));
</script>
});
```

### In the Future

```javascript
import throttle from 'lodash/throttle';
import closestToMiddle from 'closest-to-viewport-middle';

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('section');

  function getClosestEl() {
    const closestEl = closestToMiddle(elements);
    // closestEl is at your command
  }

  getClosestEl();
  window.addEventListener('scroll', throttle(getClosestEl, 100));
});
```

API
---

### `closestToMiddle(elements: Array|NodeList, offset?: String) => HTMLElement`

`offset`

- `bounds` - top and bottom are compared to the viewport middle — *default*
- `middle` - element height is compared to viewport middle

Contribute
----------

Pull requests accepted!

License
-------

**[ISC](./LICENSE) LICENSE**  
Copyright &copy; 2017 Push the Red Button


[document.scrollingElement]: https://github.com/mathiasbynens/document.scrollingElement
[support]: https://developer.mozilla.org/en-US/docs/Web/API/Document/scrollingElement#Browser_compatibility
