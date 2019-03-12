'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _rental = require('../ethereum/rental');

var _rental2 = _interopRequireDefault(_rental);

var _DisputeRow = require('../components/DisputeRow');

var _DisputeRow2 = _interopRequireDefault(_DisputeRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/shelinalusandro/Documents/FYP/rent-app/pages/disputeList.js?entry';


var DisputeList = function (_Component) {
    (0, _inherits3.default)(DisputeList, _Component);

    function DisputeList() {
        (0, _classCallCheck3.default)(this, DisputeList);

        return (0, _possibleConstructorReturn3.default)(this, (DisputeList.__proto__ || (0, _getPrototypeOf2.default)(DisputeList)).apply(this, arguments));
    }

    (0, _createClass3.default)(DisputeList, [{
        key: 'renderRowOpen',
        value: function renderRowOpen() {
            var _this2 = this;

            return this.props.openDispute.map(function (dispute, index) {
                return _react2.default.createElement(_DisputeRow2.default, {
                    key: index,
                    index: index,
                    dispute: dispute,
                    address: _this2.props.openAddress[index],
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 62
                    }
                });
            });
        }
    }, {
        key: 'renderRowClosed',
        value: function renderRowClosed() {
            var _this3 = this;

            return this.props.closeDispute.map(function (dispute, index) {
                return _react2.default.createElement(_DisputeRow2.default, {
                    key: index,
                    index: index,
                    dispute: dispute,
                    address: _this3.props.closeAddress[index],
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 73
                    }
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var Header = _semanticUiReact.Table.Header,
                Row = _semanticUiReact.Table.Row,
                HeaderCell = _semanticUiReact.Table.HeaderCell,
                Body = _semanticUiReact.Table.Body;

            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 87
                }
            }, _react2.default.createElement('h3', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 88
                }
            }, 'Dispute List'), this.props.disputeCounts ? _react2.default.createElement(_semanticUiReact.Table, { fixed: true, unstackable: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 89
                }
            }, _react2.default.createElement(Header, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 90
                }
            }, _react2.default.createElement(Row, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 91
                }
            }, _react2.default.createElement(HeaderCell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 92
                }
            }, 'ID'), _react2.default.createElement(HeaderCell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 93
                }
            }, 'Disputer'), _react2.default.createElement(HeaderCell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 94
                }
            }, 'Approval Count'), _react2.default.createElement(HeaderCell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 95
                }
            }, 'Rejection Count'), _react2.default.createElement(HeaderCell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 96
                }
            }, 'Vote'), _react2.default.createElement(HeaderCell, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 97
                }
            }, 'Remarks'))), _react2.default.createElement(Body, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 100
                }
            }, this.renderRowOpen(), this.renderRowClosed())) : null, _react2.default.createElement(_semanticUiReact.Divider, { hidden: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 105
                }
            }), _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 106
                }
            }, 'Found ', this.props.disputeCounts, ' dispute(s).'), _react2.default.createElement(_semanticUiReact.Divider, { hidden: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 107
                }
            }));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _this4 = this;

                var deployedRents, openDispute, openAddress, closeDispute, closeAddress, disputeCounts, _loop, i;

                return _regenerator2.default.wrap(function _callee$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _factory2.default.methods.getDeployedRentals().call();

                            case 2:
                                deployedRents = _context2.sent;
                                openDispute = [];
                                openAddress = [];
                                closeDispute = [];
                                closeAddress = [];
                                disputeCounts = 0;
                                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(i) {
                                    var disputeCount, currentlyOpen, rent, index, open, closed, closedAddress, _closed, _closedAddress;

                                    return _regenerator2.default.wrap(function _loop$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return (0, _rental2.default)(deployedRents[i]).methods.disputeCounts().call();

                                                case 2:
                                                    disputeCount = _context.sent;
                                                    _context.next = 5;
                                                    return (0, _rental2.default)(deployedRents[i]).methods.openDispute().call();

                                                case 5:
                                                    currentlyOpen = _context.sent;
                                                    rent = (0, _rental2.default)(deployedRents[i]);

                                                    if (!currentlyOpen) {
                                                        _context.next = 23;
                                                        break;
                                                    }

                                                    index = disputeCount - 1;
                                                    _context.next = 11;
                                                    return rent.methods.disputes(index).call();

                                                case 11:
                                                    open = _context.sent;

                                                    openDispute.push(open);
                                                    openAddress.push(deployedRents[i]);

                                                    if (!(disputeCount > 1)) {
                                                        _context.next = 21;
                                                        break;
                                                    }

                                                    _context.next = 17;
                                                    return _promise2.default.all(Array(parseInt(disputeCount - 1)).fill().map(function (element, index) {
                                                        return rent.methods.disputes(index).call();
                                                    }));

                                                case 17:
                                                    closed = _context.sent;
                                                    closedAddress = Array(parseInt(disputeCount - 1)).fill(deployedRents[i]);

                                                    closeDispute = [].concat((0, _toConsumableArray3.default)(closeDispute), (0, _toConsumableArray3.default)(closed));
                                                    closeAddress = [].concat((0, _toConsumableArray3.default)(closeAddress), (0, _toConsumableArray3.default)(closedAddress));

                                                case 21:
                                                    _context.next = 30;
                                                    break;

                                                case 23:
                                                    if (!(disputeCount > 0)) {
                                                        _context.next = 30;
                                                        break;
                                                    }

                                                    _context.next = 26;
                                                    return _promise2.default.all(Array(parseInt(disputeCount)).fill().map(function (element, index) {

                                                        return rent.methods.disputes(index).call();
                                                    }));

                                                case 26:
                                                    _closed = _context.sent;
                                                    _closedAddress = Array(parseInt(disputeCount)).fill(deployedRents[i]);

                                                    closeDispute = [].concat((0, _toConsumableArray3.default)(closeDispute), (0, _toConsumableArray3.default)(_closed));
                                                    closeAddress = [].concat((0, _toConsumableArray3.default)(closeAddress), (0, _toConsumableArray3.default)(_closedAddress));

                                                case 30:
                                                    disputeCounts += parseInt(disputeCount);

                                                case 31:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _loop, _this4);
                                });
                                i = 0;

                            case 10:
                                if (!(i < deployedRents.length)) {
                                    _context2.next = 15;
                                    break;
                                }

                                return _context2.delegateYield(_loop(i), 't0', 12);

                            case 12:
                                i++;
                                _context2.next = 10;
                                break;

                            case 15:
                                return _context2.abrupt('return', { openDispute: openDispute, closeDispute: closeDispute, openAddress: openAddress, closeAddress: closeAddress, disputeCounts: disputeCounts });

                            case 16:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getInitialProps() {
                return _ref.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return DisputeList;
}(_react.Component);

exports.default = DisputeList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2Rpc3B1dGVMaXN0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQnV0dG9uIiwiVGFibGUiLCJEaXZpZGVyIiwiTGF5b3V0IiwiZmFjdG9yeSIsIlJlbnRhbCIsIkRpc3B1dGVSb3ciLCJEaXNwdXRlTGlzdCIsInByb3BzIiwib3BlbkRpc3B1dGUiLCJtYXAiLCJkaXNwdXRlIiwiaW5kZXgiLCJvcGVuQWRkcmVzcyIsImNsb3NlRGlzcHV0ZSIsImNsb3NlQWRkcmVzcyIsIkhlYWRlciIsIlJvdyIsIkhlYWRlckNlbGwiLCJCb2R5IiwiZGlzcHV0ZUNvdW50cyIsInJlbmRlclJvd09wZW4iLCJyZW5kZXJSb3dDbG9zZWQiLCJtZXRob2RzIiwiZ2V0RGVwbG95ZWRSZW50YWxzIiwiY2FsbCIsImRlcGxveWVkUmVudHMiLCJpIiwiZGlzcHV0ZUNvdW50IiwiY3VycmVudGx5T3BlbiIsInJlbnQiLCJkaXNwdXRlcyIsIm9wZW4iLCJwdXNoIiwiYWxsIiwiQXJyYXkiLCJwYXJzZUludCIsImZpbGwiLCJlbGVtZW50IiwiY2xvc2VkIiwiY2xvc2VkQWRkcmVzcyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBUSxBQUFPOztBQUN4QixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQWdCOzs7Ozs7Ozs7SSxBQUVqQjs7Ozs7Ozs7Ozs7d0NBb0RjO3lCQUNaOzt3QkFBTyxBQUFLLE1BQUwsQUFBVyxZQUFYLEFBQXVCLElBQUksVUFBQSxBQUFDLFNBQUQsQUFBVSxPQUFVLEFBQ2xEO3VDQUFPLEFBQUM7eUJBQUQsQUFDRSxBQUNMOzJCQUZHLEFBRUksQUFDUDs2QkFIRyxBQUdNLEFBQ1Q7NkJBQVMsT0FBQSxBQUFLLE1BQUwsQUFBVyxZQUpqQixB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