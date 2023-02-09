import {
  CONTENTFUL_API_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_API_ACCESS_TOKEN,
  CONTENTFUL_SPACE,
} from "@/config";

export const fetchGraphQL = async (query: string, preview = false) => {
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
};

export const fetchProductById = async (productId: string): Promise<Product> => {
  const query = `
    query {
      product(id: "${productId}") {
        productImage {
          url
        }
        title
        description
      }
    }
  `;
  const response = await fetchGraphQL(query);

  return response?.data?.product as Product;
};

export const fetchPreviewProductById = async (
  productId: string
): Promise<Product> => {
  const query = `
    query {
      product(id: "${productId}", preview: true) {
        productImage {
          url
        }
        title
        description
      }
    }
  `;
  const response = await fetchGraphQL(query, true);

  return response?.data?.product as Product;
};
