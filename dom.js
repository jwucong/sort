;(function (win, doc, undef) {

  var dom = function (selector, context) {
    return new Dom(selector, context);
  }

  var Dom = function (selector, context) {
    this.length = 0;
    if (!selector) {
      return this;
    }
    if (selector instanceof Dom) {
      return selector;
    }
    var
      n = 0,
      list = [],
      cxt = context instanceof Dom ? context[0] : context;
    cxt = isElement(cxt) ? cxt : doc;
    if (isType(selector, 'string')) {
      n = selector.length;
      if (selector[0] === '<' && selector[n - 1] === '>' && n >= 3) {
        var div = doc.createElement('div');
        div.innerHTML = selector;
        list = toArray(div.childNodes);
      } else {
        list = toArray(cxt.querySelectorAll(selector));
      }
    } else if (isType(selector, 'array')) {
      list = selector;
    } else {
      list = [selector];
    }
    this.push.apply(this, list);
  }

  Dom.each = function (arrayLike, cb) {
    var size = arrayLike.length, i = 0;
    for (; i < size; i++) {
      if (cb.call(arrayLike[i], i, arrayLike[i]) === false) {
        break;
      }
    }
    return arrayLike;
  }

  Dom.prototype.push = [].push;
  Dom.prototype.splice = [].splice;

  Dom.prototype.get = function (n) {
    if (isType(+n, 'number') && !isNaN(+n)) {
      return this[n < 0 ? this.length + n : n];
    }
  }

  Dom.prototype.each = function (cb) {
    return Dom.each(this, cb)
  }

  Dom.prototype.children = function () {
    var el = this[0], list = [];
    if (isElement(el)) {
      Dom.each(el.childNodes, function () {
        this.nodeType === 1 && list.push(this);
      })
    }
    return dom(list);
  }

  Dom.prototype.insertBefore = function () {

  }

  Dom.prototype.insertAfter = function () {

  }

  Dom.prototype.remove = function () {

  }


  function getType(value) {
    if (value === void 0) {
      return 'Undefined';
    }
    if (value === null) {
      return 'Null';
    }
    var type = {}.toString.call(value).slice(8, -1);
    return type;
  }

  function isType(value, type) {
    if ('string' !== typeof type) {
      return false;
    }
    return type.toLowerCase() === getType(value).toLowerCase();
  }

  function isElement(value) {
    var type = getType(value);
    var reg = /HTML([a-zA-Z]+)Element/i;
    var match = reg.exec(type);
    return !!(match && match[1] !== 'Unknown');
  }

  function isNodeList(value) {
    return 'NodeList' === getType(value);
  }

  function toArray(arrayLike) {
    return arrayLike && arrayLike.length ? [].slice.call(arrayLike) : [];
  }

  win.dom = dom;


})(this, document, void 0);
