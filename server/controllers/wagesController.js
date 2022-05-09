const res = require("express/lib/response");

/***
 * GET /
 * Hompage
 */
exports.homepage = async(req, res) =>{

    res.redner('index');


}