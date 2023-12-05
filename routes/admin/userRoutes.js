/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../controller/admin/userController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/user/me').get(auth(PLATFORM.ADMIN),userController.getLoggedInUserInfo);
router.route('/admin/user/change-password').put(auth(PLATFORM.ADMIN),userController.changePassword);
router.route('/admin/user/update-profile').put(auth(PLATFORM.ADMIN),userController.updateProfile);

module.exports = router;
