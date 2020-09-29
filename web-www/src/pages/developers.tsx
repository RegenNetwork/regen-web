import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/developers/TopSection';
import LedgerSection from '../sections/developers/LedgerSection';
import TestnetSection from '../sections/developers/TestnetSection';
import ConnectSection from '../sections/developers/ConnectSection';
import BlogSection from '../sections/shared/BlogSection';

interface props {
  location: object;
}

const DevelopersPage = ({ location }: props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "developers-top-image.jpg" }) {
        publicURL
      }
    }
  `);
  return (
    <>
      <SEO
        description="The Regen Ledger blockchain enables our community to develop a suite of platforms and applications in service of regenerating human relationships with land - join us."
        title="For Developers"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
      <TopSection />
      <LedgerSection />
      <TestnetSection />
      <ConnectSection />
      <BlogSection />
    </>
  );
};

export default DevelopersPage;
