const nedb = require("nedb");

class AGB {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  //a function to return all entries from the database
  getAllGoals() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, goals for data
      this.db.find({}, function (err, goals) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(goals);
          //to see what the returned data looks like
          console.log("function all() returns: ", goals);
        }
      });
    });
  }
  // a function to add a new Goal
  addGoal(Category, Topic, From, To, Description, Frequency) {
    //create a goal document with the data got from the add goal page
    var goal = {
      Category: Category,
      Topic: Topic,
      From: new Date().toISOString().split("T")[0],
      To: new Date().toISOString().split("T")[0],
      Description: Description,
      Frequency: Frequency,
    };
    //use the insert() function to insert the new goal,
    //error first callback function, err for error, doc for the new goal added.
    this.db.insert(goal, function (err, doc) {
      if (err) {
        console.log("Error adding the goal", Topic);
      } else {
        console.log("Goal inserted into the database", doc);
      }
    });
  }
  // a function to delete a Goal
  removeGoal = (Category, Topic) => {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the remove() function of the database to remove the found goal according to the category and topic attributes,
      //error first callback function, err for error, numRemoved for the total number of all goals removed from the database
      this.db.remove(
        { Category: Category, Topic: Topic },
        {},
        function (err, numRemoved) {
          //if error occurs reject Promise
          if (err) {
            reject(err);
          }
          //if no error resolve the promise & return the number of goals removed
          resolve(numRemoved);
          console.log("document removed", numRemoved);
        }
      );
    });
  };
  // a function to update an existing Goal
  updateGoal = (Category, Topic, Description) => {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the update() function of the database to update the description of the found goal according to the category and topic attributes,
      //error first callback function, err for error, numUpdated for the total number of all goals updated in the database
      this.db.update(
        { Category: Category, Topic: Topic},
        { $set: { Description: Description } },
        { multi: true },
        function (err, numUpdated) {
          //if error occurs reject Promise
          if (err) {
            reject(err);
          }
          //if no error resolve the promise & return the num of updated goals
          resolve(numUpdated);
          console.log("document updated", numUpdated);
        }
      );
    });
  };

}
module.exports = AGB;
