/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': '/home',



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  '/home': '/examples',

  /**
   * Navigation
   */

  'GET /examples': {
    view: 'main/view'
  },

  /**
   * Ratings Example
   */

  'GET /ratings': {
    controller: 'RatingsController',
    action: 'getView'
  },

  'POST /ratings/:thingyId': {
    controller: 'RatingsController',
    action: 'updateRating'
  },

  'GET /ratings/clear': {
    controller: 'RatingsController',
    action: 'clearRatings'
  },

  /**
   * Password Field Example
   */

  'GET /password': {
    controller: 'PasswordController',
    action: 'getView'
  },

  'POST /login': {
    controller: 'PasswordController',
    action: 'login'
  },

  /**
   * Graph Example
   */

  'GET /graph': {
    view: 'graph/view'
  },

  'GET /graph/reset': {
    controller: 'GraphController',
    action: 'resetGraphData'
  },

  'GET /graph/data': {
    controller: 'GraphController',
    action: 'getGraphData'
  },

  /**
   * Scroller
   */

  'GET /scroller': {
    view: 'scroller/view'
  },

  /**
   * Chat
   */

  'GET /chat': {
    view: 'chat/view'
  },

  'POST /chat/logon': {
    controller: 'ChatController',
    action: 'logon'
  },

  'GET /chat/logoff': {
    controller: 'ChatController',
    action: 'logoff'
  },

  'POST /chat/join': {
    controller: 'ChatController',
    action: 'joinRoom'
  },

  'POST /chat/send': {
    controller: 'ChatController',
    action: 'sendMessage'
  },

  'POST /chat/nick': {
    controller: 'ChatController',
    action: 'changeNick'
  },

  'POST /chat/emote': {
    controller: 'ChatController',
    action: 'emote'
  }

};
