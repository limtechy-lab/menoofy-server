/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const Sequence = require('../model/sequence');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'80_2O7dJup40st6',
      'isDeleted':false,
      'email':'Eusebio_Powlowski68@hotmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'email':'Eusebio_Powlowski68@hotmail.com' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'YEIYPo3ZYeLR_GR',
      'isDeleted':false,
      'email':'Elmo_Wunsch@yahoo.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.System
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let system = await dbService.updateOne(User, { 'email':'Elmo_Wunsch@yahoo.com' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Admin', 'System_User', 'System' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/system/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/list',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/system/api/v1/category/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/system/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/count',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/category/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/item/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/system/api/v1/item/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/system/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/item/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/item/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/item/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/list',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/system/api/v1/itemcontent/:id',
        role: 'System',
        method: 'GET'
      },
      {
        route: '/system/api/v1/itemcontent/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/itemcontent/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/count',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/itemcontent/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/itemcontent/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/itemcontent/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/itemcontent/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/itemcontent/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/store/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/store/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/store/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/store/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/store/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/store/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/store/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/store/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/system/api/v1/store/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/system/api/v1/store/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/store/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/store/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/store/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/store/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/store/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/store/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/store/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/store/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/system/api/v1/store/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/store/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/user/create',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/user/addbulk',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/user/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/user/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/system/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/user/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/system/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/user/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/user/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/user/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/system/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/plan/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/plan/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/plan/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/plan/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/plan/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/plan/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/plan/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/plan/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/plan/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/plan/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/plan/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/plan/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/subscribtion/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/subscribtion/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/subscribtion/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/subscribtion/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/subscribtion/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/subscribtion/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/subscribtion/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/subscribtion/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/subscribtion/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/subscribtion/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/subscribtion/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/subscribtion/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/system/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/system/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/system/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/system/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      
      {
        route: '/admin/category/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/category/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/category/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/admin/category/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/category/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/category/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/category/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/category/update/:id',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/category/updatebulk',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/category/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/admin/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/category/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/deletemany',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/item/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/item/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/admin/item/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/item/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/item/update/:id',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/item/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/item/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/item/updatebulk',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/item/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdelete/:id',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdeletemany',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/item/delete/:id',
        role: 'System',
        method: 'DELETE' 
      },
      {
        route: '/admin/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/item/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/deletemany',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemcontent/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemcontent/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemcontent/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemcontent/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemcontent/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemcontent/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/itemcontent/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemcontent/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/itemcontent/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/admin/itemcontent/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/itemcontent/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemcontent/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/itemcontent/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemcontent/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemcontent/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/itemcontent/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/admin/itemcontent/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/itemcontent/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/itemcontent/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/admin/itemcontent/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/store/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/store/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/store/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/store/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/store/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/store/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/store/list',
        role: 'System_User',
        method: 'POST' 
      },
      // {
      //   route: '/admin/store/:id',
      //   role: 'Admin',
      //   method: 'GET' 
      // },
      {
        route: '/admin/store',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/store/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/admin/store/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/store/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/store/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/store/count',
        role: 'System_User',
        method: 'POST' 
      },
      // {
      //   route: '/admin/store/update/:id',
      //   role: 'Admin',
      //   method: 'PUT' 
      // },
      {
        route: '/admin/store/update',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/store/update/:id',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/store/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/store/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/store/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/store/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/store/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/store/updatebulk',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/store/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/store/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/store/softdelete/:id',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/store/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/store/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/store/softdeletemany',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/store/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/store/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/store/delete/:id',
        role: 'System',
        method: 'DELETE' 
      },
      {
        route: '/admin/store/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/store/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/store/deletemany',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/store/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/plan/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plan/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plan/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plan/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/plan/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plan/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/plan/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plan/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/plan/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plan/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plan/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/plan/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscribtion/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscribtion/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscribtion/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscribtion/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/subscribtion/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscribtion/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscribtion/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscribtion/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscribtion/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscribtion/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscribtion/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/subscribtion/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/item/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/list',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/itemcontent/:id',
        role: 'System',
        method: 'GET'
      },
      {
        route: '/client/api/v1/itemcontent/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/itemcontent/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/count',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemcontent/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/itemcontent/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/itemcontent/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/itemcontent/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemcontent/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/store/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/store/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/store/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/store/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/store/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/store/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/store/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/store/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/store/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/store/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/store/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/store/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/store/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/store/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/store/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/store/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/store/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/store/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/store/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/store/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/plan/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/plan/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/plan/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/plan/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/plan/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/plan/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/plan/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/plan/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/plan/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/plan/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/plan/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/plan/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/subscribtion/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/subscribtion/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/subscribtion/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/subscribtion/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/subscribtion/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/subscribtion/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/subscribtion/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/subscribtion/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/subscribtion/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/subscribtion/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/subscribtion/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/subscribtion/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Admin', 'System_User', 'System' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [
      {
      'email':'Eusebio_Powlowski68@hotmail.com',
      'password':'80_2O7dJup40st6'
    },{
      'email':'Elmo_Wunsch@yahoo.com',
      'password':'YEIYPo3ZYeLR_GR'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* seeds series data*/
async function seedSequence (){
  try {
    let allSequenceData = [
      {
        attribute: 'store_code',
        startingPoint: '20300',
        modelName: 'store'
      }
    ];
    let dbSequences = await dbService.findMany(Sequence,{});

    const newSequences = [];
    let idsToBeRemoved = [];
    let existInAllSequenceData = {};
    let existSeq = {};

    dbSequences.forEach(function (dbSeqData) {
      existInAllSequenceData = allSequenceData.find(sequence =>  sequence.modelName === dbSeqData.modelName && sequence.attribute === dbSeqData.attribute);
        
      if (!existInAllSequenceData){
        idsToBeRemoved.push(dbSeqData.id);
      }
    });

    if (idsToBeRemoved && idsToBeRemoved.length > 0){
      await dbService.deleteMany(Sequence,{ '_id':{ '$in':idsToBeRemoved } });
    }

    dbSequences = await dbService.findMany(Sequence,{});

    allSequenceData.forEach( function (seqData) {
      existSeq = dbSequences.find(dbSequence => dbSequence.modelName === seqData.modelName && dbSequence.attribute === seqData.attribute);
        
      if (!existSeq){
        newSequences.push(seqData);
      } else {
        dbService.updateOne( Sequence,{ _id: existSeq.id },{
          prefix :seqData.prefix,
          suffix: seqData.suffix,
          startingPoint : seqData.startingPoint 
        },{ new:true });
      }
    });
      
    if (newSequences && newSequences.length > 0){
      await dbService.create(Sequence,newSequences);
    }
    console.log('series seeded successfully');
  } catch (error){
    console.log('series seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
  await seedSequence();

};
module.exports = seedData;