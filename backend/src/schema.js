/**
 * Created by edenp on 13/09/2017.
 */
'use strict';
const {GraphQLSchema} = require('../../node_modules/graphql');

const Subscription = require('./subscription');
const Query = require('./query');
const Mutation = require('./mutation');

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
    subscription: Subscription
});