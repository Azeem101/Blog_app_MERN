const express = require('express');
const { getallblog, getallblogById, registerblog, updateblog, deleteblog, userblogbyid } = require('../controller/blogController');
const router = express.Router();



//GET ALL BLOGS || GET
router.get('/getallblogs', getallblog)

//GET BLOG BY ID || GET/:ID
router.get('/getblog/:id', getallblogById)

//CREATE BLOG || POST
router.post('/registerblog', registerblog)

//UPDATE BLOG || PUT
router.put('/updateblog/:id', updateblog)

//DELETE BLOG || DELETE
router.delete('/deleteblog/:id', deleteblog)


//USER BLOG || GET
router.get('/userblog/:id', userblogbyid)



module.exports = router