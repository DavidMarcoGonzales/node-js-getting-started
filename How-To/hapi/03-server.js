'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ 
    port:  3001
 });

 server.route(require('./03-post_instructor'));

server.start(err => {
    if (err)
        throw err;
        console.log(`Server listening on port ${server.info.uri}`);
});