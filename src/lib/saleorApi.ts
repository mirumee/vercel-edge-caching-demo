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
