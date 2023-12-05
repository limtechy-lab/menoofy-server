/**
 * PlanValidation.js
 * @description :: validate each post and put request as per Plan model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Plan */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  product_id: joi.string().allow(null).allow(''),
  duration: joi.number().integer().allow(0),
  price: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Plan for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  product_id: joi.string().allow(null).allow(''),
  duration: joi.number().integer().allow(0),
  price: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Plan for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      product_id: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      duration: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      price: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
