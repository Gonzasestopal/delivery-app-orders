const router = require('express').Router();
const mealOptions = require('../models/meal_options.js');
const {
    validateItemId,
    validatePostReqBody,
    isAdmin,
} = require('../api/middleware.js')

router.get('/', isAdmin, (req, res) => {
    mealOptions.find()
        .then(mealOptions => {
            res.status(200).json(mealOptions)
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving the mealOptions.' })
        })
})

router.get('/:id', isAdmin, validateItemId, (req, res) => {
    const id = req.params.id
    mealOptions.findById(id)
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving the item.' })
        })
})

router.post('/', isAdmin, validatePostReqBody, (req, res) => {
    const item = req.body
    mealOptions.add(item)
        .then(id => {
            [newItemId] = id
            return mealOptions.findById(newItemId['id'])
        })
        .then(item => {
            res.status(201).json({ message: 'Successfully added the item.', item })
        })
        .catch(err => {
            res.status(500).json({ message: 'Error adding the item.' })
        })
})

router.put('/:id', validateItemId, (req, res) => {
    const id = req.params.id
    const updated = req.body
    mealOptions.edit(id, updated)
        .then(updatedItemId => {
            [updatedItemId] = updatedItemId
            return mealOptions.findById(updatedItemId['id'])
        })
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating the item.' })
        })
})

router.delete('/:id', isAdmin, validateItemId, (req, res) => {
    const id = req.params.id
    mealOptions.remove(id)
        .then(deleted => {
            res.status(200).json({ message: 'Successfully removed the item.' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Error removing the item.' })
        })
})

module.exports = router;
