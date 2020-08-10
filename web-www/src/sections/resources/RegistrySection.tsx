import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import Grid from '@material-ui/core/Grid';
import { useTheme, Theme, makeStyles } from '@material-ui/core';
import Title from 'web-components/lib/components/title';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
    },
  },
  section: {
    [theme.breakpoints.down('xs')]: {
      padding: `
       ${theme.spacing(17.75)}
       ${theme.spacing(6.5)}
       ${theme.spacing(28.25)}
       ${theme.spacing(6)}
     `,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `
       ${theme.spacing(21.5)}
       ${theme.spacing(10)}
       ${theme.spacing(10)}
       ${theme.spacing(19.75)}
     `,
    },
    [theme.breakpoints.up('md')]: {
      padding: `
       ${theme.spacing(21.5)}
       ${theme.spacing(33.75)}
       ${theme.spacing(21.75)}
       ${theme.spacing(33.75)}
     `,
    },
  },
}));

const RegistrySection = (): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "image-grid-bg.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: resourcesYaml {
            registrySection {
              header
              resourceCards {
                image {
                  childImageSharp {
                    fixed(quality: 90, width: 500) {
                      ...GatsbyImageSharpFixed_withWebp
                    }
                  }
                }
                title
                updated
                description
                buttonText
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.registrySection;
        return (
          <>
            <BackgroundSection
              className={classes.section}
              linearGradient="unset"
              imageData={data.background.childImageSharp.fluid}
            >
              <Title className={classes.title} variant="h3" align="left">
                {content.header}
              </Title>
              <ResourceCardsSlider items={content.resourceCards} />
            </BackgroundSection>
          </>
        );
      }}
    />
  );
};

export default RegistrySection;
