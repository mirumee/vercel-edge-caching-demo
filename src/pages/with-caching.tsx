import { Navbar } from "@/components/Navbar";

import { fetchProductById } from "@/lib/contentfulAPI";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";

interface WithCachingProps {
  title: string;
  description: string;
  imageUrl: string;
}

const WithCaching: NextPage<WithCachingProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <>
      <Head>
        <title>Vercel Edge caching demo</title>
      </Head>
      <Navbar />
      <header>
        <h1>With Caching</h1>
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

const waitForFewSeconds = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  });
};

export const getServerSideProps: GetServerSideProps<WithCachingProps> = async ({
  res,
  query = {},
}) => {
  res.setHeader("Cache-Control", "public, maxage=10");
  const productEntryId = "70awRsQGJKLQigPIFrMlmk";

  const response = await fetchProductById(productEntryId);

  if ("wait" in query) {
    await waitForFewSeconds();
  }

  const {
    title,
    productImage: { url: imageUrl },
    description,
  } = response;

  return { props: { title, imageUrl, description } };
};

export default WithCaching;
