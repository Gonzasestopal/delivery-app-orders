
class InvalidStatus extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidStatus";
	}
}


module.exports = {
    InvalidStatus,
}