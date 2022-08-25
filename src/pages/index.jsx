import React from "react";
import Products from "../components/Products";
import { Page } from "@shopify/polaris";

export default function Home() {
  return (
    <Page title="Dashboard">
      <Products />
    </Page>
  );
}
