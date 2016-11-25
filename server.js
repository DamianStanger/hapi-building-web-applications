'use strict';

const
    Hapi = require('hapi'),
    server = new Hapi.Server();

server.connection({port:3000});

server.ext('onRequest', (request, reply) => {console.log('Request received at: ' + request.path); reply.continue()});

server.route({
    path:'/',
    method: 'GET',
    // handler: function(request, reply) {
    //     reply.file('templates/index.html');
    // }
    handler: {
        file: 'templates/index.html'
    }
});

server .start(function(){
    console.log('Listening on ' + server.info.uri);
});
