/**
 * storeController.js
 * @description : exports action methods for store.
 */

const Store = require('../../../model/store');
const storeSchemaKey = require('../../../utils/validation/storeValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of Store from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Store(s). {status, message, data}
 */
const findAllStore = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      storeSchemaKey.findFilterKeys,
      Store.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Store, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundStores = await dbService.paginate( Store,query,options);
    if (!foundStores || !foundStores.data || !foundStores.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundStores });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Store from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Store. {status, message, data}
 */
const getStore = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { store_code: req.params.id };
    let options = {};
    let foundStore = await dbService.findOne(Store,query, options);
    if (!foundStore){
      return res.recordNotFound();
    }
    return res.success({ data :foundStore });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  findAllStore,
  getStore  
};