const NotificationInterface = require('../notifications/interface.js').Notifications

var expect = require('chai').expect;
const sinon = require("sinon");


class A extends NotificationInterface {
    constructor() {
        super()
    }
}

describe("#Notifications", function () {
    it('should now allow instantiante abstract class', function() {
        
        expect(function() {new NotificationInterface()}).to.throw(Error)
    })

    it('should require send method implementation', function() {
        const a = new A()

        expect(function() {a.send()}).to.throw(Error)
    })
});

