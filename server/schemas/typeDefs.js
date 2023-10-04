const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    savedOrganizations: [Organization]
    orderHistory: [Order]
    image: String
    organizationCount: Int
  }

  type Organization {
    _id: ID!
    userId: String!
    name: String!
    description: String!
    image: String
    link: String
  }

  type Order {
    _id: ID!
    orderId: String!
    userId: String!
    orderTotal: Int!
    orderDate: String!
    paymentStatus: String!
    organizationName: String!
  }

  input addUserInput {
    username: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    image: String
  }

  input saveOrganizationInput {
    _id: String!
    name: String!
    description: String!
    image: String
    link: String
  }

  input addOrganizationInput {
    name: String!
    description: String!
    image: String
    link: String
  }

  input addOrderInput {
    orderId: String!
    orderTotal: Int!
    orderDate: String!
    paymentStatus: String!
    organizationName: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser: User
    getAllUsers: [User]
    getSingleOrganization(organizationId: String!): Organization
    getOrganizations: [Organization]!
    getSingleOrder(orderId: String!): Order
    getOrdersByUserId(userId: String!): [Order]
  }

  type Mutation {
    addUser(input: addUserInput!): Auth
    login(email: String!, password: String!): Auth
    saveOrganization(input: saveOrganizationInput!): User
    removeOrganization(organizationId: ID!): User
    updateUser(input: addUserInput!): User
    addOrganization(input: addOrganizationInput!): Organization
    addOrder(input: addOrderInput!): Order
  }
`;

module.exports = typeDefs;
