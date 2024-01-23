import React, { FC } from 'react';
import Head from 'next/head';
import { getImageAbsoluteUrl } from 'utils';
import { useRouter } from 'next/router';

type HeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  script?: any;
};

const HeadSEO: FC<HeadProps> = ({ title, description, keywords, image, script }) => {
  const { asPath, locale } = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key="og_title" />
      <meta name="twitter:title" content={title} key="twitter_title" />
      <meta name="google-adsense-account" content="ca-pub-4500488081622982" />

      {keywords && <meta name="keywords" content={keywords} key="keywords" />}
      {description && (
        <>
          <meta property="og:description" content={description} key="og_description" />
          <meta name="twitter:description" content={description} key="twitter_description" />
          <meta name="description" content={description} key="description" />
        </>
      )}
      {image && (
        <>
          <meta property="og:image" content={getImageAbsoluteUrl(image)} key="og:image" />
          <meta property="og:image:secure_url" content={getImageAbsoluteUrl(image)} key="og:image:secure_url" />
          <meta name="twitter:image" content={getImageAbsoluteUrl(image)} key="twitter:image" />
        </>
      )}
      {script}
    </Head>
  );
};

export default HeadSEO;
