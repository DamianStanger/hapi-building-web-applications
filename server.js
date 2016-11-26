'use strict';

const
    Hapi = require('hapi'),
    server = new Hapi.Server(),
    uuid = require('uuid'),
    fs = require('fs'),
    cards = require('./cards.json');

console.log(cards);

server.connection({port:3000});

server.ext('onRequest', (request, reply) => {console.log('Request received at: ' + request.path); reply.continue()});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: './templates'
})

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
    path: '/cards/{id}',
    method: 'DELETE',
    handler: deleteCardHandler
});

server.route({
    path: '/cards',
    method: 'GET',
    handler: cardsHandler
});

function saveCard(card) {
        var id = uuid.v1();
        card.id = id;
        cards[id] = card;
}

function mapImages() {
    return fs.readdirSync('./public/images/cards')
}
function newCardHandler(request, reply) {
    if(request.method==='get') {
        reply.view('new', {card_images: mapImages()});
    } else {
        var card = {
            name: request.payload.name,
            recipient_email: request.payload.recipient_email,
            sender_name: request.payload.sender_name,
            sender_email: request.payload.sender_email,
            card_image: request.payload.card_image
        }
        saveCard(card);
        console.log(cards);

        reply.redirect('/cards')
    }
};
function cardsHandler (request, reply) {
    reply.view('cards', {cards: cards});
};

function deleteCardHandler(request, reply){
    delete cards[request.params.id];
    reply();
}

server.start(function(){
    console.log('Listening on ' + server.info.uri);
});
