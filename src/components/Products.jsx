import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Pagination,
  Frame,
  Spinner,
  Banner,
  Page,
  Layout,
} from "@shopify/polaris";
import Product from "./Product";
import noImage from "../assets/no-image.jpg";

const productQuery = gql`
  query ProductsQuery(
    $first: Int
    $after: String
    $before: String
    $query: String
  ) {
    products(first: $first, after: $after, before: $before, query: $query) {
      edges {
        cursor
        node {
          variants(first: 15) {
            edges {
              node {
                displayName
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

export default function Products() {
  const first = 6;
  const { loading, data, error, refetch } = useQuery(productQuery, {
    variables: { first },
    notifyOnNetworkStatusChange: true,
  });

  let i = 0;
  let title;
  let id;
  let featuredImage;
  let transformedSrc;
  let altText;
  let retval = [];
  let variants;
  let items;
  let cursor;
  let hasNext;
  let hasPrevious;
  let inventory;

  if (loading) {
    return (
      <div>
        <Frame>
          <Spinner accessibilityLabel="Spinner" size="large" color="teal" />
        </Frame>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Banner title={error.message} status="critical">
          <p>{error.stack}</p>
        </Banner>
      </div>
    );
  }

  items = data.products.edges;
  cursor = items[items.length - 1].cursor;
  hasNext = data.products.pageInfo.hasNextPage;
  hasPrevious = data.products.pageInfo.hasPreviousPage;

  for (i in items) {
    title = items[i].node.title;
    id = items[i].node.id.replace(/\D/g, "");
    inventory = items[i].node.totalInventory;
    featuredImage = items[i].node.featuredImage;
    variants = items[i].node.variants.edges;

    if (featuredImage == null) {
      transformedSrc = noImage;
      altText = `${title} has no image`;
    } else if (featuredImage != null) {
      transformedSrc = featuredImage.transformedSrc;
      altText = featuredImage.altText;
    }

    retval.push(
      Product(id, title, transformedSrc, altText, inventory, variants)
    );
  }

  function nextPage(cursor) {
    refetch({
      after: cursor,
    });
  }

  function previousPage(cursor) {
    refetch({
      before: cursor,
    });
  }
  return (
    <Page>
      {retval}
      <Pagination
        label="Pages"
        hasPrevious={hasPrevious}
        onPrevious={() => previousPage(cursor)}
        previousTooltip="Previous Page"
        nextTooltip="Next Page"
        hasNext={hasNext}
        onNext={() => nextPage(cursor)}
      />
    </Page>
  );
}
