const cron = require('node-cron');

let CloseMenu = cron.schedule('* */5 * * *', () => { 
  try {
    //Do something here
  } catch (error) {
    throw error;        
  }
});   

CloseMenu.start();
