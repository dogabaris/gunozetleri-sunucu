/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

    get: function (req, res) {
     res.sendfile(req.path.substr(1));
   },
   _config: {
     rest: false,
     shortcuts: false
   },

   


 };
