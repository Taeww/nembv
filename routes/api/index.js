const router = require('express').Router();

const test = require('./test');

router.all('*', (req, res, next) => {
    console.log(req.path + ' welcome to api');

    next();
});

router.use('/test', test);

router.all('*', (req, res) => {
    res.status(404).send({ success: false, msg: `unkown url ${req.path}` });
});
module.exports = router;
