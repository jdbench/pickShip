import React from "react";

export default function createProduct(
  i,
  items,
  products,
  retval,
  Product,
  noImage
) {
  let cursor = items[i].cursor;
  let title = items[i].node.title;
  let id = items[i].node.id.replace(/\D/g, "");
  let inventory = items[i].node.totalInventory;
  let featuredImage = items[i].node.featuredImage;
  let variants = items[i].node.variants.edges;
  let transformedSrc, altText;

  if (featuredImage == null) {
    transformedSrc = noImage;
    altText = `${title} has no image`;
  } else if (featuredImage != null) {
    transformedSrc = featuredImage.transformedSrc;
    altText = featuredImage.altText;
  }

  if (products.length < 10) {
    products.push(items[i]);
  } else {
    const filteredProducts = products.filter((element) => {
      if (element.cursor == cursor) {
        return true;
      }
    });
    if (filteredProducts.length < 1) {
      products.push(items[i]);
    }
  }

  retval.push(Product(id, title, transformedSrc, altText, inventory, variants));

  return retval;
}
