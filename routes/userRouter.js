const router = require("express").Router();
const {createUser,getUserByEmail,userLogin,} = require('../controller/userController');

router.post('/user/create',createUser);
router.get('/user/findUserByEmail/:email',getUserByEmail);
router.post('/user/login',userLogin);


module.exports = router;