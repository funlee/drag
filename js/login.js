var drag = {
  init:function() {
    this.lock()
    this.resize(this.lock)
    this.center('.login')
    this.draged()
  },
  draged:function() {
    var self = this
    var login = document.querySelector('.login')
    login.onmousedown = function(e) {
      self.preDef(e)
      var e = self.getEvent(e)
      var _this = this;
      var diffX = e.clientX - this.offsetLeft;
      var diffY = e.clientY - this.offsetTop;
      if (typeof this.setCapture != 'undefined') {
        this.setCapture();
      }
      document.onmousemove = function (e) {
        var e = self.getEvent(e);
        var left = e.clientX - diffX;
        var top = e.clientY - diffY;
        if (left < 0) {
          left = 0;
        } else if (left > self.getInner().width - _this.offsetWidth) {
          left = self.getInner().width - _this.offsetWidth;
        }

        if (top < 0) {
          top = 0;
        } else if (top > self.getInner().height - _this.offsetHeight) {
          top = self.getInner().height - _this.offsetHeight;
        }

        _this.style.left = left + 'px';
        _this.style.top = top + 'px';
      }
      document.onmouseup = function () {
        this.onmousemove = null;
        this.onmouseup = null;
        if (typeof _this.releaseCapture != 'undefined') {
          _this.releaseCapture();
        }
      }
    }
  },
  // 锁屏
  lock:function() {
    var screen = document.querySelector('.screen')
    var size = drag.getInner()
    screen.style.width = size.width + 'px'
    screen.style.height = size.height + 'px'
    document.documentElement.style.overflow = 'hidden'; // 锁屏
  },
  // 跨浏览器获取视口大小
  getInner:function() {
    if (typeof window.innerWidth != 'undefined') {
      return {
        width : window.innerWidth,
        height : window.innerHeight
      }
    } else {
      return {
        width : document.documentElement.clientWidth,
        height : document.documentElement.clientHeight
      }
    }
  },
  // 组织默认行为
  preDef:function(event) {
    var e = this.getEvent(event)
    if(typeof e.preventDefault != 'undefined') {
      e.preventDefault()
    } else { // IE
      e.returnValue = false
    }
  },
  // 获取事件对象
  getEvent:function(event) {
    return event || window.event
  },
  // 触发浏览器窗口事件 
  resize:function(fn) {
    window.onresize = function() {
      fn()
    }
  },
  // 设置物体居中
  center:function(el) {
    var target = document.querySelector(el)
    target.style.display = 'block' // 这样才有clientWidth 、clientHeight
    var width = target.clientWidth
    var height = target.clientHeight
    var top = (document.documentElement.clientHeight - height) / 2
    var left = (document.documentElement.clientWidth - width) / 2
    target.style.top = top + 'px'
    target.style.left = left + 'px'
  }
}