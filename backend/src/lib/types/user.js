const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  }
})

module.exports = UserType