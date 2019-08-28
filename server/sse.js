const eventHistory = [];
let counter = 0;
let interval;

const sse = {
  /**
   * The description
   */
  sendMissedEvents(req, res, eventHistory) {
    if (req.headers["last-event-id"]) {
      const eventId = parseInt(req.headers["last-event-id"]);

      const eventsToReSend = eventHistory.filter(e => e.id > eventId);

      eventsToReSend.forEach(e => {
        if (!res.finished) {
          res.write(e);
        }
      });
    }
  },

  /**
   * The description
   */
  sendEvents(res) {
    interval = setInterval(function () {
      let event = '';

      event += `id: ${++counter}\n`;

      event += 'event: newrides\n';

      const time = (new Date()).toLocaleTimeString();
      event += 'data: ' + time;

      event += '\n\n';

      res.write(event);

      eventHistory.push(event);
    }, 2000);
  },

  /**
   * The description
   */
  stop() {
    clearInterval(interval);
    console.log('Stopped sending events.');
  }
};

module.exports = sse;
