import React from 'react';
import { HomePage } from '../components/HomePage';
import { Page } from '@shopify/polaris';

export function Home() {
  return (
    <Page
    fullWidth
    title="Dashboard"
    >
        <HomePage />
    </Page>
  )
}
