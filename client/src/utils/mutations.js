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

export const UPDATE_FUNDING = gql`
  mutation updateFundingAmount($myOrganization: String, $fundraisingAmount: Int) {
    updateFundingAmount(myOrganization: $myOrganization, fundraisingAmount: $fundraisingAmount) {
      _id
      description
      image
      name
      link
      userId
      fundraisingAmount
      fundraisingGoal
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
    updateUser(input: $input) {
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
      myOrganizationId
    }
  }
`;

export const UPDATE_USERORGID = gql`
  mutation updateUserOrgId($myOrganizationId: String!) {
    updateUserOrgId(myOrganizationId: $myOrganizationId) {
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
      myOrganizationId
    }
  }
`;

export const ADD_ORGANIZATION = gql`
  mutation addOrganization($input: addOrganizationInput!) {
    addOrganization(input: $input) {
      _id
      userId {
      username
      _id
      image
    }
      name
      description
      image
      link
      tag {
      image
      name
      _id
    }
      fundraisingGoal
      fundraisingAmount
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($addOrderInput: addOrderInput!) {
    addOrder(input: $addOrderInput) {
      orderId
      userId
      orderTotal
      orderDate
      organizationName
    }
  }
`;