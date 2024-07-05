const router = require("express").Router();
const {createNote,getNote,updateNote,deleteNote } = require('../controller/noteController');

router.post('/note/create',createNote);
router.get('/note/findById/:id',getNote);
router.update('/note/edit',updateNote);
router.delete('/note/delete/:id',deleteNote);



module.exports = router;