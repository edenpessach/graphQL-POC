/**
 * Created by edenp on 13/09/2017.
 */
const {GraphQLObjectType, GraphQLString} = require('../../node_modules/graphql');
const {SecretType} = require('./types');
const socket = require('./utils/socket');

// Subscriptions
const Subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        secretAdded: {
            type: SecretType,
            subscribe: () => socket.asyncIterator('SECRET_ADDED')
        },
        secretDeleted: {
            type: GraphQLString,
            subscribe: () => socket.asyncIterator('SECRET_DELETED')
        }
    }
});

module.exports = Subscription;