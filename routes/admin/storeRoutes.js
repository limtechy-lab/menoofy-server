/**
 * storeRoutes.js
 * @description :: CRUD API routes for store
 */

const express = require('express');
const router = express.Router();
const storeController = require('../../controller/admin/storeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/store/create').post(auth(PLATFORM.ADMIN),checkRolePermission,storeController.addStore);
router.route('/admin/store').get(auth(PLATFORM.ADMIN),checkRolePermission,storeController.getStore);
router.route('/admin/store/update').put(auth(PLATFORM.ADMIN),checkRolePermission,storeController.updateStore);    
router.route('/admin/store/softDelete').put(auth(PLATFORM.ADMIN),checkRolePermission,storeController.softDeleteStore);
router.route('/admin/store/delete').delete(auth(PLATFORM.ADMIN),checkRolePermission,storeController.deleteStore);

// router.route('/admin/store/partial-update').put(auth(PLATFORM.ADMIN),checkRolePermission,storeController.partialUpdateStore);
// router.route('/admin/store/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,storeController.bulkInsertStore);
// router.route('/admin/store/list').post(auth(PLATFORM.ADMIN),checkRolePermission,storeController.findAllStore);
// router.route('/admin/store/count').post(auth(PLATFORM.ADMIN),checkRolePermission,storeController.getStoreCount);
// router.route('/admin/store/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,storeController.bulkUpdateStore);
// router.route('/admin/store/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,storeController.softDeleteManyStore);
// router.route('/admin/store/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,storeController.deleteManyStore);

module.exports = router;
