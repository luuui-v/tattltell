const express = require('express');
const router = express.Router();
const wagesController = require('../controllers/wagesController');

/** *
 * App Routes
*/

router.get('/',wagesController.homepage)



module.exports = router ;