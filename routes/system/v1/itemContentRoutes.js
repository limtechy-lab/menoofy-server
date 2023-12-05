/**
 * itemContentRoutes.js
 * @description :: CRUD API routes for itemContent
 */

const express = require('express');
const router = express.Router();
const itemContentController = require('../../../controller/system/v1/itemContentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/system/api/v1/itemcontent/list').post(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.findAllItemContent);
router.route('/system/api/v1/itemcontent/count').post(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.getItemContentCount);
router.route('/system/api/v1/itemcontent/:id').get(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.getItemContent);
router.route('/system/api/v1/itemcontent/update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.updateItemContent);    
router.route('/system/api/v1/itemcontent/partial-update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.partialUpdateItemContent);
router.route('/system/api/v1/itemcontent/updateBulk').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.bulkUpdateItemContent);
router.route('/system/api/v1/itemcontent/softDelete/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.softDeleteItemContent);
router.route('/system/api/v1/itemcontent/softDeleteMany').put(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.softDeleteManyItemContent);
router.route('/system/api/v1/itemcontent/delete/:id').delete(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.deleteItemContent);
router.route('/system/api/v1/itemcontent/deleteMany').post(auth(PLATFORM.SYSTEM),checkRolePermission,itemContentController.deleteManyItemContent);

module.exports = router;
