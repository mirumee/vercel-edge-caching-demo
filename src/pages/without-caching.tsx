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
        <h1>Without Caching (preview)</h1>
      </header>
      <hr />
      <main>
        <figure>
          <Image
            src={imageUrl}
            alt="product preview image"
            height={2048}
            width={1379}
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

export const getServerSideProps: GetServerSideProps<
  WithoutCachingProps
> = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, max-age=0, must-revalidate"
  );

  const productEntryId = "70awRsQGJKLQigPIFrMlmk";

  const response = await fetchPreviewProductById(productEntryId);
  const {
    title,
    productImage: { url: imageUrl },
    description,
  } = response;

  return { props: { title, imageUrl, description } };
};

export default WithoutCaching;
