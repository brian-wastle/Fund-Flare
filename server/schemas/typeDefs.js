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
    myOrganizationId: String
  }

  type Organization {
    _id: ID!
    userId: String!
    name: String!
    description: String!
    image: String
    link: String
    tag: Tag
  }

  type Order {
    orderId: String
    userId: String!
    orderTotal: Int!
    orderDate: String!
    organizationName: String!
  }

  type Tag {
    name: String!
  }

  input addUserInput {
    username: String
    email: String
    password: String
    isAdmin: Boolean
    image: String
    myOrganizationId: String
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
    tag: String
  }

  input addOrderInput {
    orderTotal: Int!
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
    getOrdersByUserId: [Order]
  }

  type Mutation {
    addUser(input: addUserInput!): Auth
    login(email: String!, password: String!): Auth
    saveOrganization(input: saveOrganizationInput!): User
    removeOrganization(organizationId: ID!): User
    updateUser(input: addUserInput!): User
    updateUserOrgId(myOrganizationId: String): User
    addOrganization(input: addOrganizationInput!): Organization
    addOrder(input: addOrderInput!): Order
  }
`;

module.exports = typeDefs;
