/**
 * storeController.js
 * @description : exports action methods for store.
 */

const Store = require('../../model/store');
const User = require('../../model/user');
const storeSchemaKey = require('../../utils/validation/storeValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Store in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Store. {status, message, data}
 */ 
const addStore = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      storeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = { addedBy: req.user.id };
    let existingStore = await dbService.findOne(Store,query);
    if (existingStore) {
      return res.validationError({ message : `You have an existing kitchen, ${existingStore.name}` });
    }

    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Store(dataToCreate);
    let createdStore = await dbService.create(Store,dataToCreate);
    await dbService.updateOne(User, {_id: req.user.id}, {isStoreAdded: true} )
    return res.success({ data : createdStore });
  } catch (error) {
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
    let query = {
      addedBy: req.user.id,
      isActive: true,
      isDeleted: false
    };
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

    const query = {
      addedBy: req.user.id,
      isActive: true,
      isDeleted: false
    };
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
 * @description : deactivate document of Store from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Store.
 * @return {Object} : deactivated Store. {status, message, data}
 */
const softDeleteStore = async (req,res) => {
  try {
    let query = {
      addedBy: req.user.id,
      isActive: true,
      isDeleted: false
    };
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
    let query = {
      addedBy: req.user.id,
      isActive: true,
      isDeleted: false
    };
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

module.exports = {
  addStore,
  getStore,
  updateStore,
  softDeleteStore,
  deleteStore,
  
  // bulkInsertStore,
  // findAllStore,
  // getStoreCount,
  // bulkUpdateStore,
  // partialUpdateStore,
  // deleteManyStore,
  // softDeleteManyStore    
};