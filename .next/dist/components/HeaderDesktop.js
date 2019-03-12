'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _jsxFileName = '/Users/shelinalusandro/Documents/FYP/rent-app/components/HeaderDesktop.js';


var HeaderDesktop = function (_Component) {
    (0, _inherits3.default)(HeaderDesktop, _Component);

    function HeaderDesktop() {
        (0, _classCallCheck3.default)(this, HeaderDesktop);

        return (0, _possibleConstructorReturn3.default)(this, (HeaderDesktop.__proto__ || (0, _getPrototypeOf2.default)(HeaderDesktop)).apply(this, arguments));
    }

    (0, _createClass3.default)(HeaderDesktop, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_react2.default.Fragment, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 9
                }
            }, _react2.default.createElement(_semanticUiReact.Rail, {
                internal: true,
                position: 'left',
                attached: true,
                style: { top: "auto", height: "auto", width: "100%" },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 10
                }
            }, _react2.default.createElement(_semanticUiReact.Sticky, { context: this.props.contextRef, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                }
            }, _react2.default.createElement(_semanticUiReact.Segment, { inverted: true, vertical: true, style: { minHeight: 100, padding: '1em 0em 0em 0em', textAlign: 'flex-end' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                }
            }, _react2.default.createElement(_semanticUiReact.Menu, { inverted: true, stackable: true, fixed: 'top', size: 'large', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 18
                }
            }, _react2.default.createElement(_semanticUiReact.Container, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, _react2.default.createElement(_routes.Link, { route: '/', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                }
            }, _react2.default.createElement('a', { className: 'item', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                }
            }, 'Home')), _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                }
            }, _react2.default.createElement(_routes.Link, { route: '/rents/lend', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 27
                }
            }, _react2.default.createElement('a', { className: 'item', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 28
                }
            }, 'Add Rent Items')), _react2.default.createElement(_routes.Link, { route: '/rents/manage', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 33
                }
            }, _react2.default.createElement('a', { className: 'item', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 34
                }
            }, 'Manage Items')), _react2.default.createElement(_routes.Link, { route: '/rents/scancode', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 39
                }
            }, _react2.default.createElement('a', { className: 'item', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 40
                }
            }, 'Scan QR Code'))))), _react2.default.createElement(_semanticUiReact.Container, { style: { marginTop: '40px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 47
                }
            }, _react2.default.createElement(_semanticUiReact.Grid, { inverted: true, style: { padding: '0em 1em' }, relaxed: true, verticalAlign: 'bottom', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 48
                }
            }, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 4, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 49
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h3', inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 50
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ethereum', style: { float: 'left' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 51
                }
            }), 'Ethereum Rent')), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 7, textAlign: 'center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 54
                }
            }, _react2.default.createElement(_semanticUiReact.Input, { icon: _react2.default.createElement(_semanticUiReact.Icon, { name: 'search', inverted: true, circular: true, link: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 55
                    }
                }), placeholder: 'Search...', size: 'small', fluid: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            })), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 5, textAlign: 'right', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'grey', onClick: function onClick() {
                    return _routes.Router.pushRoute('/disputes');
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'warning circle', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            }), 'View List of Disputes'))))))), this.props.children);
        }
    }]);

    return HeaderDesktop;
}(_react.Component);

exports.default = HeaderDesktop;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSGVhZGVyRGVza3RvcC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIk1lbnUiLCJTZWdtZW50IiwiQ29udGFpbmVyIiwiSWNvbiIsIkhlYWRlciIsIkdyaWQiLCJJbnB1dCIsIkJ1dHRvbiIsIlN0aWNreSIsIlJhaWwiLCJMaW5rIiwiUm91dGVyIiwiSGVhZGVyRGVza3RvcCIsInRvcCIsImhlaWdodCIsIndpZHRoIiwicHJvcHMiLCJjb250ZXh0UmVmIiwibWluSGVpZ2h0IiwicGFkZGluZyIsInRleHRBbGlnbiIsIm1hcmdpblRvcCIsImZsb2F0IiwicHVzaFJvdXRlIiwiY2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTSxBQUFTLEFBQVcsQUFBTSxBQUFRLEFBQU0sQUFBTyxBQUFRLEFBQVE7O0FBQzlFLEFBQVMsQUFBTSxBQUFjOzs7Ozs7O0ksQUFFdkI7Ozs7Ozs7Ozs7O2lDQUVPLEFBQ0w7bUNBQ0ssY0FBRCxnQkFBQSxBQUFPOzs4QkFBUDtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNJLEFBQUM7MEJBQUQsQUFFSTswQkFGSixBQUVhLEFBQ1Q7MEJBSEosQUFJSTt1QkFBTyxFQUFFLEtBQUYsQUFBTyxRQUFRLFFBQWYsQUFBdUIsUUFBUSxPQUoxQyxBQUlXLEFBQXNDOzs4QkFKakQ7Z0NBQUEsQUFNSTtBQU5KO0FBQ0ksK0JBS0EsQUFBQyx5Q0FBTyxTQUFTLEtBQUEsQUFBSyxNQUF0QixBQUE0Qjs4QkFBNUI7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsMENBQVEsVUFBVCxNQUFrQixVQUFsQixNQUEyQixPQUFPLEVBQUUsV0FBRixBQUFhLEtBQU0sU0FBbkIsQUFBNEIsbUJBQW1CLFdBQWpGLEFBQWtDLEFBQTBEOzhCQUE1RjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxVQUFOLE1BQWUsV0FBZixNQUF5QixPQUF6QixBQUErQixPQUFNLE1BQXJDLEFBQTBDOzhCQUExQztnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQyw4QkFBSyxPQUFOLEFBQVk7OEJBQVo7Z0NBQUEsQUFDSTtBQURKOytCQUNJLGNBQUEsT0FBRyxXQUFILEFBQWU7OEJBQWY7Z0NBQUE7QUFBQTtlQUZSLEFBQ0ksQUFDSSxBQUtKLDBCQUFDLGNBQUQsc0JBQUEsQUFBTSxRQUFLLFVBQVgsQUFBcUI7OEJBQXJCO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLDhCQUFLLE9BQU4sQUFBWTs4QkFBWjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksY0FBQSxPQUFHLFdBQUgsQUFBZTs4QkFBZjtnQ0FBQTtBQUFBO2VBRlIsQUFDSSxBQUNJLEFBS0osb0NBQUEsQUFBQyw4QkFBSyxPQUFOLEFBQVk7OEJBQVo7Z0NBQUEsQUFDSTtBQURKOytCQUNJLGNBQUEsT0FBRyxXQUFILEFBQWU7OEJBQWY7Z0NBQUE7QUFBQTtlQVJSLEFBT0ksQUFDSSxBQUtKLGtDQUFBLEFBQUMsOEJBQUssT0FBTixBQUFZOzhCQUFaO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxjQUFBLE9BQUcsV0FBSCxBQUFlOzhCQUFmO2dDQUFBO0FBQUE7ZUF2QnBCLEFBQ0ksQUFDSSxBQU9JLEFBYUksQUFDSSxBQU9aLHFDQUFBLEFBQUMsNENBQVUsT0FBTyxFQUFDLFdBQW5CLEFBQWtCLEFBQVk7OEJBQTlCO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLHVDQUFLLFVBQU4sTUFBZSxPQUFPLEVBQUMsU0FBdkIsQUFBc0IsQUFBVSxhQUFZLFNBQTVDLE1BQW9ELGVBQXBELEFBQWtFOzhCQUFsRTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ssY0FBRCxzQkFBQSxBQUFNLFVBQU8sT0FBYixBQUFvQjs4QkFBcEI7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMseUNBQU8sSUFBUixBQUFXLE1BQUssVUFBaEI7OEJBQUE7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXLFlBQVcsT0FBTyxFQUFDLE9BQTlCLEFBQTZCLEFBQVE7OEJBQXJDO2dDQURKLEFBQ0k7QUFBQTtnQkFIWixBQUNJLEFBQ0ksQUFJSixtQ0FBQyxjQUFELHNCQUFBLEFBQU0sVUFBTyxPQUFiLEFBQW9CLEdBQUcsV0FBdkIsQUFBaUM7OEJBQWpDO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLHdDQUFNLHNCQUFNLEFBQUMsdUNBQUssTUFBTixBQUFXLFVBQVMsVUFBcEIsTUFBNkIsVUFBN0IsTUFBc0MsTUFBdEM7a0NBQUE7b0NBQWIsQUFBYTtBQUFBO2lCQUFBLEdBQStDLGFBQTVELEFBQXdFLGFBQVksTUFBcEYsQUFBeUYsU0FBUSxPQUFqRzs4QkFBQTtnQ0FQUixBQU1JLEFBQ0ksQUFFSjtBQUZJO2lDQUVILGNBQUQsc0JBQUEsQUFBTSxVQUFPLE9BQWIsQUFBb0IsR0FBRyxXQUF2QixBQUFpQzs4QkFBakM7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMseUNBQU8sT0FBUixBQUFjLFFBQU8sU0FBUyxtQkFBQTsyQkFBTSxlQUFBLEFBQU8sVUFBYjtBQUE5Qjs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxNQUFOLEFBQVc7OEJBQVg7Z0NBREosQUFDSTtBQUFBO2dCQWxEcEMsQUFDSSxBQU1JLEFBQ0ksQUE4QlEsQUFDSSxBQVNJLEFBQ0ksQUFTM0IscUNBQUEsQUFBSyxNQTNEZCxBQUNJLEFBMERnQixBQUd2Qjs7Ozs7QSxBQWpFdUIsQUFvRTVCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkhlYWRlckRlc2t0b3AuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3NoZWxpbmFsdXNhbmRyby9Eb2N1bWVudHMvRllQL3JlbnQtYXBwIn0=