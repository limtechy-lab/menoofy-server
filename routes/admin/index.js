/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./PlanRoutes'));
router.use(require('./subscribtionRoutes'));
router.use(require('./itemRoutes'));
router.use(require('./itemContentRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./storeRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
