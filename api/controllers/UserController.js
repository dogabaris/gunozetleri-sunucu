/**
 * UserController

 */

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    // See `api/responses/login.js`
    return res.login({
      email: req.param('email'),
      password: req.param('password'),
      successRedirect: '/home',
      invalidRedirect: '/login'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a simple response letting the user agent know they were logged out
    // successfully.
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/');
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {

    // Attempt to signup a user using the provided parameters
    User.signup({
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password')
    }, function (err, user) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) return res.negotiate(err);

      // Go ahead and log this user in as well.
      // We do this by "remembering" the user in the session.
      // Subsequent requests from this user agent will have `req.session.me` set.
      req.session.me = user.id;
      req.session.me.user = user.name;

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.redirect('/welcome');
    });
  },

  /**
   * `UserController.control()`
   */

  checkSession: function(req, res){

    if(req.session.me){
      this.getNews(req,res);
      //res.view('user/home');
    }
    else{
      res.redirect('/login');
    }
  },

  /**
   * `UserController.getName()`
   */
   getname: function(req, res){
   var tagline = "deneme";

    res.render('user/home', tagline);
   },

   /**
    * `UserController.new()`
    */
  new: function(req, res){


    // Node defaults to 2 minutes.
    res.setTimeout(0);

      //maks 10mb upload
      req.file('image').upload({maxBytes: 10000000, dirname : process.cwd() + '/assets/images/uploads/'}, function (err, uploadedFiles) {
        if (err) return res.send(500, err);
        else {
          var fs = require('fs');

          var filename = uploadedFiles[0].fd.substring(uploadedFiles[0].fd.lastIndexOf('/')+1);
          var uploadLocation = process.cwd() +'/assets/images/uploads/' + filename;
          var tempLocation = process.cwd() + '/.tmp/uploads/' + filename;

          //Copy the file to the temp folder so that it becomes available immediately
          fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));

          Ozet.new({
            title: req.param('title'),
            news: req.param('news'),
            //imagePath: uploadedFiles[0].fd,
            imagePath: filename,
            date: req.param('date'),
            state: req.param('state'),
            who: req.param('who')  //ekleyen kullanıcının id'si
          }, function (err, news) {

            if (err) return res.negotiate(err);

            if (req.wantsJSON) {
              return res.ok('Başarıyla Eklendi!');
            }

            return res.view('user/home');
          });
        }
      });

  },

  /**
   * `UserController.uploadImage()`
   */
  uploadImage: function (req, res) {

    // 0 => infinite
    // 240000 => 4 minutes (240,000 miliseconds)
    // Node defaults to 2 minutes.
    res.setTimeout(0);

    req.file('image').upload({

      // You can apply a file upload limit (in bytes)
      maxBytes: 1000000,


    }, function whenDone(err, uploadedFiles) {
      if (err) return res.serverError(err);
      else return res.json({
        files: uploadedFiles,
        textParams: req.allParams()
      });
    });
  },

  /**
   * `UserController.getNews()`
   */
  getNews: function(req, res){

    User.findOne({id: req.session.me}).exec(function(err, userName){
      var name="bulunamadı";
      name = userName.name;

      Ozet.find().limit(10).sort('updatedAt DESC').exec(function(err, News){
        res.view('user/home', { News: News, name: name });
      });

    });

    //User.findOne({id: req.session.me}).exec(function(err, Name){
    //  res.view('user/home', { Name: Name });
    //});

  },



};
