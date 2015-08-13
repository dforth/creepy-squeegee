/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

  site: {
    title: 'Subscription Admin Application',
    buildVersion: '???',
    buildDate: '???',
    roles: {
      'user': ['Subscription Admin User'],
      'manager': ['Subscription Admin Manager'],
      'superUser': ['Subscription Admin Super User']
    }
  },
  services: {
    auth: {
      url: 'http://api-sandbox.dataconversions.biz',
      //url: 'http://localhost:8082',
      origin: 'admin.subscription.com.dev',
      credentials: 'Subscription Admin Application',
      authSpaceId: '2'
    },
    content: {
      url: 'http://api-sandbox.dataconversions.biz'
      //url: 'http://localhost:8080'
    },
    delivery: {
      url: 'http://api-sandbox.dataconversions.biz'
    },
    legacy: {
      url: 'http://api-sandbox.dataconversions.biz'
    },
    user: {
      url: 'http://api2-sandbox.dataconversions.biz'
    },
    email: {
      url: 'http://api2-sandbox.dataconversions.biz'
    },
    application: {
      url: 'http://api2-sandbox.dataconversions.biz'
      //url: 'http://192.168.202.89:8093'
    }
  },
  misc: {
    theaterBasePath: 'http://theater.aebn.net/',
    disServerTenSecondUrl: 'http://pic.aebn.net/dis/t/',
    disServerUrl: 'http://pic.aebn.net/dis/i/'
  }

};
