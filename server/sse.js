/**
 * Module for sending Sever-Sent Events (SSE) messages.
 */

// Each time an event is sent to the client, it is also stored in the
// "eventHistory" array. If the client loses some event due to network issues,
// this array will be used to send the missed events.
const eventHistory = [];

// A counter of events sent is used to set the "id" property of the event
// messages.
let counter = 0;

// We store the interval ID so that we can call the "clearInterval()" method
// when the client stops the updates.
let interval;

const sse = {
  /**
   * Sends missed events if the clients lost some events due to network issues.
   */
  sendMissedEvents(req, res, eventHistory) {
    // If the "last-event-id" is present, it means that a network issue happened
    if (req.headers["last-event-id"]) {
      const eventId = parseInt(req.headers["last-event-id"]);

      // Get the missed events from the "eventHistory" array
      const eventsToReSend = eventHistory.filter(e => e.id > eventId);

      // Send the missed events
      eventsToReSend.forEach(e => {
        if (!res.finished) {
          res.write(e);
        }
      });
    }
  },

  /**
   * Schedules the sending of events to simulate new messages.
   */
  sendEvents(res) {
    interval = setInterval(function () {
      // Since our server event generators are scheduled by using "setInterval",
      // it could happen that an attempt to send an event to the client may be
      // made after the connection has been closed, which would raise an
      // exception. We avoid this by checking if the connection is still alive.
      if (!res.finished) {
        let event = '';

        // When a network issue happens and the connection to an event stream is
        // lost, the browser will automatically attempt to restore the
        // connection. When the connection is established again, the browser
        // will automatically send the ID of the last received event in
        // the Last-Event-Id HTTP header. We will use this ID to send missed
        // events.
        event += `id: ${++counter}\n`;

        // SSEs allows us to set the "event" property so that we can handle
        // different types of events in an easy way.
        event += 'event: newmessages\n';

        // For this example, the event data will consist of the current time.
        const time = (new Date()).toLocaleTimeString();
        event += 'data: ' + time;

        // The "\n\n" indicates the end of the event message
        event += '\n\n';

        res.write(event);

        // We store the event in case we need to resend it due to connection loss
        eventHistory.push(event);
      }
    }, 2000); // send an event every 2 seconds
  },

  /**
   * Stops the sending of events
   */
  stop() {
    clearInterval(interval);
    console.log('Stopped sending events.');
  }
};

module.exports = sse;
