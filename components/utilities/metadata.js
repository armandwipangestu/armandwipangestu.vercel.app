import Head from "next/head";

const Metadata = ({ title, description, image, url }) => {
  return (
    <Head>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Facebook Meta Tags */}
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
      />
      {/* <meta property="og:image:width" content="460"/>
        <meta property="og:image:height" content="230"/>
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={site_name}/>
        <meta property="og:country-name" content={country_name} /> */}

      {/* Twitter or X Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL.replace(
          /^https?:\/\//,
          ""
        )}`}
      />
      <meta
        property="twitter:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}`}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
      />

      {/* <meta name="color-scheme" content="dark" /> */}
    </Head>
  );
};

export default Metadata;
