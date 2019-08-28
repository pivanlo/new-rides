class NewRides extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rides: []
    };

    this.eventSource = new EventSource("events");
    this.handleNewRides = this.handleNewRides.bind(this);
  }

  componentDidMount() {
    this.eventSource.addEventListener('newrides', this.handleNewRides)
  }

  handleNewRides(e) {
    const rides = this.state.rides.slice();
    rides.push(e.data);
    this.setState({rides: rides})
  }

  stopUpdates() {
    this.eventSource.close();
  }

  render() {
    let etcListItem;
    if (this.state.rides.length > 10) {
      etcListItem = <li>...</li>;
    }

    return (
      <div>
        <h1>New rides</h1>

        <div>
          <button onClick={() => this.stopUpdates()}>Stop updates</button>
        </div>
        
        <br/>

        <div>
          <span>Counter: </span>
          <span>{this.state.rides.length}</span>
        </div>

        <ul>
          {this.state.rides.slice(-10).reverse().map((form, index) =>
            <li key={index}>
              Ride at {form}
            </li>
          )}
          {etcListItem}
        </ul>
      </div>
    );
  }
}

const domContainer = document.querySelector('#new_rides_container');
ReactDOM.render(<NewRides />, domContainer);
