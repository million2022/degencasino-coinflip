const express = require('express')
const router = express.Router()

const userController = require('../../controllers/UserController')
const upload = require('../../middlewares/upload')

// Create User
router.post(
  '/manage/:address',
  upload.fields([
    { name: 'pictures', maxCount: 10 },
    { name: 'avatar', maxCount: 1 }
  ]),
  userController.manageUser
);
// Get Current User
router.post('/get', userController.getUser);

module.exports = router
