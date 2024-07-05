const router = require("express").Router();
const {createSharedNote} = require('../controller/sharedController');

router.post('/share/note',createSharedNote);



module.exports = router;