import React from 'react';
import Product from '../components/Products';
import { Page } from '@shopify/polaris';

export function Products() {
  return (
    <Page
    title="Products"
    >
        <Product />
    </Page>
  )
}
