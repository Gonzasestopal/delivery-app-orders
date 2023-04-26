const getNotifier  = require('../notifications/factory.js').getNotifier
const NotificationInterface = require('../notifications/interface.js').Notifications

var expect = require('chai').expect;

describe("#getNotifier()", function () {
	it('should be an instance of Notifier', function () {
		const notifier = getNotifier()
		
		expect(notifier).instanceOf(NotificationInterface)
	});
});

