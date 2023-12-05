/**
 * subscribtionRoutes.js
 * @description :: CRUD API routes for subscribtion
 */

const express = require('express');
const router = express.Router();
const subscribtionController = require('../../controller/admin/subscribtionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/subscribtion/create').post(auth(PLATFORM.ADMIN),checkRolePermission,subscribtionController.addSubscribtion);
router.route('/admin/subscribtion/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,subscribtionController.getSubscribtion);
router.route('/admin/subscribtion/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,subscribtionController.cancelSubscribtion);


module.exports = router;
