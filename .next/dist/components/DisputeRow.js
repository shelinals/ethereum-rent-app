'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/shelinalusandro/Documents/FYP/rent-app/components/DisputeRow.js';


var DisputeRow = function (_Component) {
    (0, _inherits3.default)(DisputeRow, _Component);

    function DisputeRow() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DisputeRow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DisputeRow.__proto__ || (0, _getPrototypeOf2.default)(DisputeRow)).call.apply(_ref, [this].concat(args))), _this), _this.onApprove = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var rent, accounts;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            rent = Rental(_this.props.address);
                            _context.next = 3;
                            return web3.eth.getAccounts();

                        case 3:
                            accounts = _context.sent;
                            _context.next = 6;
                            return rent.methods.approveDispute(_this.props.index).send({
                                from: accounts[0]
                            });

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        })), _this.onReject = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var rent, accounts;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            rent = Rental(_this.props.address);
                            _context2.next = 3;
                            return web3.eth.getAccounts();

                        case 3:
                            accounts = _context2.sent;
                            _context2.next = 6;
                            return rent.methods.rejectDispute(_this.props.index).send({
                                from: accounts[0]
                            });

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DisputeRow, [{
        key: 'render',
        value: function render() {
            var Row = _semanticUiReact.Table.Row,
                Cell = _semanticUiReact.Table.Cell;
            var _props = this.props,
                address = _props.address,
                dispute = _props.dispute;

            var status = dispute.complete ? 'Voting Closed' : 'Voting Open';
            return _react2.default.createElement(Row, { disabled: dispute.complete, positive: !dispute.complete, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 29
                }
            }, _react2.default.createElement(Cell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 30
                }
            }, address), _react2.default.createElement(Cell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 31
                }
            }, dispute.disputer), _react2.default.createElement(Cell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 32
                }
            }, dispute.approvalCount), _react2.default.createElement(Cell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 33
                }
            }, dispute.rejectionCount), _react2.default.createElement(Cell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 34
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { primary: true,
                onClick: function onClick() {
                    return _routes.Router.pushRoute('/disputes/' + address);
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 35
                }
            }, 'Vote')), _react2.default.createElement(Cell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 40
                }
            }, status));
        }
    }]);

    return DisputeRow;
}(_react.Component);

exports.default = DisputeRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvRGlzcHV0ZVJvdy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlRhYmxlIiwiQnV0dG9uIiwiUm91dGVyIiwiRGlzcHV0ZVJvdyIsIm9uQXBwcm92ZSIsInJlbnQiLCJSZW50YWwiLCJwcm9wcyIsImFkZHJlc3MiLCJ3ZWIzIiwiZXRoIiwiZ2V0QWNjb3VudHMiLCJhY2NvdW50cyIsIm1ldGhvZHMiLCJhcHByb3ZlRGlzcHV0ZSIsImluZGV4Iiwic2VuZCIsImZyb20iLCJvblJlamVjdCIsInJlamVjdERpc3B1dGUiLCJSb3ciLCJDZWxsIiwiZGlzcHV0ZSIsInN0YXR1cyIsImNvbXBsZXRlIiwiZGlzcHV0ZXIiLCJhcHByb3ZhbENvdW50IiwicmVqZWN0aW9uQ291bnQiLCJwdXNoUm91dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFPOztBQUNoQixBQUFTLEFBQWM7Ozs7Ozs7SSxBQUVqQjs7Ozs7Ozs7Ozs7Ozs7O3dOLEFBQ0YscUZBQVksbUJBQUE7c0JBQUE7MEVBQUE7MEJBQUE7cURBQUE7NkJBQ0Y7QUFERSxtQ0FDSyxPQUFPLE1BQUEsQUFBSyxNQURqQixBQUNLLEFBQWtCOzRDQUR2QjttQ0FHZSxLQUFBLEFBQUssSUFIcEIsQUFHZSxBQUFTOzs2QkFBMUI7QUFIRSxnREFBQTs0Q0FBQTt3Q0FJRixBQUFLLFFBQUwsQUFBYSxlQUFlLE1BQUEsQUFBSyxNQUFqQyxBQUF1QyxPQUF2QyxBQUE4QztzQ0FDMUMsU0FMRixBQUlGLEFBQW1ELEFBQy9DLEFBQVM7QUFEc0MsQUFDckQsNkJBREU7OzZCQUpFOzZCQUFBOzRDQUFBOztBQUFBO3dCQUFBO0EsbUIsQUFTWixvRkFBVyxvQkFBQTtzQkFBQTs0RUFBQTswQkFBQTt1REFBQTs2QkFDRDtBQURDLG1DQUNNLE9BQU8sTUFBQSxBQUFLLE1BRGxCLEFBQ00sQUFBa0I7NkNBRHhCO21DQUdnQixLQUFBLEFBQUssSUFIckIsQUFHZ0IsQUFBUzs7NkJBQTFCO0FBSEMsaURBQUE7NkNBQUE7d0NBSUQsQUFBSyxRQUFMLEFBQWEsY0FBYyxNQUFBLEFBQUssTUFBaEMsQUFBc0MsT0FBdEMsQUFBNkM7c0NBQ3pDLFNBTEgsQUFJRCxBQUFrRCxBQUM5QyxBQUFTO0FBRHFDLEFBQ3BELDZCQURFOzs2QkFKQzs2QkFBQTs2Q0FBQTs7QUFBQTt5QkFBQTtBOzs7OztpQ0FTRjtnQkFBQSxBQUNHLE1BREgsQUFDaUIsdUJBRGpCLEFBQ0c7Z0JBREgsQUFDUSxPQURSLEFBQ2lCLHVCQURqQixBQUNRO3lCQUNnQixLQUZ4QixBQUU2QjtnQkFGN0IsQUFFRyxpQkFGSCxBQUVHO2dCQUZILEFBRVksaUJBRlosQUFFWSxBQUNqQjs7Z0JBQU0sU0FBUyxRQUFBLEFBQVEsV0FBUixBQUFrQixrQkFBakMsQUFBbUQsQUFDbkQ7bUNBQ0ssY0FBRCxPQUFLLFVBQVUsUUFBZixBQUF1QixVQUFVLFVBQVUsQ0FBQyxRQUE1QyxBQUFvRDs4QkFBcEQ7Z0NBQUEsQUFDSTtBQURKO2FBQUEsa0JBQ0ssY0FBRDs7OEJBQUE7Z0NBQUEsQUFBTztBQUFQO0FBQUEsZUFESixBQUNJLEFBQ0EsMEJBQUMsY0FBRDs7OEJBQUE7Z0NBQUEsQUFBTztBQUFQO0FBQUEsdUJBRkosQUFFSSxBQUFlLEFBQ2YsMkJBQUMsY0FBRDs7OEJBQUE7Z0NBQUEsQUFBTztBQUFQO0FBQUEsdUJBSEosQUFHSSxBQUFlLEFBQ2YsZ0NBQUMsY0FBRDs7OEJBQUE7Z0NBQUEsQUFBTztBQUFQO0FBQUEsdUJBSkosQUFJSSxBQUFlLEFBQ2YsaUNBQUMsY0FBRDs7OEJBQUE7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQyx5Q0FBTyxTQUFSLEFBQ1E7eUJBQVMsbUJBQUE7MkJBQU0sZUFBQSxBQUFPLHlCQUFiLEFBQU0sQUFBOEI7QUFEckQ7OEJBQUE7Z0NBQUE7QUFBQTtlQU5SLEFBS0ksQUFDSSxBQUtKLDBCQUFDLGNBQUQ7OzhCQUFBO2dDQUFBLEFBQU87QUFBUDtBQUFBLGVBWlIsQUFDSSxBQVdJLEFBR1g7Ozs7O0FBR0wsQSxBQXpDeUI7O2tCQXlDekIsQUFBZSIsImZpbGUiOiJEaXNwdXRlUm93LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zaGVsaW5hbHVzYW5kcm8vRG9jdW1lbnRzL0ZZUC9yZW50LWFwcCJ9