require('dotenv').config()

const server = require('./api/server.js')
const tasks = require('./tasks/orders.js')

tasks.verifyRecentlyAddedOrders()

const port = process.env.PORT || 6001;

server.listen(port, () => {
  console.log(`\n === Server listening on port ${port} === \n`)
})
