const express = require('express')
const router = express.Router()
const AuthMiddleware = require('../middleware/auth')
const AuthController = require('../controllers/AuthController')

router.post('/registration',AuthController.registration)
router.post('/login',AuthController.login)
router.get('/checkauth',AuthMiddleware,AuthController.check )


module.exports = router