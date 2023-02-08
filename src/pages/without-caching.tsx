import { Navbar } from "@/components/Navbar";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";

interface WithoutCachingProps {
  test: string;
}

const WithoutCaching: NextPage<WithoutCachingProps> = ({ test }) => {
  return (
    <>
      <Head>
        <title>Vercel Edge caching demo</title>
      </Head>
      <Navbar />
      <header>
        <h1>Without Caching</h1>
      </header>
      <main>{test}</main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  WithoutCachingProps
> = async () => {
  const data = {
    test: "testtes",
  };

  return { props: { ...data } };
};

export default WithoutCaching;
