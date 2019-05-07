'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _factory = require('../../../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _rental = require('../../../ethereum/rental');

var _rental2 = _interopRequireDefault(_rental);

var _web = require('../../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _routes = require('../../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/shelinalusandro/Documents/FYP/rent-app/pages/rents/manage/index.js?entry';


var RentalManage = function (_Component) {
    (0, _inherits3.default)(RentalManage, _Component);

    function RentalManage() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RentalManage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RentalManage.__proto__ || (0, _getPrototypeOf2.default)(RentalManage)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            rents: [],
            borrowed: [],
            rentalNames: [],
            borrowedNames: [],
            rentalStatus: [],
            borrowedStatus: []
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RentalManage, [{
        key: 'componentDidMount',

        //client-side
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var deployedRents, accounts, rents, borrowed, i, rentalNames, rentalStatus, borrowedNames, borrowedStatus;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _factory2.default.methods.getDeployedRentals().call();

                            case 2:
                                deployedRents = _context.sent;
                                _context.next = 5;
                                return _web2.default.eth.getAccounts();

                            case 5:
                                accounts = _context.sent;
                                rents = [];
                                borrowed = [];
                                i = 0;

                            case 9:
                                if (!(i < deployedRents.length)) {
                                    _context.next = 38;
                                    break;
                                }

                                _context.t0 = console;
                                _context.next = 13;
                                return (0, _rental2.default)(deployedRents[i]).methods.owner().call();

                            case 13:
                                _context.t1 = _context.sent;

                                _context.t0.log.call(_context.t0, _context.t1);

                                _context.t2 = console;
                                _context.next = 18;
                                return (0, _rental2.default)(deployedRents[i]).methods.renter().call();

                            case 18:
                                _context.t3 = _context.sent;

                                _context.t2.log.call(_context.t2, _context.t3);

                                console.log(accounts[0]);
                                _context.next = 23;
                                return (0, _rental2.default)(deployedRents[i]).methods.owner().call();

                            case 23:
                                _context.t4 = _context.sent;
                                _context.t5 = accounts[0];

                                if (!(_context.t4 === _context.t5)) {
                                    _context.next = 29;
                                    break;
                                }

                                rents.push(deployedRents[i]);
                                _context.next = 35;
                                break;

                            case 29:
                                _context.next = 31;
                                return (0, _rental2.default)(deployedRents[i]).methods.renter().call();

                            case 31:
                                _context.t6 = _context.sent;
                                _context.t7 = accounts[0];

                                if (!(_context.t6 === _context.t7)) {
                                    _context.next = 35;
                                    break;
                                }

                                borrowed.push(deployedRents[i]);

                            case 35:
                                i++;
                                _context.next = 9;
                                break;

                            case 38:
                                _context.next = 40;
                                return _promise2.default.all(rents.map(function (address) {
                                    return (0, _rental2.default)(address).methods.productName().call();
                                }));

                            case 40:
                                rentalNames = _context.sent;
                                _context.next = 43;
                                return _promise2.default.all(rents.map(function (address) {
                                    return (0, _rental2.default)(address).methods.getState().call();
                                }));

                            case 43:
                                rentalStatus = _context.sent;
                                _context.next = 46;
                                return _promise2.default.all(borrowed.map(function (address) {
                                    return (0, _rental2.default)(address).methods.productName().call();
                                }));

                            case 46:
                                borrowedNames = _context.sent;
                                _context.next = 49;
                                return _promise2.default.all(borrowed.map(function (address) {
                                    return (0, _rental2.default)(address).methods.getState().call();
                                }));

                            case 49:
                                borrowedStatus = _context.sent;

                                console.log(" HELLLOOO " + rents.length + borrowed.length + rentalNames.length + borrowedNames.length + rentalStatus.length + borrowedStatus.length);

                                this.setState({ rents: rents, borrowed: borrowed, rentalNames: rentalNames, borrowedNames: borrowedNames, rentalStatus: rentalStatus, borrowedStatus: borrowedStatus });

                            case 52:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function componentDidMount() {
                return _ref2.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'renderRents',
        value: function renderRents() {
            var _this2 = this;

            var manage = "rent";
            var items = this.state.rents.map(function (address, i) {
                return {
                    header: _this2.state.rentalNames[i],
                    meta: "Item Status: " + _this2.state.rentalStatus[i],
                    description: _react2.default.createElement(_routes.Link, { route: '/rents/' + address + '/' + manage, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 79
                        }
                    }, _react2.default.createElement('a', {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 80
                        }
                    }, 'Manage Item')),
                    fluid: true
                };
            });

            return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 87
                }
            });
        }
    }, {
        key: 'renderBorrowed',
        value: function renderBorrowed() {
            var _this3 = this;

            var manage = "borrow";
            var items = this.state.borrowed.map(function (address, i) {
                return {
                    header: _this3.state.borrowedNames[i],
                    meta: "Item Status: " + _this3.state.borrowedStatus[i],
                    description: _react2.default.createElement(_routes.Link, { route: '/rents/' + address + '/' + manage, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 98
                        }
                    }, _react2.default.createElement('a', {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 99
                        }
                    }, 'Manage Item')),
                    fluid: true
                };
            });

            return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 106
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var itemsRented = this.state.rents ? this.state.rents.length : 0;
            var itemsBorrowed = this.state.rents ? this.state.borrowed.length : 0;

            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 114
                }
            }, _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 115
                }
            }, _react2.default.createElement(_semanticUiReact.Divider, { horizontal: true, style: { marginTop: 40 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 116
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h4', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 117
                }
            }, 'Rented Items')), this.renderRents(), _react2.default.createElement('div', { style: { marginTop: 20 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 124
                }
            }, 'You have rented ', itemsRented, ' Item(s).')), _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 127
                }
            }, _react2.default.createElement(_semanticUiReact.Divider, { horizontal: true, style: { marginTop: 40 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 128
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h4', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 129
                }
            }, 'Borrowed Items')), this.renderBorrowed(), _react2.default.createElement('div', { style: { marginTop: 20 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 136
                }
            }, 'You have borrowed ', itemsBorrowed, ' Item(s).')));
        }
    }]);

    return RentalManage;
}(_react.Component);

exports.default = RentalManage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3JlbnRzL21hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImZhY3RvcnkiLCJSZW50YWwiLCJ3ZWIzIiwiQ2FyZCIsIkJ1dHRvbiIsIkRpdmlkZXIiLCJIZWFkZXIiLCJMYXlvdXQiLCJMaW5rIiwiUmVudGFsTWFuYWdlIiwic3RhdGUiLCJyZW50cyIsImJvcnJvd2VkIiwicmVudGFsTmFtZXMiLCJib3Jyb3dlZE5hbWVzIiwicmVudGFsU3RhdHVzIiwiYm9ycm93ZWRTdGF0dXMiLCJtZXRob2RzIiwiZ2V0RGVwbG95ZWRSZW50YWxzIiwiY2FsbCIsImRlcGxveWVkUmVudHMiLCJldGgiLCJnZXRBY2NvdW50cyIsImFjY291bnRzIiwiaSIsImxlbmd0aCIsImNvbnNvbGUiLCJvd25lciIsImxvZyIsInJlbnRlciIsInB1c2giLCJhbGwiLCJtYXAiLCJhZGRyZXNzIiwicHJvZHVjdE5hbWUiLCJnZXRTdGF0ZSIsInNldFN0YXRlIiwibWFuYWdlIiwiaXRlbXMiLCJoZWFkZXIiLCJtZXRhIiwiZGVzY3JpcHRpb24iLCJmbHVpZCIsIml0ZW1zUmVudGVkIiwiaXRlbXNCb3Jyb3dlZCIsIm1hcmdpblRvcCIsInJlbmRlclJlbnRzIiwicmVuZGVyQm9ycm93ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQU8sQUFBYTs7OztBQUNwQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQVMsQUFBTSxBQUFRLEFBQVM7O0FBQ2hDLEFBQU8sQUFBWTs7OztBQUNuQixBQUFTLEFBQVk7Ozs7Ozs7SSxBQUVmOzs7Ozs7Ozs7Ozs7Ozs0TkFFRixBO21CQUFRLEFBQ0csQUFDUDtzQkFGSSxBQUVNLEFBQ1Y7eUJBSEksQUFHUyxBQUNiOzJCQUpJLEFBSVcsQUFDZjswQkFMSSxBQUtVLEFBQ2Q7NEJBQWdCLEEs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O2dDQUFBLEFBQ0k7QUFESjtBQUFBLCtCQUNJLEFBQUMsMENBQVEsWUFBVCxNQUFvQixPQUFPLEVBQUMsV0FBNUIsQUFBMkIsQUFBVzs4QkFBdEM7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMseUNBQU8sSUFBUixBQUFXOzhCQUFYO2dDQUFBO0FBQUE7ZUFGUixBQUNJLEFBQ0ksQUFLSCx1QkFQTCxBQU9LLEFBQUssQUFFTiwrQkFBQSxjQUFBLFNBQUssT0FBTyxFQUFFLFdBQWQsQUFBWSxBQUFhOzhCQUF6QjtnQ0FBQTtBQUFBO2VBQWdELG9CQUFoRCxhQVZSLEFBQ0ksQUFTSSxBQUdKLCtCQUFBLGNBQUE7OzhCQUFBO2dDQUFBLEFBQ0k7QUFESjtBQUFBLCtCQUNJLEFBQUMsMENBQVEsWUFBVCxNQUFvQixPQUFPLEVBQUMsV0FBNUIsQUFBMkIsQUFBVzs4QkFBdEM7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMseUNBQU8sSUFBUixBQUFXOzhCQUFYO2dDQUFBO0FBQUE7ZUFGUixBQUNJLEFBQ0ksQUFLSCx5QkFQTCxBQU9LLEFBQUssQUFFTixrQ0FBQSxjQUFBLFNBQUssT0FBTyxFQUFFLFdBQWQsQUFBWSxBQUFhOzhCQUF6QjtnQ0FBQTtBQUFBO2VBQWtELHNCQUFsRCxlQXZCWixBQUNJLEFBYUksQUFTSSxBQUlmOzs7OztBQW5Jc0IsQSxBQXNJM0I7O2tCQUFBLEFBQWUiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL3NoZWxpbmFsdXNhbmRyby9Eb2N1bWVudHMvRllQL3JlbnQtYXBwIn0=