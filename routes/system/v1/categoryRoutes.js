/**
 * categoryRoutes.js
 * @description :: CRUD API routes for category
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../../../controller/system/v1/categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/system/api/v1/category/list').post(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.findAllCategory);
router.route('/system/api/v1/category/count').post(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.getCategoryCount);
router.route('/system/api/v1/category/:id').get(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.getCategory);
router.route('/system/api/v1/category/update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.updateCategory);    
router.route('/system/api/v1/category/partial-update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.partialUpdateCategory);
router.route('/system/api/v1/category/updateBulk').put(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.bulkUpdateCategory);
router.route('/system/api/v1/category/softDelete/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.softDeleteCategory);
router.route('/system/api/v1/category/softDeleteMany').put(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.softDeleteManyCategory);
router.route('/system/api/v1/category/delete/:id').delete(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.deleteCategory);
router.route('/system/api/v1/category/deleteMany').post(auth(PLATFORM.SYSTEM),checkRolePermission,categoryController.deleteManyCategory);

module.exports = router;
