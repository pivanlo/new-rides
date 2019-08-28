var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewRides = function (_React$Component) {
  _inherits(NewRides, _React$Component);

  function NewRides(props) {
    _classCallCheck(this, NewRides);

    var _this = _possibleConstructorReturn(this, (NewRides.__proto__ || Object.getPrototypeOf(NewRides)).call(this, props));

    _this.state = {
      rides: []
    };

    _this.eventSource = new EventSource("events");
    _this.handleNewRides = _this.handleNewRides.bind(_this);
    return _this;
  }

  _createClass(NewRides, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.eventSource.addEventListener('newrides', this.handleNewRides);
    }
  }, {
    key: 'handleNewRides',
    value: function handleNewRides(e) {
      var rides = this.state.rides.slice();
      rides.push(e.data);
      this.setState({ rides: rides });
    }
  }, {
    key: 'stopUpdates',
    value: function stopUpdates() {
      this.eventSource.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var etcListItem = void 0;
      if (this.state.rides.length > 10) {
        etcListItem = React.createElement(
          'li',
          null,
          '...'
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'New rides'
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.stopUpdates();
              } },
            'Stop updates'
          )
        ),
        React.createElement('br', null),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            null,
            'Counter: '
          ),
          React.createElement(
            'span',
            null,
            this.state.rides.length
          )
        ),
        React.createElement(
          'ul',
          null,
          this.state.rides.slice(-10).reverse().map(function (form, index) {
            return React.createElement(
              'li',
              { key: index },
              'Ride at ',
              form
            );
          }),
          etcListItem
        )
      );
    }
  }]);

  return NewRides;
}(React.Component);

var domContainer = document.querySelector('#new_rides_container');
ReactDOM.render(React.createElement(NewRides, null), domContainer);