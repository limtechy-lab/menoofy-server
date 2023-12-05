/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Plan = require('../model/Plan');
let Subscribtion = require('../model/subscribtion');
let Item = require('../model/item');
let ItemContent = require('../model/itemContent');
let Category = require('../model/category');
let Store = require('../model/store');
let User = require('../model/user');
let PushNotification = require('../model/pushNotification');
let UserTokens = require('../model/userTokens');
let ActivityLog = require('../model/activityLog');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deletePlan = async (filter) =>{
  try {
    let plan = await dbService.findMany(Plan,filter);
    if (plan && plan.length){
      plan = plan.map((obj) => obj.id);

      const subscribtionFilter = { $or: [{ plan_id : { $in : plan } }] };
      const subscribtionCnt = await dbService.deleteMany(Subscribtion,subscribtionFilter);

      let deleted  = await dbService.deleteMany(Plan,filter);
      let response = { subscribtion :subscribtionCnt, };
      return response; 
    } else {
      return {  plan : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSubscribtion = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Subscribtion,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItem = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Item,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItemContent = async (filter) =>{
  try {
    let item = await dbService.findMany(ItemContent,filter);
    if (item && item.length){
      item = item.map((obj) => obj.id);

      const itemFilter = { $or: [{ 'content_list.content_id': { $in: item } },] };
      const itemToRemove = { $pull: { content_list: { content_id: { $in: item } } } };
      const itemCnt = await dbService.updateMany(Item,itemFilter,itemToRemove);

      console.log(itemCnt);

      let deleted  = await dbService.deleteMany(ItemContent,filter);
      let response = { item :itemCnt, };
      return response; 
    } else {
      return {  item : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const itemFilter = { $or: [{ category_id : { $in : category } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      let deleted  = await dbService.deleteMany(Category,filter);
      let response = { item :itemCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteStore = async (filter) =>{
  try {
    let store = await dbService.findMany(Store,filter);
    if (store && store.length){
      store = store.map((obj) => obj.id);

      const categoryFilter = { $or: [{ store_id : { $in : store } }] };
      const categoryCnt = await dbService.deleteMany(Category,categoryFilter);

      let deleted  = await dbService.deleteMany(Store,filter);
      let response = { category :categoryCnt, };
      return response; 
    } else {
      return {  store : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const PlanFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PlanCnt = await dbService.deleteMany(Plan,PlanFilter);

      const subscribtionFilter = { $or: [{ user_id : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const subscribtionCnt = await dbService.deleteMany(Subscribtion,subscribtionFilter);

      const itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      const itemContentFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemContentCnt = await dbService.deleteMany(ItemContent,itemContentFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt = await dbService.deleteMany(Category,categoryFilter);

      const storeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const storeCnt = await dbService.deleteMany(Store,storeFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        Plan :PlanCnt,
        subscribtion :subscribtionCnt,
        item :itemCnt,
        itemContent :itemContentCnt,
        category :categoryCnt,
        store :storeCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deletePushNotification = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(PushNotification,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteActivityLog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ActivityLog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlan = async (filter) =>{
  try {
    let plan = await dbService.findMany(Plan,filter);
    if (plan && plan.length){
      plan = plan.map((obj) => obj.id);

      const subscribtionFilter = { $or: [{ plan_id : { $in : plan } }] };
      const subscribtionCnt =  await dbService.count(Subscribtion,subscribtionFilter);

      let response = { subscribtion : subscribtionCnt, };
      return response; 
    } else {
      return {  plan : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countSubscribtion = async (filter) =>{
  try {
    const subscribtionCnt =  await dbService.count(Subscribtion,filter);
    return { subscribtion : subscribtionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countItem = async (filter) =>{
  try {
    const itemCnt =  await dbService.count(Item,filter);
    return { item : itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countItemContent = async (filter) =>{
  try {
    let itemContent = await dbService.findMany(ItemContent,filter);
    if (itemContent && itemContent.length){
      itemContent = itemContent.map((obj) => obj.id);

      const itemFilter = { $or: [{ 'item_content.content_id': { $in: itemContent } },] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      let response = { item : itemCnt, };
      return response; 
    } else {
      return {  itemContent : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const itemFilter = { $or: [{ category_id : { $in : category } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      let response = { item : itemCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countStore = async (filter) =>{
  try {
    let store = await dbService.findMany(Store,filter);
    if (store && store.length){
      store = store.map((obj) => obj.id);

      const categoryFilter = { $or: [{ store_id : { $in : store } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      let response = { category : categoryCnt, };
      return response; 
    } else {
      return {  store : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const PlanFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PlanCnt =  await dbService.count(Plan,PlanFilter);

      const subscribtionFilter = { $or: [{ user_id : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const subscribtionCnt =  await dbService.count(Subscribtion,subscribtionFilter);

      const itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      const itemContentFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemContentCnt =  await dbService.count(ItemContent,itemContentFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      const storeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const storeCnt =  await dbService.count(Store,storeFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        Plan : PlanCnt,
        subscribtion : subscribtionCnt,
        item : itemCnt,
        itemContent : itemContentCnt,
        category : categoryCnt,
        store : storeCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPushNotification = async (filter) =>{
  try {
    const pushNotificationCnt =  await dbService.count(PushNotification,filter);
    return { pushNotification : pushNotificationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countActivityLog = async (filter) =>{
  try {
    const activityLogCnt =  await dbService.count(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlan = async (filter,updateBody) =>{  
  try {
    let plan = await dbService.findMany(Plan,filter, { id:1 });
    if (plan.length){
      plan = plan.map((obj) => obj.id);

      const subscribtionFilter = { '$or': [{ plan_id : { '$in' : plan } }] };
      const subscribtionCnt = await dbService.updateMany(Subscribtion,subscribtionFilter,updateBody);
      let updated = await dbService.updateMany(Plan,filter,updateBody);

      let response = { subscribtion :subscribtionCnt, };
      return response;
    } else {
      return {  plan : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSubscribtion = async (filter,updateBody) =>{  
  try {
    const subscribtionCnt =  await dbService.updateMany(Subscribtion,filter);
    return { subscribtion : subscribtionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItem = async (filter,updateBody) =>{  
  try {
    const itemCnt =  await dbService.updateMany(Item,filter);
    return { item : itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItemContent = async (filter,updateBody) =>{  
  try {
    const itemContentCnt =  await dbService.updateMany(ItemContent,filter);
    return { itemContent : itemContentCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategory = async (filter,updateBody) =>{  
  try {
    let category = await dbService.findMany(Category,filter, { id:1 });
    if (category.length){
      category = category.map((obj) => obj.id);

      const itemFilter = { '$or': [{ category_id : { '$in' : category } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);
      let updated = await dbService.updateMany(Category,filter,updateBody);

      let response = { item :itemCnt, };
      return response;
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteStore = async (filter,updateBody) =>{  
  try {
    let store = await dbService.findMany(Store,filter, { id:1 });
    if (store.length){
      store = store.map((obj) => obj.id);

      const categoryFilter = { '$or': [{ store_id : { '$in' : store } }] };
      const categoryCnt = await dbService.updateMany(Category,categoryFilter,updateBody);
      let updated = await dbService.updateMany(Store,filter,updateBody);

      let response = { category :categoryCnt, };
      return response;
    } else {
      return {  store : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const PlanFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const PlanCnt = await dbService.updateMany(Plan,PlanFilter,updateBody);

      const subscribtionFilter = { '$or': [{ user_id : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const subscribtionCnt = await dbService.updateMany(Subscribtion,subscribtionFilter,updateBody);

      const itemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);

      const itemContentFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const itemContentCnt = await dbService.updateMany(ItemContent,itemContentFilter,updateBody);

      const categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const categoryCnt = await dbService.updateMany(Category,categoryFilter,updateBody);

      const storeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const storeCnt = await dbService.updateMany(Store,storeFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        Plan :PlanCnt,
        subscribtion :subscribtionCnt,
        item :itemCnt,
        itemContent :itemContentCnt,
        category :categoryCnt,
        store :storeCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePushNotification = async (filter,updateBody) =>{  
  try {
    const pushNotificationCnt =  await dbService.updateMany(PushNotification,filter);
    return { pushNotification : pushNotificationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteActivityLog = async (filter,updateBody) =>{  
  try {
    const activityLogCnt =  await dbService.updateMany(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deletePlan,
  deleteSubscribtion,
  deleteItem,
  deleteItemContent,
  deleteCategory,
  deleteStore,
  deleteUser,
  deletePushNotification,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countPlan,
  countSubscribtion,
  countItem,
  countItemContent,
  countCategory,
  countStore,
  countUser,
  countPushNotification,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeletePlan,
  softDeleteSubscribtion,
  softDeleteItem,
  softDeleteItemContent,
  softDeleteCategory,
  softDeleteStore,
  softDeleteUser,
  softDeletePushNotification,
  softDeleteUserTokens,
  softDeleteActivityLog,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
