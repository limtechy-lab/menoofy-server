/**
 * storeRoutes.js
 * @description :: CRUD API routes for store
 */

const express = require('express');
const router = express.Router();
const storeController = require('../../../controller/system/v1/storeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/system/api/v1/store/list').post(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.findAllStore);
router.route('/system/api/v1/store/count').post(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.getStoreCount);
router.route('/system/api/v1/store/:id').get(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.getStore);
router.route('/system/api/v1/store/update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.updateStore);    
router.route('/system/api/v1/store/partial-update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.partialUpdateStore);
router.route('/system/api/v1/store/updateBulk').put(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.bulkUpdateStore);
router.route('/system/api/v1/store/softDelete/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.softDeleteStore);
router.route('/system/api/v1/store/softDeleteMany').put(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.softDeleteManyStore);
router.route('/system/api/v1/store/delete/:id').delete(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.deleteStore);
router.route('/system/api/v1/store/deleteMany').post(auth(PLATFORM.SYSTEM),checkRolePermission,storeController.deleteManyStore);

module.exports = router;
