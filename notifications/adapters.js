const NotificationsInterface = require('./interface.js').Notifications

const nodemailer = require('nodemailer')

class SendgridAdapter extends NotificationsInterface {
    constructor(host, apiKey, senderEmail, transporter = nodemailer) {
        super()
        this.host = host
        this.apiKey = apiKey
        this.senderEmail = senderEmail
        this.transporter = this.#createTransport(transporter)
    }

    send(destination) {
        return this.transporter.sendMail({
            from: this.senderEmail,
            to: destination,
            subject: "Test message subject",
            text: "Hello world!",
            html: "<b>Hello world!</b>",
        })
    }

    #createTransport(transporter) {
        return transporter.createTransport({
            host: this.host,
            port: 587,
            auth: {
                user: "apikey",
                pass: this.apiKey
            }
        })
    }
}

module.exports = {
    SendgridAdapter,
}