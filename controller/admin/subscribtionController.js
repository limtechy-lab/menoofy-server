/**
 * subscribtionController.js
 * @description : exports action methods for subscribtion.
 */

const Subscribtion = require('../../model/subscribtion');
const subscribtionSchemaKey = require('../../utils/validation/subscribtionValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
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
 * @description : deactivate document of Subscribtion from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Subscribtion.
 * @return {Object} : deactivated Subscribtion. {status, message, data}
 */
const cancelSubscribtion = async (req,res) => {
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

module.exports = {
  addSubscribtion,
  getSubscribtion,
  cancelSubscribtion,
};