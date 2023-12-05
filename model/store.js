/**
 * store.js
 * @description :: model of a database collection store
 */

const mongoose = require('mongoose');
const seriesService = require('../services/seriesService');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    name:{ type:String },

    store_type:{ type:String },

    location:{ type:String },

    email:{ type:String },

    phone:{ type:String },

    logo:{ type:String },

    store_code:{ type:String },
    
    isDeleted:{ type:Boolean },

    isActive:{ type:Boolean },

    createdAt:{ type:Date },

    updatedAt:{ type:Date },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    }
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  this.store_code = await seriesService.getNextSequenceString('store','store_code');
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
      element.store_code = await seriesService.getNextSequenceString('store','store_code');
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const store = mongoose.model('store',schema);
module.exports = store;