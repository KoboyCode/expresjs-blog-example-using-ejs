const express = require('express');
const db = require('../database/models')
const Blogs = db.Blogs;
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
    const data = { 
        title: 'Express', 
        result: await Blogs.findAndCountAll()
    }
    res.render('index', data );
});

module.exports = router;
