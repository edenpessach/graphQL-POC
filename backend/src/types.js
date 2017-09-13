/**
 * Created by edenp on 13/09/2017.
 */

const {
    GraphQLObjectType,
    GraphQLString,
} = require('../../node_modules/graphql');


const SecretType = new GraphQLObjectType({
    name: 'Secret',
    fields: {
        permission: {type: GraphQLString},
        tenant_name: {type: GraphQLString},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        created_by: {type: GraphQLString},
        private_resource: {type: GraphQLString},
        value: {type: GraphQLString},
        key: {type: GraphQLString}
    }
});

exports.SecretType = SecretType;