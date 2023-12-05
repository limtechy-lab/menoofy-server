/**
 * itemContentRoutes.js
 * @description :: CRUD API routes for itemContent
 */

const express = require('express');
const router = express.Router();
const itemContentController = require('../../controller/admin/itemContentController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/itemcontent/create').post(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.addItemContent);
router.route('/admin/itemcontent/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.bulkInsertItemContent);
router.route('/admin/itemcontent/list').post(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.findAllItemContent);
router.route('/admin/itemcontent/count').post(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.getItemContentCount);
router.route('/admin/itemcontent/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.getItemContent);
router.route('/admin/itemcontent/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.updateItemContent);    
router.route('/admin/itemcontent/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.partialUpdateItemContent);
router.route('/admin/itemcontent/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.bulkUpdateItemContent);
router.route('/admin/itemcontent/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.softDeleteItemContent);
router.route('/admin/itemcontent/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.softDeleteManyItemContent);
router.route('/admin/itemcontent/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.deleteItemContent);
router.route('/admin/itemcontent/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,itemContentController.deleteManyItemContent);

module.exports = router;
