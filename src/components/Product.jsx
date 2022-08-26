import React from "react";
import { Card, TextContainer, Image, Stack } from "@shopify/polaris";
import css from "./product.css";

export default function Product(
  id,
  title,
  image,
  altText,
  inventory,
  variants
) {
  let i = 0;
  let sku;
  let barcode;
  let variantId;
  let variantQuantity;
  let variantTitle;
  let variantArray = [];

  for (i in variants) {
    variantTitle = variants[i].node.title;
    variantId = variants[i].node.id.replace(/\D/g, "");
    barcode = variants[i].node.barcode;
    sku = variants[i].node.sku;
    variantQuantity = variants[i].node.inventoryQuantity;

    if (barcode == null) {
      barcode = undefined;
    }

    variantArray.push(
      <Stack key={variantId} distribution="fillEvenly">
        <Stack.Item>
          <p>
            <VariantKey id={variantId} barcode={barcode} sku={sku} />
          </p>
        </Stack.Item>
        <Stack.Item>
          <p className="center">{variantTitle}</p>
        </Stack.Item>
        <Stack.Item>
          <p className="center">
            <b>IN STOCK : {variantQuantity}</b>
          </p>
        </Stack.Item>
      </Stack>
    );
  }
  return (
    <Stack.Item key={variantId}>
      <Card title={title.toUpperCase()} key={id} sectioned>
        <Card.Section>
          <Stack vertical alignment="center" distribution="fillEvenly">
            <Stack.Item>
              <Image source={image} alt={altText} width={250}></Image>
            </Stack.Item>
            <Stack.Item>
              <TextContainer>
                <p>ID: {id}</p>
              </TextContainer>
            </Stack.Item>
          </Stack>
        </Card.Section>
        <Card.Section title="Inventory">
          <Stack vertical distribution="fillEvenly">
            <Stack.Item>
              <p>
                <b>TOTAL IN STOCK : {inventory}</b>
              </p>
            </Stack.Item>
            <Stack.Item>{variantArray}</Stack.Item>
          </Stack>
        </Card.Section>
      </Card>
    </Stack.Item>
  );
}

function VariantKey(id, barcode, sku) {
  let retval;

  console.log(id, barcode, sku);

  if (sku != undefined) {
    retval = `SKU: ${sku}`;
  } else if (id.barcode != undefined) {
    retval = `BARCODE: ${barcode}`;
  } else if (id.id != undefined) {
    retval = `ID: ${id.id}`;
  }

  return retval;
}
