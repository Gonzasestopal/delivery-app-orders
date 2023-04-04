const router = require('express').Router();
const meals = require('../repositories/meals.js');
const {
  validateItemId,
  validatePostReqBody,
  verifyToken,
  isAdmin,
} = require('../api/middleware.js')

router.get('/', verifyToken, (req, res) => {
  let sort = req.query.sort;
  let filterByCategoryParam = req.query.category;
  let filterByNameParam = req.query.name

  meals.find(filterByNameParam, filterByCategoryParam, sort)
    .then(meals => {
      res.status(200).json(meals)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the items.' })
    })
})

router.get('/:id', isAdmin, validateItemId, (req, res) => {
  const id = req.params.id
  meals.findById(id)
    .then(item => {
      res.status(200).json(item)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the item.' })
    })
})

router.post('/', isAdmin, validatePostReqBody, (req, res) => {
  const item = req.body
  meals.add(item)
    .then(id => {
      [newItemId] = id
      return meals.findById(newItemId['id'])
    })
    .then(item => {
      res.status(201).json({ message: 'Successfully added the item.', item })
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding the item.' })
    })
})

router.put('/:id', isAdmin, validateItemId, (req, res) => {
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
      res.status(500).json({ message: 'Error updating the item.' })
    })
})

router.delete('/:id', isAdmin, validateItemId, (req, res) => {
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
