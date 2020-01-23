import { gql } from 'apollo-boost';

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!,
    $username: String!,
    $firstName: String,
    $lastName: String
  ) {
    createAccount(
      email: $email,
      username: $username,
      firstName: $firstName,
      lastName: $lastName
    )
  }
`;