var cron = require('node-cron');
const orders = require('../repositories/orders.js');
const utils = require('../utils.js');

function verifyRecentlyAddedOrders() {
  cron.schedule('*/10 * * * * *', () => {
    return orders.findRecentlyAddedOrders()
      .then(function(items) {
        return items.filter(utils.filterRecentlyAddedOrders);
        })
      .then(function(items) {
        const ids = items.map(function(order) {return order.id})
        return orders.updateRecentlyAddedOrders(ids);
      })
      .catch(function(err){
        console.log(err)
      })
  });
}

module.exports = {
  verifyRecentlyAddedOrders,
}