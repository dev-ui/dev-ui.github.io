import React from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';

const Layout = ({ children, title, description }) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="google-site-verification" content="v0aZtX2giCKzEoprC_WZiO4tA6S7BpW39iTbtUwx-1Q" />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-1885187353205632",
          enable_page_level_ads: true
        });
        `}
      </script>
    </Helmet>
    {children}
  </div>
);

export default Layout;
