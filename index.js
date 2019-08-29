const express = require('express');
const path = require('path');
const sse = require('./server/sse.js');

const port = process.env.PORT || 5000
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
)

app.get('/events', function(req, res) {
  // Inform the client that this is a permanent connection
  res.set('Connection', 'keep-alive')

  // Inform the client that this connection uses the Server-Sent Events protocol
  res.set('Content-Type', 'text/event-stream')

  // Ask the client not to store data into its local cache, so that data read by
  // the client is really sent by the server and not some old, out-of-date data
  // received in the past.
  res.set('Cache-Control', 'no-cache')

  // Send missed events if the clients lost some events due to network issues
  sse.sendMissedEvents(req, res);

  // Schedule the sending of events to simulate new rides
  sse.sendEvents(res);

  // Handle the connection close request
  req.on('close', function() {
    sse.stop();
    res.end();
  });
});

app.listen(port, () => console.log(`Listening on ${ port }`))
