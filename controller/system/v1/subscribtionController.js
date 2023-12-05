/**
 * subscribtionController.js
 * @description : exports action methods for subscribtion.
 */

const Subscribtion = require('../../../model/subscribtion');
const subscribtionSchemaKey = require('../../../utils/validation/subscribtionValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Subscribtion in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Subscribtion. {status, message, data}
 */ 
const addSubscribtion = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      subscribtionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Subscribtion(dataToCreate);
    let createdSubscribtion = await dbService.create(Subscribtion,dataToCreate);
    return res.success({ data : createdSubscribtion });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Subscribtion in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Subscribtions. {status, message, data}
 */
const bulkInsertSubscribtion = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdSubscribtions = await dbService.create(Subscribtion,dataToCreate);
    createdSubscribtions = { count: createdSubscribtions ? createdSubscribtions.length : 0 };
    return res.success({ data:{ count:createdSubscribtions.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Subscribtion from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Subscribtion(s). {status, message, data}
 */
const findAllSubscribtion = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      subscribtionSchemaKey.findFilterKeys,
      Subscribtion.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Subscribtion, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundSubscribtions = await dbService.paginate( Subscribtion,query,options);
    if (!foundSubscribtions || !foundSubscribtions.data || !foundSubscribtions.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundSubscribtions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Subscribtion from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Subscribtion. {status, message, data}
 */
const getSubscribtion = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundSubscribtion = await dbService.findOne(Subscribtion,query, options);
    if (!foundSubscribtion){
      return res.recordNotFound();
    }
    return res.success({ data :foundSubscribtion });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Subscribtion.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getSubscribtionCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      subscribtionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedSubscribtion = await dbService.count(Subscribtion,where);
    return res.success({ data : { count: countedSubscribtion } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Subscribtion with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Subscribtion.
 * @return {Object} : updated Subscribtion. {status, message, data}
 */
const updateSubscribtion = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      subscribtionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSubscribtion = await dbService.updateOne(Subscribtion,query,dataToUpdate);
    if (!updatedSubscribtion){
      return res.recordNotFound();
    }
    return res.success({ data :updatedSubscribtion });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Subscribtion with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Subscribtions.
 * @return {Object} : updated Subscribtions. {status, message, data}
 */
const bulkUpdateSubscribtion = async (req,res)=>{
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
    let updatedSubscribtion = await dbService.updateMany(Subscribtion,filter,dataToUpdate);
    if (!updatedSubscribtion){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedSubscribtion } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Subscribtion with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Subscribtion.
 * @return {obj} : updated Subscribtion. {status, message, data}
 */
const partialUpdateSubscribtion = async (req,res) => {
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
      subscribtionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSubscribtion = await dbService.updateOne(Subscribtion, query, dataToUpdate);
    if (!updatedSubscribtion) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSubscribtion });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Subscribtion from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Subscribtion.
 * @return {Object} : deactivated Subscribtion. {status, message, data}
 */
const softDeleteSubscribtion = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedSubscribtion = await dbService.updateOne(Subscribtion, query, updateBody);
    if (!updatedSubscribtion){
      return res.recordNotFound();
    }
    return res.success({ data:updatedSubscribtion });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Subscribtion from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Subscribtion. {status, message, data}
 */
const deleteSubscribtion = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedSubscribtion = await dbService.deleteOne(Subscribtion, query);
    if (!deletedSubscribtion){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSubscribtion });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Subscribtion in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManySubscribtion = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedSubscribtion = await dbService.deleteMany(Subscribtion,query);
    if (!deletedSubscribtion){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedSubscribtion } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Subscribtion from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Subscribtion.
 * @return {Object} : number of deactivated documents of Subscribtion. {status, message, data}
 */
const softDeleteManySubscribtion = async (req,res) => {
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
    let updatedSubscribtion = await dbService.updateMany(Subscribtion,query, updateBody);
    if (!updatedSubscribtion) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedSubscribtion } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addSubscribtion,
  bulkInsertSubscribtion,
  findAllSubscribtion,
  getSubscribtion,
  getSubscribtionCount,
  updateSubscribtion,
  bulkUpdateSubscribtion,
  partialUpdateSubscribtion,
  softDeleteSubscribtion,
  deleteSubscribtion,
  deleteManySubscribtion,
  softDeleteManySubscribtion    
};