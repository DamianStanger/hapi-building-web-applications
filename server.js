'use strict';

const
    Hapi = require('hapi'),
    server = new Hapi.Server();

server.connection({port:3000});

server.route({
    path: '/hello',
    method: 'GET',
    handler: (request, reply) => reply('hello world')
});

server .start(function(){
    console.log('Listening on ' + server.info.uri);
});
