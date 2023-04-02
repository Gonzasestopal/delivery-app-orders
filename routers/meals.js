const router = require('express').Router();
const meals = require('../models/meals.js');
const {
  validateItemId,
  validatePostReqBody
} = require('../api/middleware.js')

router.get('/', (req, res) => {
  meals.find()
    .then(meals => {
      res.status(200).json(meals)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the items.' })
      console.log(err)
    })
})

router.get('/:id', validateItemId, (req, res) => {
  const id = req.params.id
  meals.findById(id)
    .then(item => {
      res.status(200).json(item)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the item.' })
      console.log(err)
    })
})

router.post('/', validatePostReqBody, (req, res) => {
  const item = req.body
  meals.add(item)
    .then(id => {
      [newItemId] = id
      console.group(newItemId)
      return meals.findById(newItemId['id'])
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
  meals.edit(id, updated)
    .then(updatedItemId => {
      [updatedItemId] = updatedItemId
      return meals.findById(updatedItemId['id'])
    })
    .then(updated => {
      res.status(201).json(updated)
    })
    .catch(err => {
      console.log(err)

      res.status(500).json({ message: 'Error updating the item.' })
    })
})

router.delete('/:id', validateItemId, (req, res) => {
  const id = req.params.id
  meals.remove(id)
    .then(deleted => {
      res.status(200).json({ message: 'Successfully removed the item.' })
    })
    .catch(err => {
      res.status(500).json({ message: 'Error removing the item.' })
    })
})

module.exports = router;
