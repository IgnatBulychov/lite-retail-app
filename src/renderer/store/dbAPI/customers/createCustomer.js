const remote = require('electron').remote
const application = remote.app

var Datastore = require('nedb')
var db = new Datastore({ filename: `${application.getPath('userData')}/base/customers.db`})

export const createCustomerInBase = function(customer) {    
  return new Promise(function(resolve, reject){
    db.loadDatabase(function (err) { 
        db.insert(customer, function (err, newDoc) { 
          if (err) {
              reject(false)
          }
          resolve(newDoc)  
        });
    });  
  })
}
