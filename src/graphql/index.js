
const fs = require('fs');
const path = require('path');
const schema = fs.readFileSync(path.join(__dirname,'typeDefs.gql'),'utf-8');
const {gql} = require('apollo-server-express');

const resolvers = require('./resolvers');
const typeDefs = gql(schema);

module.exports = {
    resolvers,
    typeDefs
}