import Head from "next/head";
import React from "react";

export default function About(props) {
  const { ogImageUrl, ogUrl } = props;
  return (
    <>
      <Head>
        <title>About page</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:title" content="Loco Achievements" />
        <meta property="og:description" content="Your achievements with loco" />
        <meta property="og:image" content={ogImageUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${ogUrl}`} />
        <meta property="twitter:title" content="Loco Achievements" />
        <meta
          property="twitter:description"
          content="Your achievements with loco"
        />
        <meta property="twitter:image" content={ogImageUrl} />
      </Head>
      <div>
        <h1>about page</h1>
      </div>
    </>
  );
}

export const getServerSideProps = () => {
  const data = {
    name: "chandra",
    rank: "1",
    game: "BGMI LOCO TESTING",
  };
  return {
    props: {
      ogUrl: "http://loco.gg/about",
      ogImageUrl: `https://express-vercel-og-image.vercel.app/api/get-image?template_data=${btoa(
        JSON.stringify(data)
      )}`,
    },
  };
};
