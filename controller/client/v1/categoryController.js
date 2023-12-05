/**
 * categoryController.js
 * @description : exports action methods for category.
 */

const Category = require('../../../model/category');
const categorySchemaKey = require('../../../utils/validation/categoryValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of Category from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Category(s). {status, message, data}
 */
const findAllCategory = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      categorySchemaKey.findFilterKeys,
      Category.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Category, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundCategorys = await dbService.paginate( Category,query,options);
    if (!foundCategorys || !foundCategorys.data || !foundCategorys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundCategorys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Category from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Category. {status, message, data}
 */
const getCategory = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCategory = await dbService.findOne(Category,query, options);
    if (!foundCategory){
      return res.recordNotFound();
    }
    return res.success({ data :foundCategory });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Category.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getCategoryCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      categorySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCategory = await dbService.count(Category,where);
    return res.success({ data : { count: countedCategory } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  findAllCategory,
  getCategory,
  getCategoryCount    
};