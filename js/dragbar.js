var drag = {
  init:function() {
    this.dragStart()
  },
  dragStart:function() {
    var self = this
    var target = document.querySelector('.drag-btn-start')
    target.onmousedown = function(e) {
      self.preDef(e)
      var e = self.getEvent(e)
      var _this = this
      var diffX = e.clientX - this.offsetLeft;
      var diffY = e.clientY - this.offsetTop;
      if (typeof this.setCapture != 'undefined') {
        this.setCapture();
      }
      console.log(diffX, diffY)

    }
  },
  // 组织默认行为
  preDef: function (event) {
    var e = this.getEvent(event)
    if (typeof e.preventDefault != 'undefined') {
      e.preventDefault()
    } else { // IE
      e.returnValue = false
    }
  },
  // 获取事件对象
  getEvent: function (event) {
    return event || window.event
  }
}
