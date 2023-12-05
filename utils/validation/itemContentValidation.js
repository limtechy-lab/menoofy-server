/**
 * itemContentValidation.js
 * @description :: validate each post and put request as per itemContent model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of itemContent */
exports.schemaKeys = joi.object({
  store_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  name: joi.string().required(),
  varient: joi.string().allow(null).allow(''),
  price: joi.number().integer().required(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of itemContent for updation */
exports.updateSchemaKeys = joi.object({
  store_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  name: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  varient: joi.string().allow(null).allow(''),
  price: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of itemContent for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      store_id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      varient: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
