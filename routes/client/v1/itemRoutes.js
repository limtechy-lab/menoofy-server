/**
 * itemRoutes.js
 * @description :: CRUD API routes for item
 */

const express = require('express');
const router = express.Router();
const itemController = require('../../../controller/client/v1/itemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/item/list').post(itemController.findAllItem);
router.route('/client/api/v1/item/count').post(itemController.getItemCount);
router.route('/client/api/v1/item/:id').get(itemController.getItem);

module.exports = router;
