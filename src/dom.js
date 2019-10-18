/*
 * @Name: Sdom7
 * @Descripttion: 一个常用dom操作方法库,Dom7简化版
 * @Author: 无痕
 * @Date: 2019-10-11 09:57:44
 * @LastEditors: 
 * @LastEditTime: 2019-10-12 14:51:12
 */
function unique (arr) {
  const uniqueArray = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
  }
  return uniqueArray;
}

function toCamelCase (string) {
  return string.toLowerCase().replace(/-(.)/g, (match, group1) => group1.toUpperCase());
}

function $ (selector, context) {
  const arr = [];
  let i = 0;
  if (selector && !context) {
    if (selector instanceof Sdom7) {
      return selector;
    }
  }
  if (selector) {
    // String
    if (typeof selector === 'string') {
      let els;
      let tempParent;
      const html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        let toCreate = 'div';
        if (html.indexOf('<li') === 0) toCreate = 'ul';
        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
        if (html.indexOf('<tbody') === 0) toCreate = 'table';
        if (html.indexOf('<option') === 0) toCreate = 'select';
        tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [document.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          if (context) {
            els = $(context).find(selector.trim());
          } else {
            els = document.querySelectorAll(selector.trim());
          }
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) arr.push(els[i]);
        }
      }
    } else if (selector.nodeType || selector === window || selector === document) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Sdom7(arr);
}

class Sdom7 {
  constructor(arr) {
    const self = this;
    for (let i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }
    self.length = arr.length;
    return this;
  }
  find (selector) {
    const foundElements = [];
    for (let i = 0; i < this.length; i += 1) {
      const found = this[i].querySelectorAll(selector);
      for (let j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Sdom7(foundElements);
  }
  addClass (className) {
    if (typeof className === 'undefined') {
      return this;
    }
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (classes[i] !== '' && typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
      }
    }
    return this;
  }
  removeClass (className) {
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (classes[i] !== '' && typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
      }
    }
    return this;
  }
  hasClass (className) {
    if (!this[0] || className === '') return false;
    return this[0].classList.contains(className);
  }
  toggleClass (className) {
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (classes[i] !== '' && typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
      }
    }
    return this;
  }
  attr (attrs, value) {
    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs);
      return undefined;
    }

    // Set attrs
    for (let i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (const attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  // eslint-disable-next-line
  removeAttr (attr) {
    for (let i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this;
  }
  // eslint-disable-next-line
  prop (props, value) {
    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) return this[0][props];
    } else {
      // Set props
      for (let i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i][props] = value;
        } else {
          // Object
          // eslint-disable-next-line
          for (const propName in props) {
            this[i][propName] = props[propName];
          }
        }
      }
      return this;
    }
  }
  data (key, value) {
    let el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        const dataKey = el.getAttribute(`data-${key}`);
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (let i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  }
  removeData (key) {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  }
  dataset () {
    const el = this[0];
    if (!el) return undefined;
    const dataset = {}; // eslint-disable-line
    if (el.dataset) {
      // eslint-disable-next-line
      for (const dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (let i = 0; i < el.attributes.length; i += 1) {
        // eslint-disable-next-line
        const attr = el.attributes[i];
        if (attr.name.indexOf('data-') >= 0) {
          dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
        }
      }
    }
    // eslint-disable-next-line
    for (const key in dataset) {
      if (dataset[key] === 'false') dataset[key] = false;
      else if (dataset[key] === 'true') dataset[key] = true;
      else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
    }
    return dataset;
  }
  val (value) {
    const dom = this;
    if (typeof value === 'undefined') {
      if (dom[0]) {
        if (dom[0].multiple && dom[0].nodeName.toLowerCase() === 'select') {
          const values = [];
          for (let i = 0; i < dom[0].selectedOptions.length; i += 1) {
            values.push(dom[0].selectedOptions[i].value);
          }
          return values;
        }
        return dom[0].value;
      }
      return undefined;
    }

    for (let i = 0; i < dom.length; i += 1) {
      const el = dom[i];
      if (Array.isArray(value) && el.multiple && el.nodeName.toLowerCase() === 'select') {
        for (let j = 0; j < el.options.length; j += 1) {
          el.options[j].selected = value.indexOf(el.options[j].value) >= 0;
        }
      } else {
        el.value = value;
      }
    }
    return dom;
  }
  // Events
  on (...args) {
    let [eventType, targetSelector, listener, capture] = args;
    if (typeof args[1] === 'function') {
      [eventType, listener, capture] = args;
      targetSelector = undefined;
    }
    if (!capture) capture = false;

    function handleLiveEvent (e) {
      const target = e.target;
      if (!target) return;
      const eventData = e.target.dom7EventData || [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      if ($(target).is(targetSelector)) listener.apply(target, eventData);
      else {
        const parents = $(target).parents(); // eslint-disable-line
        for (let k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
        }
      }
    }
    function handleEvent (e) {
      const eventData = e && e.target ? e.target.dom7EventData || [] : [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      listener.apply(this, eventData);
    }
    const events = eventType.split(' ');
    let j;
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          const event = events[j];
          if (!el.dom7Listeners) el.dom7Listeners = {};
          if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
          el.dom7Listeners[event].push({
            listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          const event = events[j];
          if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
          if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
          el.dom7LiveListeners[event].push({
            listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(event, handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  off (...args) {
    let [eventType, targetSelector, listener, capture] = args;
    if (typeof args[1] === 'function') {
      [eventType, listener, capture] = args;
      targetSelector = undefined;
    }
    if (!capture) capture = false;

    const events = eventType.split(' ');
    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];
      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        let handlers;
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }
        if (handlers && handlers.length) {
          for (let k = handlers.length - 1; k >= 0; k -= 1) {
            const handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this;
  }
  once (...args) {
    const dom = this;
    let [eventName, targetSelector, listener, capture] = args;
    if (typeof args[1] === 'function') {
      [eventName, listener, capture] = args;
      targetSelector = undefined;
    }
    function onceHandler (...eventArgs) {
      listener.apply(this, eventArgs);
      dom.off(eventName, targetSelector, onceHandler, capture);
      if (onceHandler.dom7proxy) {
        delete onceHandler.dom7proxy;
      }
    }
    onceHandler.dom7proxy = listener;
    return dom.on(eventName, targetSelector, onceHandler, capture);
  }
  trigger (...args) {
    const events = args[0].split(' ');
    const eventData = args[1];
    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];
      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        let evt;
        try {
          evt = new window.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        }
        // eslint-disable-next-line
        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
    return this;
  }
  // Sizing/Styles
  width () {
    if (this[0] === window) {
      return window.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'));
    }

    return null;
  }
  outerWidth (includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        const styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  height () {
    if (this[0] === window) {
      return window.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'));
    }

    return null;
  }
  outerHeight (includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        const styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  offset () {
    if (this.length > 0) {
      const el = this[0];
      const box = el.getBoundingClientRect();
      const body = document.body;
      const clientTop = el.clientTop || body.clientTop || 0;
      const clientLeft = el.clientLeft || body.clientLeft || 0;
      const scrollTop = el === window ? window.scrollY : el.scrollTop;
      const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  }
  hide () {
    for (let i = 0; i < this.length; i += 1) {
      this[i].style.display = 'none';
    }
    return this;
  }
  show () {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.style.display === 'none') {
        el.style.display = '';
      }
      if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
        // Still not visible
        el.style.display = 'block';
      }
    }
    return this;
  }
  styles () {
    if (this[0]) return window.getComputedStyle(this[0], null);
    return {};
  }
  css (props, value) {
    let i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (let prop in props) {
            this[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this;
    }
    return this;
  }

  // Dom manipulation
  toArray () {
    const arr = [];
    for (let i = 0; i < this.length; i += 1) {
      arr.push(this[i]);
    }
    return arr;
  }
  // Iterate over the collection passing elements to `callback`
  each (callback) {
    // Don't bother continuing without a callback
    if (!callback) return this;
    // Iterate over the current collection
    for (let i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  }
  filter (callback) {
    const matchedItems = [];
    const dom = this;
    for (let i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
    }
    return new Sdom7(matchedItems);
  }
  map (callback) {
    const modifiedItems = [];
    const dom = this;
    for (let i = 0; i < dom.length; i += 1) {
      modifiedItems.push(callback.call(dom[i], i, dom[i]));
    }
    return new Sdom7(modifiedItems);
  }
  // eslint-disable-next-line
  html (html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this;
  }
  // eslint-disable-next-line
  text (text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this;
  }
  is (selector) {
    const el = this[0];
    let compareWith;
    let i;
    if (!el || typeof selector === 'undefined') return false;
    if (typeof selector === 'string') {
      if (el.matches) return el.matches(selector);
      else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
      else if (el.msMatchesSelector) return el.msMatchesSelector(selector);

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }
      return false;
    } else if (selector === document) return el === document;
    else if (selector === window) return el === window;

    if (selector.nodeType || selector instanceof Sdom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }
      return false;
    }
    return false;
  }
  indexOf (el) {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i] === el) return i;
    }
    return -1;
  }
  index () {
    let child = this[0];
    let i;
    if (child) {
      i = 0;
      // eslint-disable-next-line
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }
      return i;
    }
    return undefined;
  }
  // eslint-disable-next-line
  eq (index) {
    if (typeof index === 'undefined') return this;
    const length = this.length;
    let returnIndex;
    if (index > length - 1) {
      return new Sdom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) return new Sdom7([]);
      return new Sdom7([this[returnIndex]]);
    }
    return new Sdom7([this[index]]);
  }
  append (...args) {
    let newChild;

    for (let k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (let i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Sdom7) {
          for (let j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }
  // eslint-disable-next-line
  appendTo (parent) {
    $(parent).append(this);
    return this;
  }
  prepend (newChild) {
    let i;
    let j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Sdom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }
    return this;
  }
  // eslint-disable-next-line
  prependTo (parent) {
    $(parent).prepend(this);
    return this;
  }
  insertBefore (selector) {
    const before = $(selector);
    for (let i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this[i], before[0]);
      } else if (before.length > 1) {
        for (let j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
        }
      }
    }
  }
  insertAfter (selector) {
    const after = $(selector);
    for (let i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (let j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
        }
      }
    }
  }
  next (selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Sdom7([this[0].nextElementSibling]);
        }
        return new Sdom7([]);
      }

      if (this[0].nextElementSibling) return new Sdom7([this[0].nextElementSibling]);
      return new Sdom7([]);
    }
    return new Sdom7([]);
  }
  nextAll (selector) {
    const nextEls = [];
    let el = this[0];
    if (!el) return new Sdom7([]);
    while (el.nextElementSibling) {
      const next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(next).is(selector)) nextEls.push(next);
      } else nextEls.push(next);
      el = next;
    }
    return new Sdom7(nextEls);
  }
  prev (selector) {
    if (this.length > 0) {
      const el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Sdom7([el.previousElementSibling]);
        }
        return new Sdom7([]);
      }

      if (el.previousElementSibling) return new Sdom7([el.previousElementSibling]);
      return new Sdom7([]);
    }
    return new Sdom7([]);
  }
  prevAll (selector) {
    const prevEls = [];
    let el = this[0];
    if (!el) return new Sdom7([]);
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(prev).is(selector)) prevEls.push(prev);
      } else prevEls.push(prev);
      el = prev;
    }
    return new Sdom7(prevEls);
  }
  siblings (selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  }
  parent (selector) {
    const parents = []; // eslint-disable-line
    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(unique(parents));
  }
  parents (selector) {
    const parents = []; // eslint-disable-line
    for (let i = 0; i < this.length; i += 1) {
      let parent = this[i].parentNode; // eslint-disable-line
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) parents.push(parent);
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(unique(parents));
  }
  closest (selector) {
    let closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return new Sdom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  }
  children (selector) {
    const children = []; // eslint-disable-line
    for (let i = 0; i < this.length; i += 1) {
      const childNodes = this[i].childNodes;

      for (let j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return new Sdom7(unique(children));
  }
  remove () {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }
    return this;
  }
  add (...args) {
    const dom = this;
    let i;
    let j;
    for (i = 0; i < args.length; i += 1) {
      const toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  }
  empty () {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.nodeType === 1) {
        for (let j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this;
  }
}

export default $;
