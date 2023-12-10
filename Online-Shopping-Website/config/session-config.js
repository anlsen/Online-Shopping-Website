const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


function getStore(){
    const store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName:"onlineshop",
        collection: 'sessions'
    });
    return store;
}


function getSessionConfig(){
    return {
        secret:"super-secret",
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge:2*24*60*60*1000
        },
        store:getStore()
    }
}

module.exports=getSessionConfig;