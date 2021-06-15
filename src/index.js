'use strict'

const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const {typeDefs, resolvers} = require('./graphql/index');

const app = express();

const graphqlExpress = new ApolloServer({
    typeDefs,
    resolvers,
});

app.get('/', (req, res) => {
    res.redirect('/graphql');
});

graphqlExpress.applyMiddleware({ app });

app.listen(3000, () => console.log('Server on port 3000'));
// const express = require('express');
// const app = express();
// const routes = require('./routes/index.route');
// app.use(express.json({ limit: "10mb" }));
// app.use(routes);
//app.listen(3000, () => console.log('Server on port 3000'));