const router = require('express').Router();
const orders = require('../models/orders.js');
const meals = require('../models/meals.js');
const {
    validateItemId,
    validatePostReqBody,
    verifyToken,
    isAdmin,
} = require('../api/middleware.js')

class InvalidStatus extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidStatus";
    }
}

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

    if (!(meal_id)) {
        res.status(400).send("All input is required");
        return;
    }

    if (user.status == 'inactive') {
        res.status(403).json({ message: 'Invalid user status.' });
        return;
    }

    opening = new Date()
    opening.setHours('10')

    closing = new Date()
    closing.setHours('22')

    now = new Date()

    if (opening >= now >= closing) {
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
                status: 'added'
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

router.put('/:id/confirm', verifyToken, (req, res) => {
    const order_id = req.body.order_id

    if (!(order_id)) {
        res.status(400).send("All input is required");
        return;
    }

    orders.findById(order_id)
        .then(item => {
            if (item.status !== 'added') {
                throw new InvalidStatus()
            }
            return orders.edit(item.id, { 'status': 'confirmed' })
        })
        .then(updatedItemId => {
            [updatedItemId] = updatedItemId
            return orders.findById(updatedItemId['id'])
        })
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(err => {
            if (err.name == 'InvalidStatus') {
                res.status(401).json({ message: 'Order cannot be confirmed.' })
                return;
            }
            res.status(500).json({ message: 'Error updating the item.' })
        })

})


router.put('/:id', isAdmin, validateItemId, (req, res) => {
    const id = req.params.id
    const updated = req.body
    orders.findById(id)
        .then(item => {
            if (item.status === 'preparando') {
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
