const nodemailer = require('nodemailer')
const expect = require('chai').expect;
const sinon = require("sinon");

const SendgridAdapter  = require('../notifications/adapters.js').SendgridAdapter


describe("#SendgridAdapter", function () {
    afterEach(function () {
        sinon.restore();
    });

    it('should define required properties', function () {
        sinon.stub(nodemailer, 'createTransport')

        const adapter = new SendgridAdapter(
            host='foo',
            apiKey='bar',
            senderEmail='ok',
            transporter=nodemailer,
        )

        expect(adapter.host).equal('foo')
        expect(adapter.apiKey).equal('bar')
        expect(adapter.senderEmail).equal('ok')
        expect(adapter.transporter).equal(nodemailer.createTransport())
    })

    it('should implement send method', function () {
        const sendMailStub = sinon.stub();
        sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sendMailStub
        })
        
        const adapter = new SendgridAdapter(
            host='foo',
            apiKey='bar',
            senderEmail='ok',
            transporter=nodemailer,
        )

        adapter.send('foo@gmail.com')

        expect(sendMailStub.called).to.be.true

    })
		
});

