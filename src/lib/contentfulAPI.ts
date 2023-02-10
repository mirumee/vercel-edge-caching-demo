import {
  CONTENTFUL_API_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_API_ACCESS_TOKEN,
  CONTENTFUL_SPACE,
  SALEOR_API,
} from "@/config";

export const fetchFromContentful = async (query: string, preview = false) => {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? CONTENTFUL_PREVIEW_API_ACCESS_TOKEN
            : CONTENTFUL_API_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
};

type Product = {
  title: string;
  description: string;
  productImage: {
    url: string;
  };
  product: string | null;
};

type FetchProductBySlug = (
  slug: string,
  isPreview?: boolean
) => Promise<Product | undefined>;

export const fetchProductBySlug: FetchProductBySlug = async (
  slug,
  isPreview?: boolean
) => {
  const previewArgument = isPreview ? "true" : "false";

  const query = `
    query {
      productCollection(where: { slug: "${slug}" }, limit: 1, preview: ${previewArgument}) {
       items{
          productImage {
            url
          }
          title
          description
          product
        }
      }
    }
  `;

  const response = await fetchFromContentful(query, isPreview);

  return response?.data?.productCollection?.items?.[0] as Product | undefined;
};

export type ProductItem = { slug: string; title: string };

type FetchAllProducts = (
  isPreview?: boolean
) => Promise<ProductItem[] | undefined>;

export const fetchAllProducts: FetchAllProducts = async (isPreview) => {
  const query = `
    query {
      productCollection(order: sys_publishedAt_ASC) {
        items {
          slug
          title
        }
      }
    }`;

  const response = await fetchFromContentful(query, isPreview);

  return response?.data?.productCollection?.items as ProductItem[] | undefined;
};

export const fetchFromSaleor = async (query: string) => {
  return await fetch(SALEOR_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
};

export const fetchProductNameFromSaleorBySku = async (sku: string) => {
  const query = `
    query {
      productVariant(sku: "${sku}") {
        product {
          name
        }
      }
    }`;

  const response = await fetchFromSaleor(query);

  return response?.data?.productVariant?.product?.name as string;
};
