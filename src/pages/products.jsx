import React from "react";
import Product from "../components/Products";
import { Page } from "@shopify/polaris";

export default function Products() {
  return (
    <Page fullWidth title="Products">
      <Product />
    </Page>
  );
}
