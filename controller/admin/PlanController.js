/**
 * PlanController.js
 * @description : exports action methods for Plan.
 */

const Plan = require('../../model/Plan');
const PlanSchemaKey = require('../../utils/validation/PlanValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');

/**
 * @description : find all documents of Plan from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Plan(s). {status, message, data}
 */
const findAllPlan = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PlanSchemaKey.findFilterKeys,
      Plan.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Plan, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPlans = await dbService.paginate( Plan,query,options);
    if (!foundPlans || !foundPlans.data || !foundPlans.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPlans });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
  
/**
 * @description : find document of Plan from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Plan. {status, message, data}
 */
const getPlan = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPlan = await dbService.findOne(Plan,query, options);
    if (!foundPlan){
      return res.recordNotFound();
    }
    return res.success({ data :foundPlan });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
module.exports = {
  findAllPlan,
  getPlan,
};