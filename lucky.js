;(function () {
  
  var LotteryMachine = function (options) {
    var defaults = {
      speed: 100,
      cycles: 5,
      track: [0, 1, 2, 5, 8, 7, 6, 3],
      btnText: '点击抽奖',
      activeClass: 'active'
    }
    this.options = options || defaults;
    this.cells = null;
    this.btn = null;
    this.winner = null;
    this.times = 0;
    this.current = 0;
    this.prev = null;
    this.running = false;
  }
  
  LotteryMachine.prototype.init = function () {
    var cells = [].slice.call(document.querySelectorAll('.cell'));
    this.cells = cells;
    this.btn = cells[4];
    this.btn.addEventListener('touchstart', this.run.bind(this), false);
    return this;
  }
  LotteryMachine.prototype.getTimes = function () {
    return this.times;
  }
  LotteryMachine.prototype.setTimes = function (value) {
    this.times = value / 1 || 0;
    return this;
  };
  LotteryMachine.prototype.getWinner = function () {
    return this.winner;
  }
  LotteryMachine.prototype.setWinner = function (value) {
    this.winner = value / 1 || 0;
    return this;
  }
  LotteryMachine.prototype.run = function () {
    console.log('run')
    var
      ops = this.options,
      track = ops.track;
    if (!this.times || this.running || track.indexOf(this.winner) < 0) {
      console.group('run false')
      console.log('times: %o', this.times)
      console.log('running: %o', this.running)
      console.log('winner: %o', this.winner)
      console.groupEnd()
      return false;
    }
    console.group('run')
    this.running = true;
    var
      that = this,
      cells = this.cells,
      activeClass = ops.activeClass,
      size = track.length,
      cycles = ops.cycles,
      speed = ops.speed,
      rings = 0,
      timer = null,
      slowIndex = random(0, size - 1),
      delta = 20,
      k = 0
    
    console.log('winner: %o', this.getWinner())
    var turn = function () {
      console.group('turn')
      var
        current = that.current,
        cellIndex = track[current],
        activeCell = cells[cellIndex]
      console.log('rings: %o', rings)
      console.log('cycles: %o', cycles)
      console.log('slowIndex: %o', slowIndex)
      console.log('cellIndex: %o', cellIndex)
      console.log('activeCell: %o', activeCell)
      console.log('activeCell: %o', activeCell)
      cells.forEach(function (item) {
        if (item !== activeCell) {
          removeClass(item, activeClass);
        }
      })
      addClass(activeCell, activeClass);
      if (rings >= cycles && cellIndex === that.winner) {
        clearTimeout(timer);
        rings = 0;
        that.running = false;
        that.winner = null;
        that.prev = that.current;
        that.times = --that.times < 0 ? 0 : that.times;
      } else {
        that.current = ++current < size ? current : 0;
        if (that.prev === null) {
          if (that.current === size - 1) {
            rings++
          }
        } else {
          if (that.current === that.prev) {
            rings++
          }
        }
        if(rings === 0) {
          speed -= 6
        } else if (rings >= Math.floor(cycles - 1)) {
          speed += delta + this.current * 2.4
        }
        setTimeout(turn.bind(this), speed)
      }
      console.log('speed: %o', speed);
      console.groupEnd()
    }
    turn.call(this);
    console.groupEnd()
    return this;
  }
  
  LotteryMachine.prototype.reset = function (value) {
    this.winner = null;
    this.times = 0;
    this.current = 0;
    this.prev = null;
    this.running = false;
    return this;
  }
  
  LotteryMachine.prototype.destory = function () {
    this.reset();
    this.btn.removeEventListener('click', this.run)
    this.cells = null;
    this.btn = null;
    return this;
  }
  
  function createCells() {
  
  }
  
  function createLights() {
  
  }
  
  function easeInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }
  
  function addClass(el, classnName) {
    if (!el.classList.contains(classnName)) {
      el.classList.add(classnName)
    }
  }
  
  function removeClass(el, classnName) {
    if (el.classList.contains(classnName)) {
      el.classList.remove(classnName)
    }
  }
  
  function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  window.LotteryMachine = LotteryMachine;
  
  
})();
