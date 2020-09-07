import React from 'react';

import TopSection from '../sections/science/TopSection';
import TitleDescriptionSection from '../sections/science/TitleDescriptionSection';
import OpenScienceSection from '../sections/science/OpenScienceSection';
import SEO from '../components/seo';

const SciencePage = (): JSX.Element => {
  return (
    <>
      <SEO title="Science" />
      <TopSection />
      <TitleDescriptionSection />
      <OpenScienceSection />
    </>
  );
};

export default SciencePage;
