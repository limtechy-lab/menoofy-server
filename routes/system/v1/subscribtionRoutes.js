/**
 * subscribtionRoutes.js
 * @description :: CRUD API routes for subscribtion
 */

const express = require('express');
const router = express.Router();
const subscribtionController = require('../../../controller/system/v1/subscribtionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/system/api/v1/subscribtion/create').post(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.addSubscribtion);
router.route('/system/api/v1/subscribtion/list').post(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.findAllSubscribtion);
router.route('/system/api/v1/subscribtion/count').post(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.getSubscribtionCount);
router.route('/system/api/v1/subscribtion/:id').get(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.getSubscribtion);
router.route('/system/api/v1/subscribtion/update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.updateSubscribtion);    
router.route('/system/api/v1/subscribtion/partial-update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.partialUpdateSubscribtion);
router.route('/system/api/v1/subscribtion/softDelete/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.softDeleteSubscribtion);
router.route('/system/api/v1/subscribtion/softDeleteMany').put(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.softDeleteManySubscribtion);
router.route('/system/api/v1/subscribtion/addBulk').post(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.bulkInsertSubscribtion);
router.route('/system/api/v1/subscribtion/updateBulk').put(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.bulkUpdateSubscribtion);
router.route('/system/api/v1/subscribtion/delete/:id').delete(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.deleteSubscribtion);
router.route('/system/api/v1/subscribtion/deleteMany').post(auth(PLATFORM.SYSTEM),checkRolePermission,subscribtionController.deleteManySubscribtion);

module.exports = router;
