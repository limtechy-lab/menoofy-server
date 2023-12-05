/**
 * itemContentController.js
 * @description : exports action methods for itemContent.
 */

const ItemContent = require('../../../model/itemContent');
const itemContentSchemaKey = require('../../../utils/validation/itemContentValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of ItemContent from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found ItemContent(s). {status, message, data}
 */
const findAllItemContent = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      itemContentSchemaKey.findFilterKeys,
      ItemContent.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(ItemContent, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundItemContents = await dbService.paginate( ItemContent,query,options);
    if (!foundItemContents || !foundItemContents.data || !foundItemContents.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundItemContents });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of ItemContent from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found ItemContent. {status, message, data}
 */
const getItemContent = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundItemContent = await dbService.findOne(ItemContent,query, options);
    if (!foundItemContent){
      return res.recordNotFound();
    }
    return res.success({ data :foundItemContent });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of ItemContent.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getItemContentCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      itemContentSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedItemContent = await dbService.count(ItemContent,where);
    return res.success({ data : { count: countedItemContent } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of ItemContent with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ItemContent.
 * @return {Object} : updated ItemContent. {status, message, data}
 */
const updateItemContent = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      itemContentSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItemContent = await dbService.updateOne(ItemContent,query,dataToUpdate);
    if (!updatedItemContent){
      return res.recordNotFound();
    }
    return res.success({ data :updatedItemContent });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of ItemContent with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated ItemContents.
 * @return {Object} : updated ItemContents. {status, message, data}
 */
const bulkUpdateItemContent = async (req,res)=>{
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
    let updatedItemContent = await dbService.updateMany(ItemContent,filter,dataToUpdate);
    if (!updatedItemContent){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedItemContent } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of ItemContent with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated ItemContent.
 * @return {obj} : updated ItemContent. {status, message, data}
 */
const partialUpdateItemContent = async (req,res) => {
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
      itemContentSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItemContent = await dbService.updateOne(ItemContent, query, dataToUpdate);
    if (!updatedItemContent) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedItemContent });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of ItemContent from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of ItemContent.
 * @return {Object} : deactivated ItemContent. {status, message, data}
 */
const softDeleteItemContent = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedItemContent = await dbService.updateOne(ItemContent, query, updateBody);
    if (!updatedItemContent){
      return res.recordNotFound();
    }
    return res.success({ data:updatedItemContent });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of ItemContent from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted ItemContent. {status, message, data}
 */
const deleteItemContent = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedItemContent = await dbService.deleteOne(ItemContent, query);
    if (!deletedItemContent){
      return res.recordNotFound();
    }
    return res.success({ data :deletedItemContent });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of ItemContent in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyItemContent = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedItemContent = await dbService.deleteMany(ItemContent,query);
    if (!deletedItemContent){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedItemContent } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of ItemContent from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of ItemContent.
 * @return {Object} : number of deactivated documents of ItemContent. {status, message, data}
 */
const softDeleteManyItemContent = async (req,res) => {
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
    let updatedItemContent = await dbService.updateMany(ItemContent,query, updateBody);
    if (!updatedItemContent) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedItemContent } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  findAllItemContent,
  getItemContent,
  getItemContentCount,
  updateItemContent,
  bulkUpdateItemContent,
  partialUpdateItemContent,
  softDeleteItemContent,
  deleteItemContent,
  deleteManyItemContent,
  softDeleteManyItemContent    
};