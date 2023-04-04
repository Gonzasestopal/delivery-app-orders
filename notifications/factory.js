const adapters = require('./adapters.js');

function getNotifier() {
    return new adapters.SendgridAdapter(
        host=process.env.SENDGRID_HOST,
        apiKey=process.env.SENDGRID_API_KEY,
        sender=process.env.EMAIL_SENDER,
    )
}

module.exports = {
    getNotifier,
}