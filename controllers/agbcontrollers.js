const { response } = require("express");
const AGBDAO = require("../Models/agbModel");
const AGBStaff = require("../Models/staffModel");
const userDao = require("../Models/userModel");
// the database is in embeded mode as we have added the filename to the constructor.
const db = new AGBDAO("goals.db");
const staff_db= new AGBStaff("staff.db");


exports.landing_page = function (req, res) {
  res.render("landingPage");
};

exports.post_new_user = function(req,res) {
  const user = req.body.username;
  const password = req.body.pass;
  if(!user || !password) {
      res.send(401, 'no user or no password');
      return;
  }
  userDao.lookup(user, function(err,u) {
      if(u) {
          res.send(401, "User exists:", user);
          return;
      }
      userDao.create(user,password);
      console.log("register user", user, "password", password);
      res.redirect('/login');
  });
}
exports.show_login_page = function (req, res) {
  res.render("user/login");
};
exports.handle_login = function (req, res) {
  res.render("services",{
    user: 'user'
  });
};
exports.loggedIn_landing = function (req, res) {
  res.render("landingPage", {
  user: "user"
  });
  };
exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};

exports.services_page = function (req, res) {
  res.render("services", {
    user: 'user'
  });  
};
//shows all the goals of the user
exports.views_page = function (req, res) {
  db.getAllGoals()
    .then((list) => {
      res.render("goals_list", {
        user: 'user',
        entries: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

// renders the add goal form
exports.new_goal = function (req, res) {
  res.render("newGoal");
};
// adds the new goal entry to the database
exports.post_new_goal = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.Topic) {
    response.status(400).send("Goals must have a name.");
    return;
  }
  db.addGoal(
    req.body.Category,
    req.body.Topic,
    req.body.From,
    req.body.To,
    req.body.Description,
    req.body.Frequency
  );
  res.redirect("/view");
};
// renders the delete goal form
exports.delete_goal = function (req, res) {
  res.render("deleteGoal", {
    title: "Delete Goal",
  });
};
// deletes the specified goal from the database
exports.post_delete_goal = function (req, res) {
  console.log("Starting delete goal controller");
  if (!req.body.Topic) {
    response.status(400).send("Enter the goal name");
  }
  db.removeGoal(req.body.Category, req.body.Topic);
  res.redirect("/view");
};
// renders the update goal form
exports.update_goal = function (req, res) {
  res.render("updateGoal", {
  });
};
// updates the changed input of a particular goal in the database.
exports.post_update_goal = function (req, res) {
  console.log("Starting update goal controller");
  if (!req.body.Topic) {
    response.status(400).send("Enter the goal name");
  }
  db.updateGoal(req.body.Category, req.body.Topic, req.body.Description);
  res.redirect("/view");
};
exports.show_register_page = function (req, res) {
  res.render("user/register");
};

//____________Manager's extra funtions___________

//Prompt user if he is a manager
exports.is_manager= function (req,res){
  res.render("manager");
};
exports.post_is_manager= function(req,res){
  let isManager = req.body.role;
  if(isManager === "manager"){
    res.redirect('/staff');
    console.log("You can now see Staff list");
  };
  res.redirect('/loggedIn');
  console.log("Access denied, you are not a Manager");
};

//shows all the staff list
exports.viewstaff_page = function (req, res) {
  staff_db.getAllStaff()
    .then((list) => {
      res.render("staffList", {
        user: 'user',
        employees: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

//add staff
//renders the add staff page
exports.new_staff = function (req, res) {
  res.render("addStaff");
};
// adds the new staff entry to the database
exports.post_new_staff = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.name) {
    response.status(400).send("Employees must have a name.");
    return;
  }
  staff_db.addStaff(
    req.body.name,
    req.body.email,
    req.body.department,
    req.body.role,
  );
  res.redirect("/staff");
};
// renders the delete employee form
exports.delete_staff = function (req, res) {
  res.render("deleteStaff");
};
// deletes the specified employee from the database
exports.post_delete_staff = function (req, res) {
  console.log("Starting delete staff controller");
  if (!req.body.name) {
    response.status(400).send("Enter the employee name");
  }
  staff_db.removeStaff(req.body.name, req.body.department, req.body.role)
  res.redirect("/staff");
};
// renders the update employee form
exports.update_staff = function (req, res) {
  res.render("updateStaff");
};
// updates the changed input of a particular employee in the database.
exports.post_update_staff = function (req, res) {
  console.log("Starting update employee controller");
  if (!req.body.name) {
    response.status(400).send("Enter the employee's name");
  }
  staff_db.updateStaff(req.body.name, req.body.department, req.body.role)
  res.redirect("/staff");
};
