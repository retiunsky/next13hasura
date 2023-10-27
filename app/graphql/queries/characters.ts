import { gql } from "@apollo/client";

export const CHARACTERS_QUERY = gql`
query MyQuery {
  products {
    title
    price
    img
  }
}

`;
