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

server.route({
    path: '/assets/{path*}',
    method: 'GET',
    handler: {
        directory:{
            path: './public',
            listing: false
        }
    }
});


server.route({
    path: '/cards/new',
    method: ['GET','POST'],
    handler: newCardHandler
});

server.route({
    path: '/cards',
    method: 'GET',
    handler: cardsHandler
});


function newCardHandler(request, reply) {
    if(request.method==='get') {
        reply.file('templates/new.html');
    } else {
        reply.redirect('/cards')
    }
};
function cardsHandler (request, reply) {
    reply.file('templates/cards.html');
};


server .start(function(){
    console.log('Listening on ' + server.info.uri);
});
