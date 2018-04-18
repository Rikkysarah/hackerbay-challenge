const express = require('express');
const router = express.Router();

const apiRoutes = require('./api/index');

router.get('/', (req, res) => {
    res.json({status: 200, message:'Welcome'});
});

router.use('/', apiRoutes);
module.exports = router;