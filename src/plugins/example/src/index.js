'use strict';

module.exports = {
    name: 'example',
    register: (client) => {

        client.command({
            name: 'example',
            handler: (message) => {

                return message.channel.send('Example response!');
            },
        });
    },
};
