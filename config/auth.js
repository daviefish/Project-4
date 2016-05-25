// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'twitterAuth' : {
        'consumerKey'       : process.env.CONSUMER_KEY,
        'consumerSecret'    : process.env.CONSUMER_SECRET,
        'callbackURL'       : 'http://127.0.0.1:3000/login/twitter/return'
    },

};

