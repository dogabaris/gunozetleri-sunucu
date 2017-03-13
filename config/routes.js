module.exports.routes = {

  // Views
  '/': { view: 'user/login' },
  'get /login': { view: 'user/login' },
  'get /signup': { view: 'user/signup' },
  '/welcome': { view: 'user/welcome' },

  // Endpoints
  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
  '/logout': 'UserController.logout',
  'get /home': 'UserController.control',
  'post /home': 'UserController.new'

};
