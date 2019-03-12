'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _Rental = require('./build/Rental.json');

var _Rental2 = _interopRequireDefault(_Rental);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (address) {
    return new _web2.default.eth.Contract(JSON.parse(_Rental2.default.interface), address);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3JlbnRhbC5qcyJdLCJuYW1lcyI6WyJ3ZWIzIiwiUmVudGFsIiwiYWRkcmVzcyIsImV0aCIsIkNvbnRyYWN0IiwiSlNPTiIsInBhcnNlIiwiaW50ZXJmYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFPLEFBQVAsQUFBaUIsQUFBakI7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBbUIsQUFBbkIsQUFFQTs7Ozs7O2tCQUFlLFVBQUMsQUFBRCxTQUFhLEFBQ3hCO1dBQU8sSUFBSSxjQUFLLEFBQUwsSUFBUyxBQUFiLFNBQ0gsS0FBSyxBQUFMLE1BQVcsaUJBQU8sQUFBbEIsQUFERyxZQUVILEFBRkcsQUFBUCxBQUlIO0FBTEQiLCJmaWxlIjoicmVudGFsLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zaGVsaW5hbHVzYW5kcm8vRG9jdW1lbnRzL0ZZUC9yZW50LWFwcCJ9