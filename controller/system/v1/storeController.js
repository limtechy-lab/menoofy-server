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
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
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
    
/**
 * @description : returns total number of documents of Store.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getStoreCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      storeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedStore = await dbService.count(Store,where);
    return res.success({ data : { count: countedStore } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Store with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Store.
 * @return {Object} : updated Store. {status, message, data}
 */
const updateStore = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      storeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedStore = await dbService.updateOne(Store,query,dataToUpdate);
    if (!updatedStore){
      return res.recordNotFound();
    }
    return res.success({ data :updatedStore });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Store with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Stores.
 * @return {Object} : updated Stores. {status, message, data}
 */
const bulkUpdateStore = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedStore = await dbService.updateMany(Store,filter,dataToUpdate);
    if (!updatedStore){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedStore } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Store with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Store.
 * @return {obj} : updated Store. {status, message, data}
 */
const partialUpdateStore = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      storeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedStore = await dbService.updateOne(Store, query, dataToUpdate);
    if (!updatedStore) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedStore });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Store from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Store.
 * @return {Object} : deactivated Store. {status, message, data}
 */
const softDeleteStore = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedStore = await deleteDependentService.softDeleteStore(query, updateBody);
    if (!updatedStore){
      return res.recordNotFound();
    }
    return res.success({ data:updatedStore });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Store from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Store. {status, message, data}
 */
const deleteStore = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedStore;
    if (req.body.isWarning) { 
      deletedStore = await deleteDependentService.countStore(query);
    } else {
      deletedStore = await deleteDependentService.deleteStore(query);
    }
    if (!deletedStore){
      return res.recordNotFound();
    }
    return res.success({ data :deletedStore });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Store in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyStore = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedStore;
    if (req.body.isWarning) {
      deletedStore = await deleteDependentService.countStore(query);
    }
    else {
      deletedStore = await deleteDependentService.deleteStore(query);
    }
    if (!deletedStore){
      return res.recordNotFound();
    }
    return res.success({ data :deletedStore });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Store from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Store.
 * @return {Object} : number of deactivated documents of Store. {status, message, data}
 */
const softDeleteManyStore = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedStore = await deleteDependentService.softDeleteStore(query, updateBody);
    if (!updatedStore) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedStore });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  findAllStore,
  getStore,
  getStoreCount,
  updateStore,
  bulkUpdateStore,
  partialUpdateStore,
  softDeleteStore,
  deleteStore,
  deleteManyStore,
  softDeleteManyStore    
};