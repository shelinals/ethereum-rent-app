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

var _semanticUiReact = require('semantic-ui-react');

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _rental = require('../ethereum/rental');

var _rental2 = _interopRequireDefault(_rental);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _device = require('../utils/device');

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/shelinalusandro/Documents/FYP/rent-app/pages/index.js?entry';


var RentalIndex = function (_Component) {
    (0, _inherits3.default)(RentalIndex, _Component);

    function RentalIndex() {
        (0, _classCallCheck3.default)(this, RentalIndex);

        return (0, _possibleConstructorReturn3.default)(this, (RentalIndex.__proto__ || (0, _getPrototypeOf2.default)(RentalIndex)).apply(this, arguments));
    }

    (0, _createClass3.default)(RentalIndex, [{
        key: 'renderRents',

        // renderRents() {

        //     const items = this.props.availableRents.map((address, i) => {
        //         return {
        //             header: this.props.names[i],
        //             description: (
        //                 <Link route={`/rents/${address}`}> 
        //                     <a>View Item</a> 
        //                 </Link>
        //             ),
        //             fluid: true 
        //         }
        //     });

        //     return <Card.Group items={items}/>;
        // }

        value: function renderRents() {
            var _this2 = this;

            //transform image here
            var items = this.props.availableRents.map(function (address, i) {
                var deposit = _web2.default.utils.fromWei(_this2.props.deposit[i].toString(), 'ether');
                var feeHour = (_web2.default.utils.fromWei(_this2.props.rentalFee[i].toString(), 'ether') * 60 * 60).toFixed(4);
                return _react2.default.createElement(_semanticUiReact.Card, { key: i, link: true, onClick: function onClick() {
                        return _routes.Router.pushRoute('/rents/' + address);
                    }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 78
                    }
                }, _react2.default.createElement(_semanticUiReact.Image, { src: 'https://react.semantic-ui.com/images/wireframe/white-image.png', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 79
                    }
                }), _react2.default.createElement(_semanticUiReact.Card.Content, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 80
                    }
                }, _react2.default.createElement(_semanticUiReact.Card.Header, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 81
                    }
                }, _this2.props.names[i]), _react2.default.createElement(_semanticUiReact.Card.Description, { textAlign: 'center', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 82
                    }
                }, _react2.default.createElement(_semanticUiReact.Grid, { columns: 'equal', stackable: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 83
                    }
                }, _react2.default.createElement(_semanticUiReact.Grid.Row, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 84
                    }
                }, _react2.default.createElement(_semanticUiReact.Grid.Column, { textAlign: 'right', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 85
                    }
                }, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'mini', color: 'red', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 86
                    }
                }, _react2.default.createElement(_semanticUiReact.Statistic.Label, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 87
                    }
                }, 'Deposit'), _react2.default.createElement(_semanticUiReact.Statistic.Value, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 88
                    }
                }, deposit))), _react2.default.createElement(_semanticUiReact.Grid.Column, { textAlign: 'left', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 91
                    }
                }, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'mini', color: 'red', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 92
                    }
                }, _react2.default.createElement(_semanticUiReact.Statistic.Label, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 93
                    }
                }, 'Fee/Hour'), _react2.default.createElement(_semanticUiReact.Statistic.Value, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 94
                    }
                }, feeHour))))))));
            });

            return _react2.default.createElement(_semanticUiReact.Card.Group, { itemsPerRow: 4, doubling: true, stackable: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 105
                }
            }, items);
        }
    }, {
        key: 'render',
        value: function render() {
            var itemsLength = this.props.availableRents ? this.props.availableRents.length : 0;
            console.log('deployed rents' + this.props.deployedRents);

            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 115
                }
            }, _react2.default.createElement('h3', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 116
                }
            }, 'Available Rent Items'), _react2.default.createElement(_semanticUiReact.Divider, { hidden: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 117
                }
            }), this.renderRents(), _react2.default.createElement(_semanticUiReact.Divider, { hidden: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 121
                }
            }), _react2.default.createElement('div', { style: { marginTop: 20 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 122
                }
            }, 'Found ', itemsLength, ' Item(s).'), _react2.default.createElement(_semanticUiReact.Divider, { hidden: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 123
                }
            }));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var deployedRents, status, availableRents, names, deposit, rentalFee, imageHashes;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _factory2.default.methods.getDeployedRentals().call();

                            case 2:
                                deployedRents = _context.sent;
                                _context.next = 5;
                                return _promise2.default.all(deployedRents.map(function (address) {
                                    return (0, _rental2.default)(address).methods.getState().call();
                                }));

                            case 5:
                                status = _context.sent;
                                availableRents = deployedRents.filter(function (address, i) {
                                    return status[i] == "PUBLISHED";
                                });
                                _context.next = 9;
                                return _promise2.default.all(availableRents.map(function (address) {
                                    return (0, _rental2.default)(address).methods.productName().call();
                                }));

                            case 9:
                                names = _context.sent;
                                _context.next = 12;
                                return _promise2.default.all(availableRents.map(function (address) {
                                    return (0, _rental2.default)(address).methods.deposit().call();
                                }));

                            case 12:
                                deposit = _context.sent;
                                _context.next = 15;
                                return _promise2.default.all(availableRents.map(function (address) {
                                    return (0, _rental2.default)(address).methods.rentalFee().call();
                                }));

                            case 15:
                                rentalFee = _context.sent;
                                _context.next = 18;
                                return _promise2.default.all(availableRents.map(function (address) {
                                    return (0, _rental2.default)(address).methods.imageHashes().call();
                                }));

                            case 18:
                                imageHashes = _context.sent;
                                return _context.abrupt('return', { deployedRents: deployedRents, availableRents: availableRents, names: names, deposit: deposit, rentalFee: rentalFee, imageHashes: imageHashes });

                            case 20:
                            case 'end':
                                return _context.stop();
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

    return RentalIndex;
}(_react.Component);

exports.default = RentalIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FyZCIsIkltYWdlIiwiU3RhdGlzdGljIiwiRGl2aWRlciIsIkdyaWQiLCJmYWN0b3J5IiwiUmVudGFsIiwid2ViMyIsIkxheW91dCIsImlzTW9iaWxlU1NSIiwiZ2V0V2lkdGgiLCJMaW5rIiwiUm91dGVyIiwiUmVudGFsSW5kZXgiLCJpdGVtcyIsInByb3BzIiwiYXZhaWxhYmxlUmVudHMiLCJtYXAiLCJhZGRyZXNzIiwiaSIsImRlcG9zaXQiLCJ1dGlscyIsImZyb21XZWkiLCJ0b1N0cmluZyIsImZlZUhvdXIiLCJyZW50YWxGZWUiLCJ0b0ZpeGVkIiwicHVzaFJvdXRlIiwibmFtZXMiLCJpdGVtc0xlbmd0aCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJkZXBsb3llZFJlbnRzIiwicmVuZGVyUmVudHMiLCJtYXJnaW5Ub3AiLCJtZXRob2RzIiwiZ2V0RGVwbG95ZWRSZW50YWxzIiwiY2FsbCIsImFsbCIsImdldFN0YXRlIiwic3RhdHVzIiwiZmlsdGVyIiwicHJvZHVjdE5hbWUiLCJpbWFnZUhhc2hlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFNLEFBQU8sQUFBVyxBQUFTOztBQUMxQyxBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBUyxBQUFhLEFBQWdCOztBQUN0QyxBQUFTLEFBQU0sQUFBYzs7Ozs7OztJLEFBRXZCOzs7Ozs7Ozs7O2FBOENGOztBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7OztzQ0FFYzt5QkFDVjs7QUFDQTtnQkFBTSxhQUFRLEFBQUssTUFBTCxBQUFXLGVBQVgs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RkosQUFJSyxBQUFLLEFBRU4sK0JBQUEsQUFBQywwQ0FBUSxRQUFUOzhCQUFBO2dDQU5KLEFBTUksQUFDQTtBQURBO2dDQUNBLGNBQUEsU0FBSyxPQUFPLEVBQUUsV0FBZCxBQUFZLEFBQWE7OEJBQXpCO2dDQUFBO0FBQUE7ZUFBc0MsVUFBdEMsYUFQSixBQU9JLEFBQ0EsOEJBQUEsQUFBQywwQ0FBUSxRQUFUOzhCQUFBO2dDQVRSLEFBQ0ksQUFRSSxBQUdYO0FBSFc7Ozs7Ozs7Ozs7Ozs7dUNBOUdvQixrQkFBQSxBQUFRLFFBQVIsQUFBZ0IscUIsQUFBaEIsQUFBcUM7O2lDQUEzRDtBOzt5REFDZSxBQUFRLGtCQUNyQixBQUNDLElBQUksVUFBQSxBQUFDLFNBQVksQUFDbEI7MkNBQU8sc0JBQUEsQUFBTyxTQUFQLEFBQWdCLFFBQWhCLEFBQXdCLFdBQS9CLEFBQU8sQUFBbUMsQUFDN0M7QSxBQUpnQixBQUNiLGlDQUFBLENBRGE7O2lDQUFmO0Esa0RBT0E7QSwrREFBaUIsQUFBYyxPQUFPLFVBQUEsQUFBQyxTQUFELEFBQVUsR0FBVjsyQ0FDeEMsT0FBQSxBQUFPLE1BRGlDLEFBQzNCO0EsQUFETSxpQ0FBQTs7eURBSUgsQUFBUSxtQkFDcEIsQUFDQyxJQUFJLFVBQUEsQUFBQyxTQUFZLEFBQ2xCOzJDQUFPLHNCQUFBLEFBQU8sU0FBUCxBQUFnQixRQUFoQixBQUF3QixjQUEvQixBQUFPLEFBQXNDLEFBQ2hEO0EsQUFKZSxBQUNaLGlDQUFBLENBRFk7O2lDQUFkO0E7O3lEQU9nQixBQUFRLG1CQUN0QixBQUNDLElBQUksVUFBQSxBQUFDLFNBQVksQUFDbEI7MkNBQU8sc0JBQUEsQUFBTyxTQUFQLEFBQWdCLFFBQWhCLEFBQXdCLFVBQS9CLEFBQU8sQUFBa0MsQUFDNUM7QSxBQUppQixBQUNkLGlDQUFBLENBRGM7O2lDQUFoQjtBOzt5REFPa0IsQUFBUSxtQkFDeEIsQUFDQyxJQUFJLFVBQUEsQUFBQyxTQUFZLEFBQ2xCOzJDQUFPLHNCQUFBLEFBQU8sU0FBUCxBQUFnQixRQUFoQixBQUF3QixZQUEvQixBQUFPLEFBQW9DLEFBQzlDO0EsQUFKbUIsQUFDaEIsaUNBQUEsQ0FEZ0I7O2lDQUFsQjtBOzt5REFPb0IsQUFBUSxtQkFDMUIsQUFDQyxJQUFJLFVBQUEsQUFBQyxTQUFZLEFBQ2xCOzJDQUFPLHNCQUFBLEFBQU8sU0FBUCxBQUFnQixRQUFoQixBQUF3QixjQUEvQixBQUFPLEFBQXNDLEFBQ2hEO0EsQUFKcUIsQUFDbEIsaUNBQUEsQ0FEa0I7O2lDQUFwQjtBO2lFQU9DLEVBQUUsZUFBRixlQUFpQixnQkFBakIsZ0JBQWlDLE9BQWpDLE9BQXdDLFNBQXhDLFNBQWlELFdBQWpELFdBQTRELGEsQUFBNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0RWYsQSxBQXZIMEI7O2tCQXVIMUIsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvc2hlbGluYWx1c2FuZHJvL0RvY3VtZW50cy9GWVAvcmVudC1hcHAifQ==