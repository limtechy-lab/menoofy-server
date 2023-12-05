/**
 * categoryRoutes.js
 * @description :: CRUD API routes for category
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../../../controller/client/v1/categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/category/list').post(categoryController.findAllCategory);
router.route('/client/api/v1/category/count').post(categoryController.getCategoryCount);
router.route('/client/api/v1/category/:id').get(categoryController.getCategory);

module.exports = router;
