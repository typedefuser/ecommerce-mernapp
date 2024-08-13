const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userAuth=require('../controllers/userAuth');


router.get('/all', userController.getAllUsers);
router.post('/signup', userController.createUser);
router.post('/login',userAuth.login)
// Add routes for getUser, updateUser, and deleteUser here...

module.exports = router;