'use strict';

var routes = require('next-routes')();

//create routes with custom tokens

routes.add('/disputes', '/disputeList').add('/disputes/:address', '/rents/disputes/index').add('/profile/:address', '/profile').add('/rents/lend', '/rents/lend').add('/rents/manage', '/rents/manage/index').add('/rents/scancode', '/rents/scancode').add('/rents/:address', '/rents/show').add('/rents/:address/dispute', '/rents/disputes/index').add('/rents/:address/dispute/new', '/rents/disputes/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFFQTs7QUFFQSxPQUNNLEFBRE4sSUFDVSxBQURWLGFBQ3VCLEFBRHZCLGdCQUVNLEFBRk4sSUFFVSxBQUZWLHNCQUVnQyxBQUZoQyx5QkFHTSxBQUhOLElBR1UsQUFIVixxQkFHK0IsQUFIL0IsWUFJTSxBQUpOLElBSVUsQUFKVixlQUl5QixBQUp6QixlQUtNLEFBTE4sSUFLVSxBQUxWLGlCQUsyQixBQUwzQix1QkFNTSxBQU5OLElBTVUsQUFOVixtQkFNNkIsQUFON0IsbUJBT00sQUFQTixJQU9VLEFBUFYsbUJBTzZCLEFBUDdCLGVBUU0sQUFSTixJQVFVLEFBUlYsMkJBUXFDLEFBUnJDLHlCQVNNLEFBVE4sSUFTVSxBQVRWLCtCQVN5QyxBQVR6Qzs7QUFXQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zaGVsaW5hbHVzYW5kcm8vRG9jdW1lbnRzL0ZZUC9yZW50LWFwcCJ9