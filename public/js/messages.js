var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React component that displays a real-time counter and feed of messages coming from the server.
 * Uses the EventSource API to interact with the Server-Sent Events (SSE) protocol.
 */
var Messages = function (_React$Component) {
  _inherits(Messages, _React$Component);

  function Messages(props) {
    _classCallCheck(this, Messages);

    var _this = _possibleConstructorReturn(this, (Messages.__proto__ || Object.getPrototypeOf(Messages)).call(this, props));

    _this.state = {
      messages: []
    };

    // Initiate the connection 
    _this.eventSource = new EventSource("events");

    _this.handleNewMessages = _this.handleNewMessages.bind(_this);
    return _this;
  }

  _createClass(Messages, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.eventSource.addEventListener('newmessages', this.handleNewMessages);
    }

    /**
     * Updates the UI with the new data received
     */

  }, {
    key: 'handleNewMessages',
    value: function handleNewMessages(e) {
      var messages = this.state.messages.slice();
      messages.push(e.data);
      this.setState({ messages: messages });
    }

    /**
     * Closes the connection 
     */

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
      if (this.state.messages.length > 10) {
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
          'Messages'
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
            this.state.messages.length
          )
        ),
        React.createElement(
          'ul',
          null,
          this.state.messages.slice(-10).reverse().map(function (form, index) {
            return React.createElement(
              'li',
              { key: index },
              'New message at ',
              form
            );
          }),
          etcListItem
        )
      );
    }
  }]);

  return Messages;
}(React.Component);

var domContainer = document.querySelector('#messages_container');
ReactDOM.render(React.createElement(Messages, null), domContainer);