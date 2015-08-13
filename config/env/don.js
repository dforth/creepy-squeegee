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
        title: 'Rest Services Demo Application',
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
            //host: 'api-sandbox.dataconversions.biz',
            host: '192.168.202.89',
            //port: 80,
            port: 8082,
            credentials: 'Subscription Admin Application',
            authSpaceId: 'C0D48DC1-9AA1-4A05-8F85-06163F958FEA'
        },
        content: {
            //host: 'api-sandbox.dataconversions.biz',
            //port: 80
            host: '192.168.202.89',
            port: 8080
        },
        delivery: {
            host: 'api-sandbox.dataconversions.biz',
            port: 80
        },
        legacy: {
            host: 'api-sandbox.dataconversions.biz',
            port: 80
        },
        user: {
            //host: 'api-sandbox.dataconversions.biz',
            //port: 80
            host: '192.168.202.89',
            port: 8091
        },
        email: {
            //host: 'api-sandbox.dataconversions.biz',
            //port: 80
            host: '192.168.202.89',
            port: 8092
        },
        application: {
            //host: 'api-sandbox.dataconversions.biz',
            //port: 80
            host: '192.168.202.89',
            port: 8093
        }
    },
    misc: {
        theaterBasePath: 'http://theater.aebn.net/',

        disServerTenSecondUrl: 'http://pic.aebn.net/dis/t/',
        disServerUrl: 'http://pic.aebn.net/dis/i/'
    }

};
