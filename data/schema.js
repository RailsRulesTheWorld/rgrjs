import {
    GraphQLSchema,
    GraphQLList,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql';

let Schema = (db) => {
    const linkType = new GraphQLObjectType({
        name: '_id',
        fields: () => ({
            _id: { type: GraphQLString },
            title: { type: GraphQLString },
            url: { type: GraphQLString },
        })
    });

    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                links: {
                    type: new GraphQLList(linkType),
                    resolve: () => db.collection('links').find({}).toArray() // TODO: Read from Mongo
                }
            })
        })
    });
    
    return schema;
}

export default Schema;