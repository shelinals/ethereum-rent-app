const routes = require('next-routes')();

//create routes with custom tokens

routes
     .add('/disputes', '/disputeList')
     .add('/disputes/:address/:addressIdx', '/rents/disputes/index')
     .add('/profile/:address', '/profile')
     .add('/rents/lend', '/rents/lend')
     .add('/rents/manage', '/rents/manage/index')
     .add('/rents/scancode', '/rents/scancode')
     .add('/rents/:address', '/rents/show')
     .add('/rents/:address/dispute', '/rents/disputes/index')
     .add('/rents/:address/dispute/new', '/rents/disputes/new');

module.exports = routes;