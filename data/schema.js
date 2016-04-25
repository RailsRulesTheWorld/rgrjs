import {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const Schema = (db) => {
  // 注意下面的 name 改变了
  const linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString },
    }),
  });
  const store = {};
  // 注意下面的name，如果跟已有的同名的话， 会出现不报任何错误但server启动不起来的状况
  const storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      links: {
        type: new GraphQLList(linkType),
        resolve: () => db.collection('links').find({}).toArray(), // TODO: Read from Mongo
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
