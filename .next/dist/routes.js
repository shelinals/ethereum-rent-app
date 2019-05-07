'use strict';

var routes = require('next-routes')();

//create routes with custom tokens

routes.add('/rents/lend', '/rents/lend').add('/rents/manage', '/rents/manage/index').add('/rents/scancode', '/rents/scancode').add('/rents/:address', '/rents/show').add('/rents/:address/:manage', '/rents/manage/item');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFFQTs7QUFFQSxPQUNNLEFBRE4sSUFDVSxBQURWLGVBQ3lCLEFBRHpCLGVBRU0sQUFGTixJQUVVLEFBRlYsaUJBRTJCLEFBRjNCLHVCQUdNLEFBSE4sSUFHVSxBQUhWLG1CQUc2QixBQUg3QixtQkFJTSxBQUpOLElBSVUsQUFKVixtQkFJNkIsQUFKN0IsZUFLTSxBQUxOLElBS1UsQUFMViwyQkFLcUMsQUFMckM7O0FBT0EsT0FBTyxBQUFQLFVBQWlCLEFBQWpCIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvc2hlbGluYWx1c2FuZHJvL0RvY3VtZW50cy9GWVAvcmVudC1hcHAifQ==