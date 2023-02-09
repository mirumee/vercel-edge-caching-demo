import { Navbar } from "@/components/Navbar";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { fetchPreviewProductById } from "@/lib/contentfulAPI";
import Image from "next/image";

interface WithoutCachingProps {
  title: string;
  imageUrl: string;
  description: string;
}

const WithoutCaching: NextPage<WithoutCachingProps> = ({
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
        <h1>Without Caching</h1>
      </header>
      <hr />
      <main>
        <Image
          src={imageUrl}
          alt="product preview image"
          width={1000}
          height={671}
        />
        <section>
          <h2>{title}</h2>
          <p>{description}</p>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  WithoutCachingProps
> = async () => {
  const productEntryId = "N1PQRT8QuhDZfq3OX3WEa";

  const response = await fetchPreviewProductById(productEntryId);
  const {
    title,
    productImage: { url: imageUrl },
    description,
  } = response;

  return { props: { title, imageUrl, description } };
};

export default WithoutCaching;
