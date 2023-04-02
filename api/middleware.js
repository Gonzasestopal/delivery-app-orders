const db = require('../api/db-config.js');
const meals = require('../models/meals.js');

module.exports = {
	validateItemId,
	validatePostReqBody,
	isAdmin
}

function validateItemId(req, res, next) {
	meals.findById(req.params.id)
		.then(response => {
			if (response) {
				res.id = response
				next()
			} else {
				res.status(404).json({ message: 'No item found with that ID.' })
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Error finding the item ID.' })
		})
}

function validatePostReqBody(req, res, next) {
	if (!req.body.name) {
		res.status(404).json({ message: 'Name field is required.' })
	}
	if (!req.body.price) {
		res.status(404).json({ message: 'Price field is required.' })
	}
	if (!req.body.category) {
		res.status(404).json({ message: 'Category field is required.' })
	}
	console.log('hi')
	next();

}


function isAdmin(req, res, next) {
	if (req.user.is_admin) {
		next();
	} else {
		res.status(403).send();
	}
}
