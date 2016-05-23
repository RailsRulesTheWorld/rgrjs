import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay';

const Schema = (db) => {
  // 注意下面的 name 改变了
  const linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
      id: { // 注意之前的_id变为此处的id, 并在 resolve 里 return _id
        type: new GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id,
      },
      title: { type: GraphQLString },
      url: { type: GraphQLString },
    }),
  });

  const linkConnection = connectionDefinitions({
    name: 'Link',
    nodeType: linkType,
  });

  const store = {};
  // 注意下面的name，如果跟已有的同名的话， 会出现不报任何错误但server启动不起来的状况
  const storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      linkConnection: {
        type: linkConnection.connectionType,
        args: connectionArgs,
        resolve: (_, args) => connectionFromPromisedArray(db.collection('links').find({}).toArray(), args),
      },
    }),
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store,
        },
      }),
    }),
  });

  return schema;
};

export default Schema;
