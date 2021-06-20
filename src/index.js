'use strict';

require('dotenv').config();
const Sdk = require('@botsocket/discord-sdk');
const Path = require('path');
const Fs = require('fs');

const internals = {};

internals.bootstrap = async () => {

    const client = Sdk.client({
        registry: {
            prefix: process.env.PREFIX,
        },
    });

    await client.register({
        plugin: require('@botsocket/db-plugin'),
        options: {
            provider: require('@botsocket/db-plugin/providers/JSONProvider'),
            providerOptions: {
                dataDir: Path.join(__dirname, '..', 'data'),
            },
        },
    });

    for (const plugin of Fs.readdirSync(Path.join(__dirname, 'plugins'))) {
        try {
            await client.register(require(Path.join(__dirname, 'plugins', plugin)));
        }
        catch (e) {
            client.logger.error(`Error while loading plugin ${plugin}:\n${e?.stack || e}`);
        }
    }

    await client.start();
};

internals.bootstrap();
