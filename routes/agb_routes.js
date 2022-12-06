const express = require('express');
const router = express.Router();
const {login} = require('../auth/auth');
const {verify} = require('../auth/auth');
const controller = require('../controllers/agbcontrollers.js');

router.get("/", controller.landing_page);
router.get('/view', verify, controller.views_page);
router.get("/addGoal", verify, controller.new_goal );
router.post('/addGoal', controller.post_new_goal);
router.get('/deleteGoal',verify,  controller.delete_goal);
router.post('/deleteGoal', controller.post_delete_goal);
router.get('/updateGoal',verify, controller.update_goal);
router.post('/updateGoal', controller.post_update_goal);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get('/login', controller.show_login_page);
router.post('/login', login, controller.handle_login);
router.get('/manager', verify, controller.is_manager);
router.post('/manager', controller.post_is_manager);
router.get("/staff", verify, controller.viewstaff_page);
router.get("/addStaff", verify, controller.new_staff );
router.post('/addStaff', controller.post_new_staff);
router.get('/deleteStaff', verify, controller.delete_staff);
router.post('/deleteStaff', controller.post_delete_staff);
router.get('/updateStaff',verify, controller.update_staff);
router.post('/updateStaff', controller.post_update_staff);
router.get('/services', verify, controller.services_page);
router.get("/loggedIn",verify, controller.loggedIn_landing);
router.get("/logout",verify, controller.logout);



router.use(function(req, res) {
            res.status(404);
            res.type('text/plain');
            res.send('404 Not found.');
            })

router.use(function(err, req, res, next) {
                res.status(500);
                res.type('text/plain');
                res.send('Internal Server Error.');
                })
module.exports = router; 
