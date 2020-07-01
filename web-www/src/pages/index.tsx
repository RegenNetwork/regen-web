import React from 'react';

import SEO from '../components/seo';
import HomeFoldSection from '../sections/home-fold-section';
import MarketplaceSection from '../sections/home-marketplace-section';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';
import HomeValuesSection from '../sections/home-values-section';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <SEO title="Home" mailerlite />
      <HomeFoldSection />
      <MarketplaceSection />
      <EmailSubmitSection />
      <HomeValuesSection />
    </>
  );
};

export default IndexPage;
