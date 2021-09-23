const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')

router.get( '/', UsersController.getAll )
router.get( '/:id', UsersController.getOne )
router.delete( '/:id',UsersController.delete )
router.delete( '/deleteAll',UsersController.deleteAll )




module.exports = router