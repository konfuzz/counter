export default class Counter {
  constructor(element, {
    start = 0,
    end,
    duration = 2000,
    step = 1,
    formatter = null,
    lazy = false,
    playOnce = false,
    easing = 'linear',
    autostart = true,
  }) {
    if (!element) {
      throw new Error('Element is required');
    }
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) {
      throw new Error('Element not found');
    }

    if (duration <= 0) {
      throw new Error('Duration must be positive');
    }

    if (end === undefined) {
      throw new Error('End value is required');
    }

    if (!Counter.easingFunctions[easing]) {
      throw new Error('Invalid easing function');
    }

    this.start = parseFloat(start);
    this.end = parseFloat(end);
    this.duration = duration;
    this.step = parseFloat(step);
    this.formatter = formatter || ((value) => value);
    this.autostart = autostart;
    this.lazy = lazy;
    this.isStopped = false;
    this.playOnce = playOnce;
    this.easing = easing;
    this.listeners = new Map();
    this.elapsedTime = 0;

    if (this.lazy) {
      this.observeVisibility();
    } else {
      if (this.autostart) this.animate();
    }
  }

  static easingFunctions = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  };

  animate() {
    this.isStopped = false;
    let startTime = null;

    const isReverse = this.start > this.end;
    const diff = Math.abs(this.end - this.start);

    const updateFrame = (timestamp) => {
      if (this.isStopped) return;

      if (!startTime) {
        startTime = timestamp - this.elapsedTime;
        this.startTime = timestamp;
        this.emit('start');
      }

      let progress = Math.min((timestamp - startTime) / this.duration, 1);
      const easedProgress = Counter.easingFunctions[this.easing](progress);

      let current;
      if (isReverse) {
        current = Math.max(this.start - (diff * easedProgress), this.end);
      } else {
        current = Math.min(this.start + (diff * easedProgress), this.end);
      }

      if (this.step !== 0) {
        current = Math.round(current / this.step) * this.step;
      }

      const value = this.formatter(current, progress);
      this.element.textContent = value;
      this.emit('update', current);

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      } else {
        this.emit('complete');
        this.elapsedTime = 0;
      }
    };

    requestAnimationFrame(updateFrame);
  }

  observeVisibility() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.playOnce) this.observer.unobserve(this.element);
          this.animate();
        }
      });
    });

    this.observer.observe(this.element);
  }

  stop() {
    if (this.isStopped) return;
    this.isStopped = true;
    if (this.startTime !== null) {
      this.elapsedTime += performance.now() - this.startTime;
    }
  }

  resume() {
    if (this.isStopped) {
      this.animate();
    }
  }

  reset() {
    this.elapsedTime = 0;
    this.startTime = null;
    this.isStopped = false;
    this.element.textContent = this.start;
  }

  destroy() {
    this.stop();
    if (this.observer) {
      this.observer.disconnect();
    }
    this.listeners.clear();
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName).add(callback);
  }

  off(eventName, callback) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).delete(callback);
    }
  }

  emit(eventName, data) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).forEach(callback => callback(data));
    }
  }
}
