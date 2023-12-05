/**
 * PlanRoutes.js
 * @description :: CRUD API routes for Plan
 */

const express = require('express');
const router = express.Router();
const PlanController = require('../../../controller/system/v1/PlanController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/system/api/v1/plan/create').post(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.addPlan);
router.route('/system/api/v1/plan/list').post(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.findAllPlan);
router.route('/system/api/v1/plan/count').post(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.getPlanCount);
router.route('/system/api/v1/plan/:id').get(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.getPlan);
router.route('/system/api/v1/plan/update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.updatePlan);    
router.route('/system/api/v1/plan/partial-update/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.partialUpdatePlan);
router.route('/system/api/v1/plan/softDelete/:id').put(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.softDeletePlan);
router.route('/system/api/v1/plan/softDeleteMany').put(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.softDeleteManyPlan);
router.route('/system/api/v1/plan/addBulk').post(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.bulkInsertPlan);
router.route('/system/api/v1/plan/updateBulk').put(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.bulkUpdatePlan);
router.route('/system/api/v1/plan/delete/:id').delete(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.deletePlan);
router.route('/system/api/v1/plan/deleteMany').post(auth(PLATFORM.SYSTEM),checkRolePermission,PlanController.deleteManyPlan);

module.exports = router;
