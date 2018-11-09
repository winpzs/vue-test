function init(Vue){
  //全局eventBus，用来组件之间事件传递
  var eventBus = new Vue({
    data: {
      events: {

      }
    }
  });
  window.eventBus = eventBus;
  var iview$Modal = {
    info: function (opts) {
      if (opts && opts.noTimeout) {
        eventBus.$Modal.info(opts);
      } else {
        setTimeout(function () {
          eventBus.$Modal.info(opts);
        }, 300);
      }
    },
    success: function (opts) {
      if (opts && opts.noTimeout) {
        eventBus.$Modal.success(opts);
      } else {
        setTimeout(function () {
          eventBus.$Modal.success(opts);
        }, 300);
      }
    },
    warning: function (opts) {
      if (opts && opts.noTimeout) {
        eventBus.$Modal.warning(opts);
      } else {
        setTimeout(function () {
          eventBus.$Modal.warning(opts);
        }, 300);
      }
    },
    error: function (opts) {
      if (opts && opts.noTimeout) {
        eventBus.$Modal.error(opts);
      } else {
        setTimeout(function () {
          eventBus.$Modal.error(opts);
        }, 300);
      }
    },
    confirm: function (opts) {
      eventBus.$Modal.confirm(opts);
    }
  }
  window.iview$Modal = iview$Modal;
  window.iview$Message = eventBus.$Message;
}

export default{
  init
}