/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  ADMIN_SECRET:'myjwtadminsecret',
  SYSTEM_SECRET:'myjwtsystemsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  Admin:1,
  System:2,
};

const PLATFORM = {
  ADMIN:1,
  SYSTEM:2,
};

let LOGIN_ACCESS = {
  [USER_TYPES.Admin]:[PLATFORM.ADMIN],        
  [USER_TYPES.System]:[PLATFORM.SYSTEM],        
};

const DEFAULT_USER_ROLE = 'Admin';

const MAX_LOGIN_RETRY_LIMIT = 5;
const LOGIN_REACTIVE_TIME = 60;   

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  },
  EXPIRE_TIME: 15
};
const NO_OF_DEVICE_ALLOWED = 3;

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  NO_OF_DEVICE_ALLOWED,
  LOGIN_ACCESS,
  DEFAULT_USER_ROLE,
};