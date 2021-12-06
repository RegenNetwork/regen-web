import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { graphql, StaticQuery } from 'gatsby';
import { GatsbyImage, GatsbyImageData } from 'gatsby-plugin-image';
import ReactHtmlParser from 'react-html-parser';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import { TitleWithParagraphs } from './ApproachSection';

interface FundingSectionProps {
  details: string;
  results: string;
  next: string;
  image: {
    childImageSharp: {
      gatsbyImageData: GatsbyImageData;
    };
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  image: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
}));

const FundingSection = ({ details, results, next, image }: FundingSectionProps): JSX.Element => {
  const classes = useStyles();
  return (
    <StaticQuery
      query={graphql`
        query {
          text: caseStudiesYaml {
            caseStudies {
              fundingSection {
                header
                details
                results
                next
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.caseStudies.fundingSection;
        return (
          <Section className={classes.root}>
            <Box display={{ xs: 'block', sm: 'none' }}>
              <GatsbyImage image={image.childImageSharp.gatsbyImageData} className={classes.image} />
            </Box>
            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <TitleWithParagraphs
                  title={<div className={classes.title}>{ReactHtmlParser(content.header)}</div>}
                  paragraphs={[
                    { title: content.details, content: details },
                    { title: content.results, content: results },
                    { title: content.next, content: next },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <GatsbyImage image={image.childImageSharp.gatsbyImageData} className={classes.image} />
                </Box>
              </Grid>
            </Grid>
          </Section>
        );
      }}
    />
  );
};

export default FundingSection;
