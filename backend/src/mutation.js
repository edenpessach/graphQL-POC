/**
 * Created by edenp on 13/09/2017.
 */
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('../../node_modules/graphql');
const {SecretType} = require('./types');
const axios = require('./utils/axios');
const socket = require('./utils/socket');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSecret: {
            type: SecretType,
            args: {
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                value: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args){
                return axios.put('/secrets/' + args.key, {value: args.value}, {headers: {'Content-Type': 'application/json'}})
                    .then(res => {
                        socket.publish('SECRET_ADDED', {
                            secretAdded: res.data
                        });
                        return res.data
                    });
            }
        },
        deleteSecret: {
            type: GraphQLString,
            args: {
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args){
                return axios.delete('/secrets/' + args.key)
                    .then(res => {
                        socket.publish('SECRET_DELETED', {
                            secretDeleted: res.data.key
                        });
                        return res.data.key
                    });
            }
        }
    }
});

module.exports = Mutation;
