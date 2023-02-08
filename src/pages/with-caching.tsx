import { Navbar } from "@/components/Navbar";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";

interface WithCachingProps {
  test: string;
}

const WithCaching: NextPage<WithCachingProps> = ({ test }) => {
  return (
    <>
      <Head>
        <title>Vercel Edge caching demo</title>
      </Head>
      <Navbar />
      <header>
        <h1>With Caching</h1>
      </header>
      <main>{test}</main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  WithCachingProps
> = async () => {
  const data = {
    test: "123",
  };

  return { props: { ...data } };
};

export default WithCaching;
