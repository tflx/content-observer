# content-observer

Watch one or more targets position for when they intersect a defined point in the viewport. Uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)




## Features

- Supports vertical and horizontal scrolling
- Define a point in pixels or a percentage of the screen height/width
- Re-calculates on browser resize
- Update hash-location automatically - requires id on the target(s)
- Disconnect to stop watching targets

## Installation


```html
<script src="dist/main.js"></script>
```

`ContentObserver` will be available in the global scope.

Or install via NPM/Yarn and require as a module

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add content-observer
```

or NPM:

```sh
npm install content-observer --save
```

## Usage

```js
import ContentObserver from 'content-observer';

class App {
  constructor() {
    const co = new ContentObserver(document.querySelectorAll('.observe'), {
      callback: this.handleCallback,
      offset: 200,
      enableLocationHash: true,
      direction: 'vertical'
    });
  }

  handleCallback(target, inView) {
    if (inView) document.querySelector('header').innerHTML = target.id.toUpperCase();
  }
}

export default new App;
```
**The constructor accepts two arguments: the targets (required)  to watch and an options object.**


To stop watching target(s):
```js
co.disconnect()
```




### Options


| Name            | Type               | Default | Required | Description                                                                                                                                                    |
| --------------- | ------------------ | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **callback**        | function            | null  | false    | The function called when targets intersect/leaves the offset
| **offsett**        | number\|string            | 0  | false    | The offset from top/left of viewport. A number indicates pixels from top/left of viewport. A string should be fx.: **'50%'**
| **enableLocationHash**  | boolean             | false   | false    | Update the location hash when a target with an id intersects the offset                            |
| **direction**   | string | 'vertical'       | false    | The scroll direction



### Methods


| Name            | Description |
| --------------- | ----------- |
| **disconnect**  | Stop watching target(s)







## Intersection Observer

[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is the API used to determine if an element intersects the offset or not. [Browser support is really good](http://caniuse.com/#feat=intersectionobserver) - With [Safari adding support in 12.1](https://webkit.org/blog/8718/new-webkit-features-in-safari-12-1/), all major browsers now support Intersection Observers natively. Add the polyfill, so it doesn't break on older versions of iOS and IE11.

### Polyfill

You can import the [polyfill](https://www.npmjs.com/package/intersection-observer) directly or use a service like [polyfill.io] https://polyfill.io/v2/docs/) to add it when needed.

```sh
yarn add intersection-observer
```

Then import it in your app:

```js
import 'intersection-observer'
```
