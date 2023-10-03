const { User, Organization, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
      getSingleUser: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('savedOrganizations', 'orderHistory');
        }
        throw AuthenticationError;
      },
      getSingleOrganization: async (parent, {name}) => {
          return Organization.findOne({ _id: name })
      },
      organizations: async () => {
        return Organization.find().sort({ createdAt: -1 });
      },
      getOrdersByUserId: async () => {
        if (context.user) {
          return Order.find({userId: context.user._id })
        }
        throw AuthenticationError;
      },
      getSingleOrder: async (parent, {orderId}) => {
        if (context.user) {
          return Order.findOne({orderId: orderId})
        }
        throw AuthenticationError;
      }
    },
  
    Mutation: {
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      addUser: async (parent, { input }) => {
        const user = await User.create({ input });
        const token = signToken(user);
        return { token, user };
      },
      saveOrganization: async (parent, { input }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedOrganizations: input } },
            { new: true, runValidators: true }
          );
  
          return updatedUser;
        }
        throw AuthenticationError;
      },
      removeOrganization: async (parent, { organizationId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedOrganizations: { _id: organizationId } } },
            { new: true, runValidators: true }
          );
  
          return updatedUser;
        }
        throw AuthenticationError;
      },
      updateUser: async (parent, { input }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: input },
            { new: true, runValidators: true }
          );
  
          return updatedUser;
        }
        throw AuthenticationError;
      },
    },
  };
  
  module.exports = resolvers;
  