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

var _mobileDetect = require('mobile-detect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

var _semanticUiReact = require('semantic-ui-react');

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _HeaderDesktop = require('./HeaderDesktop');

var _HeaderDesktop2 = _interopRequireDefault(_HeaderDesktop);

var _HeaderMobile = require('./HeaderMobile');

var _HeaderMobile2 = _interopRequireDefault(_HeaderMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/shelinalusandro/Documents/FYP/rent-app/components/Layout.js';


var DesktopContainer = function (_Component) {
    (0, _inherits3.default)(DesktopContainer, _Component);

    function DesktopContainer() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DesktopContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DesktopContainer.__proto__ || (0, _getPrototypeOf2.default)(DesktopContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DesktopContainer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                getWidth = _props.getWidth,
                contextRef = _props.contextRef,
                children = _props.children;

            return _react2.default.createElement(_semanticUiReact.Responsive, { fireOnMount: true, getWidth: getWidth, minWidth: _semanticUiReact.Responsive.onlyTablet.minWidth, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                }
            }, _react2.default.createElement(_HeaderDesktop2.default, { contextRef: contextRef, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                }
            }, _react2.default.createElement(_semanticUiReact.Container, { style: { paddingTop: "10em" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                }
            }, children)));
        }
    }]);

    return DesktopContainer;
}(_react.Component);

var MobileContainer = function (_Component2) {
    (0, _inherits3.default)(MobileContainer, _Component2);

    function MobileContainer() {
        var _ref2;

        var _temp2, _this2, _ret2;

        (0, _classCallCheck3.default)(this, MobileContainer);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref2 = MobileContainer.__proto__ || (0, _getPrototypeOf2.default)(MobileContainer)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = { sidebarOpened: false }, _this2.handleSidebarHide = function () {
            return _this2.setState({ sidebarOpened: false });
        }, _this2.handleToggle = function () {
            return _this2.setState({ sidebarOpened: true });
        }, _temp2), (0, _possibleConstructorReturn3.default)(_this2, _ret2);
    }

    (0, _createClass3.default)(MobileContainer, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                getWidth = _props2.getWidth,
                contextRef = _props2.contextRef,
                children = _props2.children;

            return _react2.default.createElement(_semanticUiReact.Responsive, { fireOnMount: true, as: _semanticUiReact.Sidebar.Pushable, getWidth: getWidth, maxWidth: _semanticUiReact.Responsive.onlyMobile.maxWidth, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 37
                }
            }, _react2.default.createElement(_HeaderMobile2.default, { contextRef: contextRef,
                handleSidebarHide: this.handleSidebarHide,
                handleToggle: this.handleToggle,
                sidebarOpened: this.state.sidebarOpened, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                }
            }, _react2.default.createElement(_semanticUiReact.Container, { style: { paddingTop: "10em" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 42
                }
            }, children)));
        }
    }]);

    return MobileContainer;
}(_react.Component);

var Layout = function (_Component3) {
    (0, _inherits3.default)(Layout, _Component3);

    function Layout() {
        var _ref3;

        var _temp3, _this3, _ret3;

        (0, _classCallCheck3.default)(this, Layout);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref3 = Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).call.apply(_ref3, [this].concat(args))), _this3), _this3.state = {}, _this3.handleContextRef = function (contextRef) {
            return _this3.setState({ contextRef: contextRef });
        }, _temp3), (0, _possibleConstructorReturn3.default)(_this3, _ret3);
    }

    (0, _createClass3.default)(Layout, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_react2.default.Fragment, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                }
            }, _react2.default.createElement(_head2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 66
                }
            }, _react2.default.createElement('link', {
                rel: 'stylesheet',
                href: '//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 67
                }
            }), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 71
                }
            })), _react2.default.createElement('div', { ref: this.handleContextRef, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 73
                }
            }, _react2.default.createElement(DesktopContainer, { contextRef: this.state.contextRef, getWidth: getWidthFactory(this.props.isMobileFromSSR), __source: {
                    fileName: _jsxFileName,
                    lineNumber: 75
                }
            }, this.props.children), _react2.default.createElement(MobileContainer, { contextRef: this.state.contextRef, getWidth: getWidthFactory(this.props.isMobileFromSSR), __source: {
                    fileName: _jsxFileName,
                    lineNumber: 79
                }
            }, this.props.children)));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref4) {
                var req = _ref4.req;
                var md, isMobileFromSSR;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                md = new _mobileDetect2.default(req.headers["user-agent"]);
                                isMobileFromSSR = !!md.mobile();
                                return _context.abrupt('return', { isMobileFromSSR: isMobileFromSSR });

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getInitialProps(_x) {
                return _ref5.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return Layout;
}(_react.Component);

var getWidthFactory = function getWidthFactory(isMobileFromSSR) {
    return function () {
        var isSSR = typeof window === "undefined";
        console.log('isSSR: ' + isSSR + ' , is MobileFromSSR' + isMobileFromSSR);
        var ssrValue = isMobileFromSSR ? _semanticUiReact.Responsive.onlyMobile.maxWidth : _semanticUiReact.Responsive.onlyTablet.minWidth;

        return isSSR ? ssrValue : window.innerWidth;
    };
};

exports.default = Layout;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTGF5b3V0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTW9iaWxlRGV0ZWN0IiwiQ29udGFpbmVyIiwiUmVzcG9uc2l2ZSIsIlNpZGViYXIiLCJIZWFkIiwiSGVhZGVyRGVza3RvcCIsIkhlYWRlck1vYmlsZSIsIkRlc2t0b3BDb250YWluZXIiLCJzdGF0ZSIsInByb3BzIiwiZ2V0V2lkdGgiLCJjb250ZXh0UmVmIiwiY2hpbGRyZW4iLCJvbmx5VGFibGV0IiwibWluV2lkdGgiLCJwYWRkaW5nVG9wIiwiTW9iaWxlQ29udGFpbmVyIiwic2lkZWJhck9wZW5lZCIsImhhbmRsZVNpZGViYXJIaWRlIiwic2V0U3RhdGUiLCJoYW5kbGVUb2dnbGUiLCJQdXNoYWJsZSIsIm9ubHlNb2JpbGUiLCJtYXhXaWR0aCIsIkxheW91dCIsImhhbmRsZUNvbnRleHRSZWYiLCJnZXRXaWR0aEZhY3RvcnkiLCJpc01vYmlsZUZyb21TU1IiLCJyZXEiLCJtZCIsImhlYWRlcnMiLCJtb2JpbGUiLCJpc1NTUiIsIndpbmRvdyIsImNvbnNvbGUiLCJsb2ciLCJzc3JWYWx1ZSIsImlubmVyV2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBTzs7OztBQUNQLEFBQVMsQUFBVyxBQUFZOztBQUNoQyxBQUFPOzs7O0FBQ1AsQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQWtCOzs7Ozs7Ozs7SSxBQUVuQjs7Ozs7Ozs7Ozs7Ozs7b08sQUFDRixRLEFBQVE7Ozs7O2lDQUVDO3lCQUNzQyxLQUR0QyxBQUMyQztnQkFEM0MsQUFDRyxrQkFESCxBQUNHO2dCQURILEFBQ2Esb0JBRGIsQUFDYTtnQkFEYixBQUN5QixrQkFEekIsQUFDeUIsQUFFOUI7O21DQUNJLEFBQUMsNkNBQVcsYUFBWixNQUF3QixVQUF4QixBQUFrQyxVQUFVLFVBQVUsNEJBQUEsQUFBVyxXQUFqRSxBQUE0RTs4QkFBNUU7Z0NBQUEsQUFDSTtBQURKO2FBQUEsa0JBQ0ksQUFBQyx5Q0FBYyxZQUFmLEFBQTJCOzhCQUEzQjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyw0Q0FBVSxPQUFPLEVBQUUsWUFBcEIsQUFBa0IsQUFBYzs4QkFBaEM7Z0NBQUEsQUFDSztBQURMO2VBSFosQUFDSSxBQUNJLEFBQ0ksQUFNZjs7Ozs7QSxBQWYwQjs7SSxBQWtCekI7Ozs7Ozs7Ozs7Ozs7O3lPLEFBQ0YsUUFBUSxFQUFFLGUsQUFBRixBQUFpQixnQixBQUV6QixvQkFBb0IsWUFBQTttQkFBTSxPQUFBLEFBQUssU0FBUyxFQUFFLGVBQXRCLEFBQU0sQUFBYyxBQUFpQjtBLGtCLEFBRXpELGVBQWUsWUFBQTttQkFBTSxPQUFBLEFBQUssU0FBUyxFQUFFLGVBQXRCLEFBQU0sQUFBYyxBQUFpQjtBOzs7OztpQ0FFM0M7MEJBQ3NDLEtBRHRDLEFBQzJDO2dCQUQzQyxBQUNHLG1CQURILEFBQ0c7Z0JBREgsQUFDYSxxQkFEYixBQUNhO2dCQURiLEFBQ3lCLG1CQUR6QixBQUN5QixBQUU5Qjs7bUNBQ0ksQUFBQyw2Q0FBVyxhQUFaLE1BQXdCLElBQUkseUJBQTVCLEFBQW9DLFVBQVUsVUFBOUMsQUFBd0QsVUFBVSxVQUFVLDRCQUFBLEFBQVcsV0FBdkYsQUFBa0c7OEJBQWxHO2dDQUFBLEFBQ0k7QUFESjthQUFBLGtCQUNJLEFBQUMsd0NBQWEsWUFBZCxBQUEwQixBQUNkO21DQUFtQixLQUQvQixBQUNvQyxBQUN4Qjs4QkFBYyxLQUYxQixBQUUrQixBQUNuQjsrQkFBZSxLQUFBLEFBQUssTUFIaEMsQUFHc0M7OEJBSHRDO2dDQUFBLEFBSUk7QUFKSjsrQkFJSSxBQUFDLDRDQUFVLE9BQU8sRUFBRSxZQUFwQixBQUFrQixBQUFjOzhCQUFoQztnQ0FBQSxBQUNLO0FBREw7ZUFOWixBQUNJLEFBQ0ksQUFJSSxBQU1mOzs7OztBLEFBdEJ5Qjs7SSxBQXlCeEI7Ozs7Ozs7Ozs7Ozs7O3VOLEFBQ0YsUSxBQUFRLFcsQUFTUixtQkFBbUIsc0JBQUE7bUJBQWMsT0FBQSxBQUFLLFNBQVMsRUFBRSxZQUE5QixBQUFjLEFBQWM7QTs7Ozs7aUNBRXZDLEFBQ0o7bUNBQ0ssY0FBRCxnQkFBQSxBQUFPOzs4QkFBUDtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNJLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBO3FCQUNJLEFBQ1EsQUFDSjtzQkFGSixBQUVTOzs4QkFGVDtnQ0FESixBQUNJLEFBSUE7QUFKQTtBQUNJLHdEQUdFLE1BQU4sQUFBVyxZQUFXLFNBQXRCLEFBQThCOzhCQUE5QjtnQ0FOUixBQUNJLEFBS0ksQUFFSjtBQUZJO2lDQUVKLGNBQUEsU0FBSyxLQUFLLEtBQVYsQUFBZTs4QkFBZjtnQ0FBQSxBQUVJO0FBRko7K0JBRUssY0FBRCxvQkFBa0IsWUFBWSxLQUFBLEFBQUssTUFBbkMsQUFBeUMsWUFBWSxVQUFVLGdCQUFnQixLQUFBLEFBQUssTUFBcEYsQUFBK0QsQUFBMkI7OEJBQTFGO2dDQUFBLEFBQ0s7QUFETDtvQkFDSyxBQUFLLE1BSGQsQUFFSSxBQUNnQixBQUdoQiwyQkFBQyxjQUFELG1CQUFpQixZQUFZLEtBQUEsQUFBSyxNQUFsQyxBQUF3QyxZQUFZLFVBQVUsZ0JBQWdCLEtBQUEsQUFBSyxNQUFuRixBQUE4RCxBQUEyQjs4QkFBekY7Z0NBQUEsQUFDSztBQURMO29CQUNLLEFBQUssTUFoQnRCLEFBQ0ksQUFRSSxBQU1JLEFBQ2dCLEFBTS9COzs7Ozs7b0IsQUFoQzhCLFksQUFBQTs7Ozs7aUNBQ3JCO0EscUNBQUssQUFBSSwyQkFBYSxJQUFBLEFBQUksUSxBQUFyQixBQUFpQixBQUFZLEFBQ2xDO0Esa0RBQWtCLENBQUMsQ0FBQyxHLEFBQUEsQUFBRztpRUFFdEIsRUFBRSxpQixBQUFGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EsQUFQTTs7QUFzQ3JCLElBQU0sa0JBQWtCLFNBQWxCLEFBQWtCLGlDQUFBO1dBQW1CLFlBQU0sQUFDN0M7WUFBTSxRQUFRLE9BQUEsQUFBTyxXQUFyQixBQUFnQyxBQUNoQztnQkFBQSxBQUFRLElBQUksWUFBQSxBQUFXLFFBQVgsQUFBbUIsd0JBQS9CLEFBQXVELEFBQ3ZEO1lBQU0sV0FBVyxrQkFDYiw0QkFBQSxBQUFXLFdBREUsQUFDUyxXQUN0Qiw0QkFBQSxBQUFXLFdBRmYsQUFFMEIsQUFFMUI7O2VBQU8sUUFBQSxBQUFRLFdBQVcsT0FBMUIsQUFBaUMsQUFDcEM7QUFSdUI7QUFBeEIsQUFVQTs7a0JBQUEsQUFBZSIsImZpbGUiOiJMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3NoZWxpbmFsdXNhbmRyby9Eb2N1bWVudHMvRllQL3JlbnQtYXBwIn0=