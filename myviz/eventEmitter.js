const eventEmitter = {
    events: {},
    on: function(event, listener) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    },
    emit: function(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(listener => listener(data));
      }
    }
  };
  
  export default eventEmitter;
