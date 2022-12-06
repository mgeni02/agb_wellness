const nedb = require("nedb");

class AGBStaff {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  
//a function to return all staff from the database
getAllStaff() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, goals for data
      this.db.find({}, function (err, staff) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(staff);
          //to see what the returned data looks like
          console.log("function all() returns: ", staff);
        }
      });
    });
  }
   // a function to add a new employee
   addStaff(name, email, department, role) {
    //create an employee document with the data got from the add employee page
    var employee = {
      name:name,
      email:email,
      department:department,
      role:role
    };
    //use the insert() function to insert the new employee,
    //error first callback function, err for error, doc for the new employee added.
    this.db.insert(employee, function (err, doc) {
      if (err) {
        console.log("Error adding employee", name);
      } else {
        console.log("Employee inserted into the database", doc);
      }
    });
  }
  // a function to delete an employee
  removeStaff = (name, department, role) => {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the remove() function of the database to remove the found employee according to their name, department, and role attributes,
      //error first callback function, err for error, numRemoved for the total number of all employees removed from the database
      this.db.remove(
        { name:name, department:department, role:role },
        {},
        function (err, numRemoved) {
          //if error occurs reject Promise
          if (err) {
            reject(err);
          }
          //if no error resolve the promise & return the number of employees removed
          resolve(numRemoved);
          console.log("document removed", numRemoved);
        }
      );
    });
  };
  // a function to update an existing employee
  updateStaff = (name, department, role) => {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the update() function of the database to update the description of the found employee according to the name, department and role attributes,
      //error first callback function, err for error, numUpdated for the total number of all employees updated in the database
      this.db.update(
        { name:name, department:department },
        { $set: { role:role } },
        { multi: true },
        function (err, numUpdated) {
          //if error occurs reject Promise
          if (err) {
            reject(err);
          }
          //if no error resolve the promise & return the num of updated employees
          resolve(numUpdated);
          console.log("document updated", numUpdated);
        }
      );
    });
  };
  
  }
  module.exports = AGBStaff;