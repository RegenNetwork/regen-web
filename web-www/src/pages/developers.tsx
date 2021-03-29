import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';
import TopSection from '../sections/developers/TopSection';
import InvolvedSection from '../sections/developers/InvolvedSection';
import ApproachSection from '../sections/developers/ApproachSection';
import LedgerSection from '../sections/developers/LedgerSection';
import OpenAgSection from '../sections/developers/OpenAgSection';
import ConnectSection from '../sections/developers/ConnectSection';
import CareersSection from '../sections/developers/CareersSection';

interface props {
  location: Location;
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
      <ApproachSection />
      <InvolvedSection />
      <LedgerSection />
      <OpenAgSection />
      <ConnectSection />
      <CareersSection />
    </>
  );
};

export default DevelopersPage;
