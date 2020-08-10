const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
} = require('graphql')

const bcrypt = require('bcrypt')

const UserType = require('../types/user')
const UserModel = require('../models/user')

const UserSchema = {
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: GraphQLList(UserType),
        async resolve(root, args, context, info) {
          const users = await UserModel.find();
          if (!users) {
            throw new Error('Error')
          }
          return users
        }
      },
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: UserType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          role: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        async resolve(root, args, context, info) {
          const salt = await bcrypt.genSalt(10)
          if (!salt) {
            throw new Error('Error generating salt')
          }

          const passEncript = await bcrypt.hash(args.password, salt)
          if (!passEncript) {
            throw new Error('Error encrypting password')
          }
          args.password = passEncript

          const newUserModel = await new UserModel(args)
          const newUser = await newUserModel.save()
          if (!newUser) {
            throw new Error('Error')
          }
          return newUser
        }
      },
      updateUser: {
        type: UserType,
        args: {
          name: {
            type: GraphQLString
          },
          lastName: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          },
          password: {
            type: GraphQLString
          },
          role: {
            type: GraphQLString
          }
        },
        async resolve(root, args, context, info) {
          const userToUpdate = await UserModel.findById(args.id)
          if (!userToUpdate) {
            throw new Error('Does no exist the user')
          }

          for (let property in args) {
            if (args[property] != userToUpdate[property] && args[property] != '') {
              userToUpdate[property] = args[property]
            }
          }

          const userUpdated = await userToUpdate.save()
          if (!userUpdated) {
            throw new Error('Error updating user')
          }

          return userUpdated
        }
      },
      removeUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(root, args, context, info) {
          const removeUser = await UserModel.findByIdAndRemove(args.id).exec()
          if (!removeUser) {
            throw new Error('Error')
          }

          return removeUser
        }
      },
      login: {
        type: UserType,
        args: {
          email: { type: GraphQLNonNull(GraphQLString) },
          password: { type: GraphQLNonNull(GraphQLString) }
        },
        async resolve(root, args, context, info) {
          const user = await UserModel.findOne({ email: args.email })
          if (!user) {
            throw new Error('Cant find email')
          }

          const secure = await bcrypt.compare(args.password, user.password)
          if (!secure) {
            throw new Error('Wrong password')
          }

          return {
            id: user._id,
            name: user.name,
            lastName: user.lasName,
            email: user.email,
            role: user.role
          }
        }
      }
    }
  })
}

module.exports = new GraphQLSchema(UserSchema)