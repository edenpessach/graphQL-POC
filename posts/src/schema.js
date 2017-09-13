/**
 * Created by edenp on 13/09/2017.
 */
'use strict';
const _ = require('lodash');
const axios = require('axios');
const postsUrl = 'http://localhost:3000/posts';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {
            type: GraphQLInt
        },
        likes: {
            type: GraphQLInt
        },
        src: {
            type: GraphQLString
        }
    }
});

//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve(parentValue, args){
                if(args.id){
                    return axios.get(postsUrl + '/' + args.id)
                        .then(res => res.data);
                }
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            args: {
                likes: {
                    type: GraphQLInt
                }
            },
            resolve(parentValue, args){
                if(args.likes){
                    return axios.get(postsUrl + '?likes=' + args.likes)
                        .then(res => res.data);
                } else{
                    return axios.get(postsUrl).then(res => {
                        return res.data;
                    });
                }
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPost: {
            type: PostType,
            args: {
                src: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args){
                return axios.post(postsUrl, {
                    likes: 0,
                    src: args.src
                }).then(res => res.data);
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parentValue, args){
                return axios.delete(postsUrl + '/'+ args.id)
                    .then(res => res.data);
            }
        },
        updatePost: {
            type: PostType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                likes: {
                    type: GraphQLInt
                },
                src: {
                    type: GraphQLInt
                }
            },
            resolve(parentValue, args){
                return axios.patch(postsUrl + '/' + args.id, args)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});