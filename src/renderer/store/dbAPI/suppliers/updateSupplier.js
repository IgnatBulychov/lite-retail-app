const remote = require('electron').remote
const application = remote.app

var Datastore = require('nedb')
var db = new Datastore({ filename: `${application.getPath('userData')}/base/suppliers.db`})

export const updateSupplierInBase = function(supplier) {  
  return new Promise(function(resolve, reject){
    db.loadDatabase(function (err) { 
      db.update({ _id: supplier._id }, { $set: { 
            name: supplier.name,
            vatin: supplier.vatin,
            phones: supplier.phones,
          } }, { multi: true }, function (err, numReplaced) {
          if (err) {
              reject(false)
          }
          resolve(numReplaced)  
      });
    });    
  })
}
  
