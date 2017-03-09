module.exports = function(req, res, next) {


  // If you are not using passport then set your own logic
  if (req.session.authenticated) {
    return next();
  }

  // if you are using passport then
  //if(req.isAuthenticated()) {
  //  return next();
  //}

  //else

  return res.forbidden('Forbidden.')


};
