/**
 * Created by edenp on 13/09/2017.
 */
'use strict';

const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./src/schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('Listening on 4000!')
});
