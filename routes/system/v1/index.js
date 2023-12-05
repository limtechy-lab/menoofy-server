/**
 * index.js
 * @description :: index route file of system platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/system/auth',require('./auth'));
router.use(require('./PlanRoutes'));
router.use(require('./subscribtionRoutes'));
router.use(require('./itemRoutes'));
router.use(require('./itemContentRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./storeRoutes'));
router.use(require('./userRoutes'));

module.exports = router;
