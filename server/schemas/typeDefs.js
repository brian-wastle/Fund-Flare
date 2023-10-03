const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    organizationCount: Int!
    savedOrganizations: [Organization]!
    orderHistory: [Order]
    image: String
  }

  type Organization {
    _Id: ID!
    name: String!
    description: String!
    image: String
    link: String
  }

  type Order {
    _id: ID!
    orderId: String!
    userId: String!
    orderTotal: Number!
    orderDate: DateTime!
    paymentStatus: String!
    organizationName: String!
  }

  input saveOrganizationInput {
    organizationId: ID!
    description: String!
    name: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser: User
    getSingleOrganization: Organization
    getOrganizations: [Organization]!
    getOrderById(orderId: String!): Order
    getOrdersByUserId(userId: String!): [Order]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveOrganization(input: saveOrganizationInput!): User
    removeOrganization(organizationId: ID!): User
  }
`;

module.exports = typeDefs;
