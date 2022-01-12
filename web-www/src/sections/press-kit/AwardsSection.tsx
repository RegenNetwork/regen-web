import React from 'react';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Img, { FluidObject } from 'gatsby-image';

import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import Title from 'web-components/lib/components/title';
import { PresskitAwardsSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
  slider: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(15),
    },
    '& .slick-slide': {
      [theme.breakpoints.down('xs')]: {
        paddingRight: `${theme.spacing(4.125)} !important`,
      },
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  itemTitle: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4.5),
    },
  },
  image: {
    borderRadius: '5px',
  },
}));

const query = graphql`
  query presskitAwardsSection {
    sanityPresskitPage {
      awardsSection {
        header
        items {
          title
          link
          image {
            ...fluidSanityImageFields_withWebp
          }
        }
      }
    }
  }
`;

const AwardsSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityPresskitPage } = useStaticQuery<PresskitAwardsSectionQuery>(query);
  const data = sanityPresskitPage?.awardsSection;
  const items: JSX.Element[] = (data?.items || []).map(item => (
    <a href={item?.link || ''} target="_blank" rel="noopener noreferrer">
      <Img className={styles.image} fluid={item?.image?.asset?.fluid as FluidObject}></Img>
      <Title className={styles.itemTitle} variant="h5">
        {item?.title}
      </Title>
    </a>
  ));

  return (
    <Section withSlider title={data?.header || ''} classes={{ title: styles.title }}>
      <ResponsiveSlider
        infinite={false}
        className={styles.slider}
        itemWidth="90%"
        slidesToShow={4}
        items={items}
      />
    </Section>
  );
};

export default AwardsSection;
