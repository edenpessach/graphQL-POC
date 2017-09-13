/**
 * Created by edenp on 13/09/2017.
 */
'use strict';

const express = require('express');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const schema = require('./src/schema');
const {execute, subscribe} = require('graphql');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {createServer} = require('http');
const bodyParser = require('body-parser');
const WS_PORT = 5000;


const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({
    schema
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${WS_PORT}/subscriptions`
}));

const server = createServer(app);


server.listen(WS_PORT, () => {
    new SubscriptionServer({
        execute,
        subscribe,
        schema: schema,
        onConnect: () => console.log('Client connected')
    },
    {
        server,
        path: '/subscriptions'
    })
});
