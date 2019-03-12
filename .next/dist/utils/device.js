'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var MobileDetect = require('mobile-detect');

var _require = require('semantic-ui-react'),
    Responsive = _require.Responsive;

var isMobileSSR = function isMobileSSR(req) {
    var md = new MobileDetect(req.headers["user-agent"]);
    return !!md.mobile();
};

var getWidth = function getWidth(isMobileFromSSR) {
    return function () {
        var isSSR = typeof window === "undefined";
        console.log('isSSR: ' + isSSR + ' , is MobileFromSSR' + isMobileFromSSR);
        var ssrValue = isMobileFromSSR ? Responsive.onlyMobile.maxWidth : Responsive.onlyTablet.minWidth;

        return isSSR ? ssrValue : window.innerWidth;
    };
};

exports.isMobileSSR = isMobileSSR;
exports.getWidth = getWidth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2RldmljZS5qcyJdLCJuYW1lcyI6WyJNb2JpbGVEZXRlY3QiLCJyZXF1aXJlIiwiUmVzcG9uc2l2ZSIsImlzTW9iaWxlU1NSIiwicmVxIiwibWQiLCJoZWFkZXJzIiwibW9iaWxlIiwiZ2V0V2lkdGgiLCJpc01vYmlsZUZyb21TU1IiLCJpc1NTUiIsIndpbmRvdyIsImNvbnNvbGUiLCJsb2ciLCJzc3JWYWx1ZSIsIm9ubHlNb2JpbGUiLCJtYXhXaWR0aCIsIm9ubHlUYWJsZXQiLCJtaW5XaWR0aCIsImlubmVyV2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTSxlQUFlLEFBQWYsQUFBTjs7ZUFDdUIsQTtJQUFmLEEsc0JBQUEsQTs7QUFFUixJQUFNLGNBQWMsU0FBZCxBQUFjLFlBQUMsQUFBRCxLQUFTLEFBQ3pCO1FBQU0sS0FBSyxJQUFJLEFBQUosYUFBaUIsSUFBSSxBQUFKLFFBQVksQUFBWixBQUFqQixBQUFYLEFBQ0E7V0FBTyxDQUFDLENBQUMsR0FBRyxBQUFILEFBQVQsQUFDSDtBQUhEOztBQUtBLElBQU0sV0FBVyxTQUFYLEFBQVcsU0FBQyxBQUFELGlCQUFBO1dBQXFCLFlBQU0sQUFDeEM7WUFBTSxRQUFRLE9BQU8sQUFBUCxXQUFrQixBQUFoQyxBQUNBO2dCQUFRLEFBQVIsSUFBWSxZQUFXLEFBQVgsUUFBbUIsQUFBbkIsd0JBQTJDLEFBQXZELEFBQ0E7WUFBTSxXQUFXLGtCQUNiLFdBQVcsQUFBWCxXQUFzQixBQURULFdBRWIsV0FBVyxBQUFYLFdBQXNCLEFBRjFCLEFBSUE7O2VBQU8sUUFBUSxBQUFSLFdBQW1CLE9BQU8sQUFBakMsQUFDSDtBQVJnQjtBQUFqQixBQVVDOztRQUFTLEFBQVQ7UUFBc0IsQUFBdEIiLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zaGVsaW5hbHVzYW5kcm8vRG9jdW1lbnRzL0ZZUC9yZW50LWFwcCJ9