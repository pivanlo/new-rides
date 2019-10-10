/**
 * React component that displays a real-time counter and feed of messages coming from the server.
 * Uses the EventSource API to interact with the Server-Sent Events (SSE) protocol.
 */
class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    // Initiate the connection 
    this.eventSource = new EventSource("events");

    this.handleNewRides = this.handleNewMessages.bind(this);
  }

  componentDidMount() {
    this.eventSource.addEventListener('newmessages', this.handleNewMessages)
  }

  /**
   * Updates the UI with the new data received
   */
  handleNewMessages(e) {
    const messages = this.state.messages.slice();
    messages.push(e.data);
    this.setState({messages: messages})
  }

  /**
   * Closes the connection 
   */
  stopUpdates() {
    this.eventSource.close();
  }

  render() {
    let etcListItem;
    if (this.state.messages.length > 10) {
      etcListItem = <li>...</li>;
    }

    return (
      <div>
        <h1>Messages</h1>

        <div>
          <button onClick={() => this.stopUpdates()}>Stop updates</button>
        </div>
        
        <br/>

        <div>
          <span>Counter: </span>
          <span>{this.state.messages.length}</span>
        </div>

        <ul>
          {this.state.messages.slice(-10).reverse().map((form, index) =>
            <li key={index}>
              New message at {form}
            </li>
          )}
          {etcListItem}
        </ul>
      </div>
    );
  }
}

const domContainer = document.querySelector('#messages_container');
ReactDOM.render(<Messages />, domContainer);
