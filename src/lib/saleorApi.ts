import { SALEOR_API } from "@/config";

export const fetchFromSaleor = async (query: string) => {
  return await fetch(SALEOR_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
};

export type SaleorProduct = {
  name: string;
  media:
    | {
        url: string;
      }[]
    | [];
};

type FetchProduct = (field: string) => Promise<SaleorProduct | undefined>;

export const fetchProductBySku: FetchProduct = async (sku) => {
  const query = `
    query {
      productVariant(sku: "${sku}") {
        product {
          name
          media {
            url(size: 1379, format: WEBP)
          }
        }
      }
    }`;

  const response = await fetchFromSaleor(query);

  return response?.data?.productVariant?.product;
};

export const fetchProductById: FetchProduct = async (id) => {
  const query = `
    query  {
      product(id: "${id}") {
        name
        media {
          url(size: 1379, format: WEBP)
        }
      }
    }
  `;

  const response = await fetchFromSaleor(query);
  return response?.data?.product;
};
