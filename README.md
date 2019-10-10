Link to demo: https://real-time-messages.herokuapp.com/

# How I built a basic real-time web app

There are two general approaches:

1. Client pull:

	- Short polling
	- Long polling

2. Server push:

	- Web sockets
	- Server-Sent Events (SSEs)

### Short polling

- Making repeated requests to the server can consume a lot of resources. More about this [here](https://medium.com/system-design-blog/long-polling-vs-websockets-vs-server-sent-events-c43ba96df7c1).

### Long polling

- There are many issues with long polling: timeouts, header overhead, latency, caching, etc. These are discussed [here](https://tools.ietf.org/id/draft-loreto-http-bidirectional-07.html#polling-issues).

### WebSockets

The following info comes from [the Stack Overflow community](https://stackoverflow.com/a/5326159).

- WebSockets connections can both send data to the browser and receive data from the browser.
- Can transmit both binary data and UTF-8.
- Some enterprise firewalls with packet inspection have trouble dealing with WebSockets.

More about the real-world issues with WebSockets can be read [here](https://www.smashingmagazine.com/2018/02/sse-websockets-data-flow-http2/).

### Server-Sent Events (SSEs)

The following info comes from [the Stack Overflow community](https://stackoverflow.com/a/5326159).

- SSE connections can only push data to the browser. 
- Can only transmit UTF-8 data.
- SSE suffers from a limitation to the maximum number of open connections.

---

### Why I chose SSEs
When there´s no need for sending binary data, or data from the client, SSEs might be a better option than WebSockets.

If there was a plan to add bidirectional communication in the future, it might be better to use WebSockets from the beginning and avoid reimplementation. In this case, I would consider using something like [SockJS](http://sockjs.org), which uses polling transports as a fallback for old browsers and hosts behind restrictive proxies.

Link to demo: https://new-rides.herokuapp.com/

### Browser support of SSEs

According to [caniuse.com](https://caniuse.com/#search=server%20sent%20events), Server-Sent Events are currently supported by all major browsers but Internet Explorer, Edge, and Opera Mini. I used the [AmvTek's EventSource](https://github.com/amvtek/EventSource) polyfill to support EventSource in browsers where it is not available.
