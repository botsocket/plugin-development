'use strict';

const Jade = require('@botsocket/jade');

module.exports = {
    name: 'example',
    register: (client) => {

        client.command({
            name: 'example',
            handler: ({ message }) => {

                return message.channel.send('Example response!');
            },
        });

        client.command({
            name: 'args',
            args: ['text'],
            validate: {
                args: {
                    text: Jade.string().required(),
                },
            },
            handler: ({ message, args: { text } }) => {

                return message.channel.send(text);
            },
        });
    },
};
