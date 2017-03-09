module.exports = {

  control: function(req, res){

    if(req.session.me){
      req.next();
    }
    else{
      res.redirect('/login');
    }

  }

}
