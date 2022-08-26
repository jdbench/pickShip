import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Pagination,
  Frame,
  Spinner,
  Banner,
  Page,
  Layout,
  Stack,
} from "@shopify/polaris";
import Product from "./Product";
import createProduct from "./createProduct";
import { productQuery } from "./productQuery";
import noImage from "../assets/no-image.jpg";
import { ProductStatus } from "@shopify/app-bridge/actions/ResourcePicker";
import css from "./products.css";

let products = [];

export default function Products() {
  const first = 10;
  const { loading, data, error, refetch, fetchMore } = useQuery(productQuery, {
    variables: {
      first: first,
    },
  });

  let i = 0;
  let retval = [];
  let items;
  let hasNext;
  let hasPrevious;
  let nextCursor;
  let prevCursor;

  if (loading) {
    return <Spinner accessibilityLabel="Spinner" size="large" color="teal" />;
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
  nextCursor = items[items.length - 1].cursor;
  prevCursor = items[0].cursor;
  hasNext = data.products.pageInfo.hasNextPage;
  hasPrevious = data.products.pageInfo.hasPreviousPage;

  for (i in items) {
    retval = createProduct(i, items, products, retval, Product, noImage);
  }

  function nextPage(cursor) {
    refetch({
      last: null,
      after: cursor,
      first: first,
      before: null,
    });
  }

  function previousPage(cursor) {
    refetch({
      first: null,
      last: first,
      before: cursor,
      after: null,
    });
  }
  return (
    <>
      <Stack distribution="fillEvenly">{retval}</Stack>
      <div className="pagination">
        <Pagination
          label="Pages"
          hasPrevious={hasPrevious}
          onPrevious={() => previousPage(prevCursor)}
          previousTooltip="Previous Page"
          nextTooltip="Next Page"
          hasNext={hasNext}
          onNext={() => nextPage(nextCursor)}
        />
      </div>
    </>
  );
}
