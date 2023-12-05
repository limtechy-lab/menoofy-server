/**
 * storeRoutes.js
 * @description :: CRUD API routes for store
 */

const express = require('express');
const router = express.Router();
const storeController = require('../../../controller/client/v1/storeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/store/list').post(storeController.findAllStore);
router.route('/client/api/v1/store/:id').get(storeController.getStore);

module.exports = router;
