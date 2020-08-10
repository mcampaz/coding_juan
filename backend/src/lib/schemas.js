const {
  GraphQLObjectType, GraphQLSchema
} = require('graphql')

const UserSchema = {
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {

    }
  })
}

module.exports = new GraphQLSchema(UserSchema)