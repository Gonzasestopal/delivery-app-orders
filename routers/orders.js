const router = require('express').Router();
const orders = require('../repositories/orders.js');
const meals = require('../repositories/meals.js');
const { InvalidStatus } = require('../api/errors.js');
const mealOptions = require('../repositories/meal_options.js')
const { Statuses, UserStatuses } = require('../api/resources.js');
const {
	validateItemId,
	verifyToken,
	isAdmin,
} = require('../api/middleware.js')
const utils = require('../utils.js')

router.get('/', isAdmin, (req, res) => {
	orders.find()
		.then(orders => {
			res.status(200).json(orders)
		})
		.catch(err => {
			res.status(500).json({ message: 'Error retrieving the orders.' })
		})
})

router.get('/:id', isAdmin, validateItemId, (req, res) => {
	const id = req.params.id
	orders.findById(id)
		.then(item => {
			res.status(200).json(item)
		})
		.catch(err => {
			res.status(500).json({ message: 'Error retrieving the item.' })
		})
})

router.post('/', verifyToken, (req, res) => {
	const meal_id = req.body.meal_id
	const user = req.user
	const now = new Date()

	if (!(meal_id)) {
		res.status(400).send("All input is required");
		return;
	}

	if (user.status == UserStatuses.Inactive) {
		res.status(403).json({ message: 'Invalid user status.' });
		return;
	}

	if (!utils.areWorkingHours(now)) {
		res.status(403).json({ message: 'We are not accepting orders.' });
		return;
	}

	meals.findById(meal_id)
		.then(item => {
			if (!item.is_available) {
				throw new InvalidStatus()
			}
		})
		.then(_ => {
			return orders.add({
				meal_id: meal_id,
				user_id: user.id,
				status: Statuses.Preparando,
			})
		})
		.then(id => {
			[newItemId] = id
			return orders.findById(newItemId['id'])
		})
		.then(item => {
			res.status(201).json({ message: 'Successfully added the item.', item })
		})
		.catch(err => {
			if (err.name == 'InvalidStatus') {
				res.status(403).json({ message: 'Invalid meal status.' });
				return;
			}
			res.status(500).json({ message: 'Error adding the item.' })
		})
})

router.post('/verify', verifyToken, (req, res) => {
	const order_id = req.body.order_id
	const tip = req.body.tip
	const user_id = req.user.id

	let mealsTotal = 0
	let mealOptionsTotal = 0

	if (!(order_id && tip)) {
		res.status(400).send("All input is required");
		return;
	}

	orders.findAllByUserId(user_id)
		.then(orders => {
			let mealIds = []
			for (let order of orders) {
				mealIds.push(order.meal_id)
			}
			return meals.findAll(mealIds)
		})
		.then(meals => {
			let mealIds = []
			for (let meal of meals) {
				if (!meal.is_available) {
					throw new InvalidStatus()
				}
				mealIds.push(meal.id)
				mealsTotal += meal.price
			}
			return mealOptions.findAllByMealId(mealIds)
		})
		.then(meal_options => {
			for (let option of meal_options) {
				if (!option.is_available) {
					throw new InvalidStatus()
				}
				mealOptionsTotal += option.price
			}

			let totals = utils.calculateTotals(mealsTotal, mealOptionsTotal, tip)

			res.status(201).json({
				message: 'Successfully calculated total.',
				meals_total: mealsTotal,
				meal_options_total: mealOptionsTotal,
				subtotal: totals.subtotal,
				subtotal_with_tip: totals.subtotalTip,
				total: totals.total,
			})
		})
		.catch(err => {
			if (err.name == 'InvalidStatus') {
				res.status(401).json({ message: 'Order cannot be confirmed.' })
				return;
			}
			res.status(500).json({ message: 'Error updating the item.' })
		})

})


router.post('/confirm', verifyToken, (req, res) => {
	const address = req.body.address
	const paymentMethod = req.body.payment_method

	if (!(address && paymentMethod)) {
		res.status(400).send("All input is required");
		return;
	}

	orders.findAllByUserId(user_id)
		.then(_ => {
			res.status(200).json({ message: 'Successfully confirmed the order.' })
		})
		.catch(err => {
			res.status(500).json({ message: 'Error confirming the order.' })
		})

})


router.put('/:id', isAdmin, validateItemId, (req, res) => {
	const id = req.params.id
	const updated = req.body
	orders.findById(id)
		.then(item => {
			if (item.status === Statuses.Preparando) {
				throw new InvalidStatus()
			}
		})
		.then(_ => {
			return orders.edit(id, updated)
		})
		.then(updatedItemId => {
			[updatedItemId] = updatedItemId
			return orders.findById(updatedItemId['id'])
		})
		.then(updated => {
			res.status(201).json(updated)
		})
		.catch(err => {
			if (err.name == "InvalidStatus") {
				res.status(401).json({ message: 'Order cannot be canceled.' })
				return;
			}
			res.status(500).json({ message: 'Error updating the item.' })
		})
})

router.delete('/:id', verifyToken, validateItemId, (req, res) => {
	const id = req.params.id
	orders.remove(id)
		.then(deleted => {
			res.status(200).json({ message: 'Successfully removed the item.' })
		})
		.catch(err => {
			res.status(500).json({ message: 'Error removing the item.' })
		})
})

module.exports = router;
