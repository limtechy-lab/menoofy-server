/**
 * storeValidation.js
 * @description :: validate each post and put request as per store model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of store */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  store_type: joi.string().allow(null).allow(''),
  location: joi.string().allow(null).allow(''),
  email: joi.string().email().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  logo: joi.string().allow(null).allow(''),
  store_code: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of store for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  store_type: joi.string().allow(null).allow(''),
  location: joi.string().allow(null).allow(''),
  email: joi.string().email().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  logo: joi.string().allow(null).allow(''),
  store_code: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of store for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      store_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      location: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string().email(),joi.object()),
      phone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      logo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      store_code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
