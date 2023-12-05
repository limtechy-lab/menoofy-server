/**
 * itemRoutes.js
 * @description :: CRUD API routes for item
 */

const express = require('express');
const router = express.Router();
const itemController = require('../../../controller/system/v1/itemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/system/api/v1/item/list').post(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.findAllItem);
router.route('/system/api/v1/item/count').post(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.getItemCount);
router.route('/system/api/v1/item/:id').get(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.getItem);
router.route('/system/api/v1/item/update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.updateItem);    
router.route('/system/api/v1/item/partial-update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.partialUpdateItem);
router.route('/system/api/v1/item/updateBulk').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.bulkUpdateItem);
router.route('/system/api/v1/item/softDelete/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.softDeleteItem);
router.route('/system/api/v1/item/softDeleteMany').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.softDeleteManyItem);
router.route('/system/api/v1/item/delete/:id').delete(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.deleteItem);
router.route('/system/api/v1/item/deleteMany').post(auth(PLATFORM.SYSTEM),checkRolePermission,itemController.deleteManyItem);

module.exports = router;
