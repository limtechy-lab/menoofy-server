/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../../controller/system/v1/userController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/system/api/v1/user/me').get(auth(PLATFORM.SYSTEM),userController.getLoggedInUserInfo);
router.route('/system/api/v1/user/change-password').put(auth(PLATFORM.SYSTEM),userController.changePassword);
router.route('/system/api/v1/user/update-profile').put(auth(PLATFORM.SYSTEM),userController.updateProfile);

module.exports = router;
