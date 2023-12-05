/**
 * PlanRoutes.js
 * @description :: CRUD API routes for Plan
 */

const express = require('express');
const router = express.Router();
const PlanController = require('../../controller/admin/PlanController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/plan/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PlanController.findAllPlan);
router.route('/admin/plan/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PlanController.getPlan);

module.exports = router;
