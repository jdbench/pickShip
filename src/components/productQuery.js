import { gql } from "@apollo/client";

export const productQuery = gql`
  query ProductsQuery(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $query: String
  ) {
    products(
      first: $first
      last: $last
      reverse: true
      after: $after
      before: $before
      query: $query
    ) {
      edges {
        cursor
        node {
          variants(first: 15) {
            edges {
              node {
                displayName
                barcode
                id
                sku
                image {
                  transformedSrc
                }
                inventoryQuantity
                title
              }
            }
          }
          title
          id
          description
          featuredImage {
            altText
            transformedSrc
          }
          totalInventory
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
