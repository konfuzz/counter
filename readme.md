# Counter Class Documentation

The `Counter` class is a versatile utility for animating numerical values over time, with support for easing functions, visibility triggers, and customizable formatting. This documentation covers all aspects of the class, including its properties, methods, and events.

---

## **Table of Contents**
1. [Installation](#installation)
2. [Usage](#usage)
3. [Constructor Parameters](#constructor-parameters)
4. [Methods](#methods)
5. [Events](#events)
6. [Examples](#examples)

---

## **Installation**

To use the `Counter` class, simply include it in your JavaScript project:

```javascript
// Include the Counter class in your project
// If using ES modules:
import Counter from './Counter.js';

// If using a script tag:
<script src="path/to/Counter.js"></script>
```

---

## **Usage**

```javascript
const element = document.querySelector('#counter');
const counter = new Counter(element, options);
```
or
```javascript
const counter = new Counter('#counter', options); 
```

---

## **Constructor Parameters**

### `new Counter(element, options)`
Initializes the counter on a given element with specified options.

| Parameter   | Type          | Default     | Description                                                                 |
|-------------|---------------|-------------|-----------------------------------------------------------------------------|
| `element`   | `HTMLElement` or `String` | `required`  | The target element to display the counter value.                           |
| `options`   | `Object`      | `{}`        | Configuration options for the counter animation.                           |

### **Options**

| Option        | Type       | Default       | Description                                                                                   |
|---------------|------------|---------------|-----------------------------------------------------------------------------------------------|
| `start`       | `number`   | `0`           | The starting value of the counter.                                                           |
| `end`         | `number`   | `required`    | The ending value of the counter.                                                             |
| `duration`    | `number`   | `2000`        | The animation duration in milliseconds.                                                      |
| `step`        | `number`   | `1`           | The increment or decrement step size.                                                        |
| `formatter`   | `Function` | `(value) => value` | A function to format the displayed value.                                                    |
| `lazy`        | `boolean`  | `false`       | Whether the counter should start when it becomes visible in the viewport.                    |
| `playOnce`    | `boolean`  | `false`       | If `true`, the counter animates only once when it enters the viewport (requires `lazy`).      |
| `easing`      | `string`   | `'linear'`    | The easing function to use. See [Supported Easing Functions](#supported-easing-functions).    |
| `autostart`   | `boolean`  | `true`        | Whether the animation starts automatically upon initialization.                              |

---

## **Methods**

### `animate()`
Starts the animation.

### `stop()`
Stops the animation and records the elapsed time.

### `resume()`
Resumes the animation from the point it was stopped.

### `reset()`
Resets the counter to its starting value and clears the elapsed time.

### `destroy()`
Stops the counter and cleans up all event listeners and observers.

### `on(eventName, callback)`
Registers an event listener.

| Parameter   | Type       | Description                         |
|-------------|------------|-------------------------------------|
| `eventName` | `string`   | The name of the event to listen for.|
| `callback`  | `Function` | The callback function to invoke.    |

### `off(eventName, callback)`
Removes an event listener.

| Parameter   | Type       | Description                         |
|-------------|------------|-------------------------------------|
| `eventName` | `string`   | The name of the event to remove.    |
| `callback`  | `Function` | The callback function to remove.    |

---

## **Events**

| Event Name   | Description                                                                           |
|--------------|---------------------------------------------------------------------------------------|
| `start`      | Fired when the animation starts.                                                     |
| `update`     | Fired on each frame of the animation. Passes the current value as an argument.       |
| `complete`   | Fired when the animation completes.                                                  |

---

## **Supported Easing Functions**

| Name             | Description                                       |
|------------------|---------------------------------------------------|
| `linear`         | Linear easing (constant speed).                   |
| `easeInQuad`     | Starts slow and accelerates.                      |
| `easeOutQuad`    | Starts fast and decelerates.                      |
| `easeInOutQuad`  | Accelerates, then decelerates.                    |
| `easeInCubic`    | Accelerates faster than quadratic easing.         |
| `easeOutCubic`   | Decelerates faster than quadratic easing.         |
| `easeInOutCubic` | Combines cubic acceleration and deceleration.     |
| `easeInExpo`     | Exponential acceleration.                        |
| `easeOutExpo`    | Exponential deceleration.                        |

---

## **Examples**

### Basic Usage
```javascript
const counter = new Counter('#counter', {
  start: 0,
  end: 100,
  duration: 2000,
});
```

### Using a Custom Formatter
```javascript
const counter = new Counter('#counter', {
  start: 0,
  end: 1000,
  duration: 3000,
  formatter: (value) => `$${value.toFixed(2)}`,
});
```

### Lazy Loading with `playOnce`
```javascript
const counter = new Counter('#counter', {
  start: 0,
  end: 500,
  lazy: true,
  playOnce: true,
});
```

### Event Listeners
```javascript
const counter = new Counter('#counter', {
  start: 0,
  end: 100,
});

counter.on('update', (value) => console.log('Current Value:', value));
counter.on('complete', () => console.log('Animation Complete!'));
```

---

## **Browser Compatibility**

The `Counter` class is compatible with all modern browsers that support `requestAnimationFrame` and `IntersectionObserver`. 

---

## **License**

This project is licensed under the MIT License.