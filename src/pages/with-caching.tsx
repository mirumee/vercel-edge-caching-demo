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
        <Image src={imageUrl} alt="product image" width={1000} height={671} />
        <section>
          <h2>{title}</h2>
          <p>{description}</p>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  WithCachingProps
> = async () => {
  const productEntryId = "70awRsQGJKLQigPIFrMlmk";

  const response = await fetchProductById(productEntryId);

  const {
    title,
    productImage: { url: imageUrl },
    description,
  } = response;

  return { props: { title, imageUrl, description } };
};

export default WithCaching;
