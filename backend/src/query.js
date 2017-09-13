/**
 * Created by edenp on 13/09/2017.
 */
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('../../node_modules/graphql');
const {SecretType} = require('./types');
const axios = require('./utils/axios');


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        secret:{
            type: SecretType,
            args: {
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args){
                return axios.get('/secrets/' + args.key)
                    .then(res => res.data);
            }
        },
        secrets: {
            type: new GraphQLList(SecretType),
            args: {
            },
            resolve(parentValue, args){
                return axios.get('/secrets')
                    .then(res => res.data.items);
            }
        }
    }
});

module.exports = RootQuery