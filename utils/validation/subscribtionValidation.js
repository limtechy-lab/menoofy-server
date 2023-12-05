/**
 * subscribtionValidation.js
 * @description :: validate each post and put request as per subscribtion model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of subscribtion */
exports.schemaKeys = joi.object({
  user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  plan_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  start_date: joi.date().options({ convert: true }).allow(null).allow(''),
  end_date: joi.date().options({ convert: true }).allow(null).allow(''),
  isExpired: joi.boolean(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of subscribtion for updation */
exports.updateSchemaKeys = joi.object({
  user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  plan_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  start_date: joi.date().options({ convert: true }).allow(null).allow(''),
  end_date: joi.date().options({ convert: true }).allow(null).allow(''),
  isExpired: joi.boolean(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of subscribtion for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      user_id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      plan_id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      start_date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      end_date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isExpired: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
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
