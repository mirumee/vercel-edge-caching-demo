import { MOCK_AUTHORIZATION_COOKIE_NAME } from "@/config";
import { GetServerSidePropsContext, Redirect } from "next";
import { fetchProductNameFromSaleorBySku } from "./saleorApi";

export const waitForFewSeconds = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  });

type RedirectTo = (path: string) => { redirect: Redirect };

export const redirectTo: RedirectTo = (path) => ({
  redirect: {
    destination: path,
    permanent: false,
  },
});

export const notFound = () =>
  ({
    notFound: true,
  } as const);

export const getOptionsFromContext = ({
  req,
  query,
}: GetServerSidePropsContext) => {
  const isMockAuthorizationCookiePresent =
    MOCK_AUTHORIZATION_COOKIE_NAME in req.cookies;

  const isPreviewParameterPresent = "preview" in query;

  const shouldUsePreviewApi =
    isMockAuthorizationCookiePresent && isPreviewParameterPresent;

  const hasToWait = "wait" in query;

  return {
    isAuthorized: isMockAuthorizationCookiePresent,
    doesRequestPreview: isPreviewParameterPresent,
    shouldUsePreviewApi,
    hasToWait,
  } as const;
};

const reformatSaleorVariantSku = (variantSku: string) =>
  variantSku.replace("Variant SKU: ", "");

export const getSaleorProductWithContentfulSku = async (
  contentfulProductSku: string
) => {
  if (!contentfulProductSku.includes("Variant SKU")) {
    return null;
  }

  const transformedProductSku = reformatSaleorVariantSku(contentfulProductSku);

  const saleorProductName = await fetchProductNameFromSaleorBySku(
    transformedProductSku
  );

  return saleorProductName;
};
