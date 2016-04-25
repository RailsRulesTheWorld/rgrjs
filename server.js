import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

import { MongoClient } from 'mongodb';

const app = express();

app.use(express.static('public'));

(async () => {
  const db = await MongoClient.connect(process.env.MONGO_URL);

  const schema = Schema(db);

  app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true,
  }));

  app.listen(3000, () => console.log('Listening on port 3000'));

  // Generate schema.json
  const json = await graphql(schema, introspectionQuery);
  fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
    if (err) throw err;

    console.log('JSON schema created');
  });
})(); // 使用async await语法可以避免无关业务的数据库连接错误等检查代码，更加简洁

// let db;
// console.log(process.env.MONGO_URL);
// MongoClient.connect(process.env.MONGO_URL, (err, database) => {
//   if (err) throw err;

//   database.collection('links').find({}).toArray((e) => {
//     if (e) throw e;

//     db = database;

//     app.use('/graphql', GraphQLHTTP({
//       schema: schema(db),
//       graphiql: true,
//     }));
//     app.listen(3000, () => console.log('Listening on port 3000'));
//   });
// });

// app.get('/data/links', (req, res) => {
//     db.collection('links').find({}).toArray((err, links) => {
//         res.json(links);
//     });
// });
