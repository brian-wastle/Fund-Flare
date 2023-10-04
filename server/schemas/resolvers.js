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
    getAllUsers: async (parent, args) => {

        return User.find().populate('savedOrganizations', 'orderHistory');

    },
    getSingleOrganization: async (parent, { organizationId }) => {
      return Organization.findOne({ _id: organizationId })
    },
    getOrganizations: async () => {
      return Organization.find().sort({ createdAt: -1 });
    },
    getOrdersByUserId: async (parent, args, context) => {
      if (context.user) {
        return Order.find({ userId: context.user._id })
      }
      throw AuthenticationError;
    },
    getSingleOrder: async (parent, { orderId }, context) => {
      if (context.user) {
        console.log(orderId);
        return Order.findOne({ _id: orderId })
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
      const user = await User.create({
        username: input.username,
        email: input.email,
        password: input.password,
        isAdmin: input.isAdmin,
        image: input.image
      });
      const token = signToken(user);
      return { token, user };
    },
    saveOrganization: async (parent, { input }, context) => {
      if (context.user) {
        const newOrganization = {
          _id: input._id,
          name: input.name,
          description: input.description,
          image: input.image || null,
          link: input.link || null,
        }
        console.log(newOrganization);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedOrganizations: newOrganization } },
          { new: true, runValidators: true }
        ).populate('savedOrganizations');
          console.log(updatedUser);
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
    addOrganization: async (parent, { input }, context) => {
      if (context.user) {
        const organization = await Organization.create({
          userId: context.user._id,
          name: input.name,
          description: input.description,
          image: input.image,
          link: input.link,
        });

        return organization
      }
      throw AuthenticationError;
    },
    addOrder: async (parent, { input }, context) => {
      if (context.user) {
        const order = await Order.create({ 
          orderId: input.orderId,
          userId: context.user._id,
          orderTotal: input.orderTotal,
          orderDate: input.orderDate,
          paymentStatus: input.paymentStatus,
          organizationName: input.organizationName
         });

        return order
      }
      throw AuthenticationError;
    }
  },
};

module.exports = resolvers;
