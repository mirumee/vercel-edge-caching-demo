import { Navbar } from "@/components/Navbar";

import {
  fetchProductBySlug,
  fetchProductNameFromSaleorBySku,
} from "@/lib/contentfulAPI";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  waitForFewSeconds,
  redirectTo,
  notFound,
  getOptionsFromContext,
  getSaleorProductWithContentfulSku,
} from "@/lib/ssrUtils";

interface ProductPageProps {
  title: string;
  description: string;
  imageUrl: string;
  isPreview?: boolean;
  ssrDate: string;
  showPleaseLoginToPreview?: boolean;
  saleorProductName?: string | null;
}

const ProductPage: NextPage<ProductPageProps> = ({
  title,
  description,
  imageUrl,
  isPreview,
  ssrDate,
  showPleaseLoginToPreview,
  saleorProductName,
}) => {
  const pageHeader = isPreview ? "Preview" : "Published";

  return (
    <>
      <Head>
        <title>Vercel Edge caching demo</title>
      </Head>
      <Navbar />
      {showPleaseLoginToPreview && (
        <strong className="note">Please log in to see preview content</strong>
      )}
      <header>
        <h1>{pageHeader}</h1>
        <small>SSR date - {ssrDate}</small>
      </header>
      <hr />
      <main>
        <figure>
          <Image
            src={imageUrl}
            height={2048}
            width={1379}
            alt="product image"
            sizes="100vw"
          />
        </figure>
        <section>
          <h2>{title}</h2>
          <div className="associated-product-details">
            {saleorProductName && (
              <p>Saleor product name: {saleorProductName}</p>
            )}
          </div>
          <p>{description}</p>
        </section>
      </main>
    </>
  );
};

type Params = {
  slug: string;
};

export const getServerSideProps: GetServerSideProps<
  ProductPageProps,
  Params
> = async (context) => {
  const { res, params } = context;

  const slug = params?.slug;

  if (!slug) {
    return redirectTo("/");
  }

  const { isAuthorized, shouldUsePreviewApi, doesRequestPreview, hasToWait } =
    getOptionsFromContext(context);

  if (hasToWait) {
    await waitForFewSeconds();
  }

  const contentfulProduct = await fetchProductBySlug(slug, shouldUsePreviewApi);

  if (!contentfulProduct) {
    return notFound();
  }

  const {
    title,
    productImage: { url: imageUrl },
    description,
    product: productSku,
  } = contentfulProduct;

  const saleorProductName = productSku
    ? await getSaleorProductWithContentfulSku(productSku)
    : "";

  res.setHeader("Cache-Control", "public, max-age=300");

  return {
    props: {
      title,
      imageUrl,
      description,
      isPreview: shouldUsePreviewApi,
      ssrDate: new Date().toISOString(),
      showPleaseLoginToPreview: doesRequestPreview && !isAuthorized,
      saleorProductName: saleorProductName,
    },
  };
};

export default ProductPage;
