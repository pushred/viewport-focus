viewport-focus
==============

> Given a list of DOM elements, return the one closest to the focal point of the browser viewport

[Demo](https://pushred.github.io/viewport-focus/demo.html)

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
npm install viewport-focus --save
yarn add viewport-focus
```

Install a [document.scrollingElement][] polyfill for [older browser support][support]

Usage
-----

```javascript
<script src="//unpkg.com/underscore@1.8.3/underscore.js"></script>
<script src="//unpkg.com/viewport-focus/dist/viewport-focus.js"></script>
<script>
  var getViewportFocus = window.viewportFocus;
  var elements = document.querySelectorAll('section');
  // jQuery: var elements = $('section')[0];

  function setClosestEl() {
    var closestEl = getViewportFocus(elements);
    // closestEl is at your command
  }

  setClosestEl();
  window.addEventListener('scroll', _.throttle(setClosestEl, 100));
</script>
});
```

### In the Future

```javascript
import throttle from 'lodash/throttle';
import getViewportFocus from 'viewport-focus';

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('section');

  function setClosestEl() {
    const closestEl = getViewportFocus(elements);
    // closestEl is at your command
  }

  setClosestEl();
  window.addEventListener('scroll', throttle(setClosestEl, 100));
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
