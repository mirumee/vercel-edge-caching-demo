import { Navbar } from "@/components/Navbar";

import { fetchPreviewProductById, fetchProductById } from "@/lib/contentfulAPI";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { MOCK_AUTHORIZATION_COOKIE_NAME } from "@/config";

import { CONTENTFUL_ENTRY_ID } from "@/config";

interface WithCachingProps {
  title: string;
  description: string;
  imageUrl: string;
  isPreview?: boolean;
  ssrDate: string;
}

const WithCaching: NextPage<WithCachingProps> = ({
  title,
  description,
  imageUrl,
  isPreview,
  ssrDate,
}) => {
  const pageHeader = isPreview ? "Preview" : "Published";

  return (
    <>
      <Head>
        <title>Vercel Edge caching demo</title>
      </Head>
      <Navbar />
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
          <p>{description}</p>
        </section>
      </main>
    </>
  );
};

const waitForFewSeconds = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  });

export const getServerSideProps: GetServerSideProps<WithCachingProps> = async ({
  res,
  query,
  req,
}) => {
  const isPreviewApi =
    MOCK_AUTHORIZATION_COOKIE_NAME in req.cookies && "preview" in query;

  const fetchMethod = isPreviewApi ? fetchPreviewProductById : fetchProductById;

  const response = await fetchMethod(CONTENTFUL_ENTRY_ID);

  const {
    title,
    productImage: { url: imageUrl },
    description,
  } = response;

  if ("wait" in query) {
    await waitForFewSeconds();
  }

  res.setHeader("Cache-Control", "public, max-age=300");

  return {
    props: {
      title,
      imageUrl,
      description,
      isPreview: isPreviewApi,
      ssrDate: new Date().toISOString(),
    },
  };
};

export default WithCaching;
