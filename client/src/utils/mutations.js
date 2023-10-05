import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: addUserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        isAdmin
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_ORGANIZATION = gql`
  mutation saveOrganization($input: saveOrganizationInput!) {
    saveOrganization(input: $input) {
      _id
      username
      savedOrganizations {
        _id
        name
        description
      }
    }
  }
`;

export const REMOVE_ORGANIZATION = gql`
  mutation removeOrganization($organizationId: ID!) {
    removeOrganization(organizationId: $organizationId) {
      _id
      username
      savedOrganizations {
        name
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: addUserInput!) {
    updateUser(addUserInput: $addUserInput) {
      _id
      username
      email
      isAdmin
      savedOrganizations {
        name
        description
      }
      orderHistory {
        _id
        orderId
      }
      image
      organizationCount
    }
  }
`;

export const ADD_ORGANIZATION = gql`
  mutation addOrganization($addOrganizationInput: addOrganizationInput!) {
    addOrganization(addOrganizationInput: $addOrganizationInput) {
      _id
      userId
      name
      description
      image
      link
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($addOrderInput: addOrderInput!) {
    addOrder(addOrderInput: $addOrderInput) {
      orderId
      userId
      orderTotal
      orderDate
      paymentStatus
      organizationName
    }
  }
`;