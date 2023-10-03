import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
  query getSingleUser($_id: ID!) {
    getSingleUser(_id: $_id) {
      _id
      username
      email
      isAdmin
      savedOrganizations {
        _id
        userId
        name
        description
        image
        link
      }
      orderHistory {
        _id
        orderId
        userId
        orderTotal
        orderDate
        paymentStatus
        organizationName
      }
      image
      organizationCount
    }
  }
`;

export const GET_SINGLE_ORGANIZATION = gql`
  query getSingleOrganization($organizationId: ID!) {
    getSingleOrganization(organizationId: $organizationId) {
      _id
      userId
      name
      description
      image
      link
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query getOrganizations {
    getOrganizations {
      _id
      userId
      name
      description
      image
      link
    }
  }
`;

export const GET_SINGLE_ORDER = gql`
  query getSingleOrder($orderId: String!) {
    getSingleOrder(orderId: $orderId) {
      _id
      orderId
      userId
      orderTotal
      orderDate
      paymentStatus
      organizationName
    }
  }
`;

export const GET_ORDERS_BY_USER_ID = gql`
  query getOrdersByUserId($userId: String!) {
    getOrdersByUserId(userId: $userId) {
      _id
      orderId
      userId
      orderTotal
      orderDate
      paymentStatus
      organizationName
    }
  }
`;