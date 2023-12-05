/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use(require('./itemRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./storeRoutes'));
// router.use(require('./userRoutes'));

module.exports = router;
