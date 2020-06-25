import React from 'react';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import VideoPopup from '../../components/videoPopup';
import Typography from '@material-ui/core/Typography';
import Title from 'web-components/lib/components/title';

interface Props {
  className?: string;
}

let useStyles = makeStyles((theme: Theme) => ({
  root: {
    'text-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)',
    'text-align': 'center',
    color: theme.palette.primary.main,
    'padding-top': '19vh',
    'padding-bottom': '40vh',
    width: '100%',
    height: '75vh',
    'background-position': 'bottom center',
    'background-repeat': 'repeat-y',
    'background-size': 'cover',
  },
  gradient: {
    background:
      'linear-gradient(217.94deg, rgba(250, 235, 209, 0.5) 22.17%, rgba(125, 201, 191, 0.5) 46.11%, rgba(81, 93, 137, 0.5) 70.05%)',
    opacity: 0.8,
  },
  tag: {
    '& p': {
      'font-size': '1.62rem',
      'line-height': '160%',
      'font-family': 'Lato',
      [theme.breakpoints.up('sm')]: {
        width: '650px',
      },
      [theme.breakpoints.down('xs')]: {
        width: 'unset',
      },
      margin: '0 auto',
    },
    'text-shadow': '0px 4px 10px rgba(0, 0, 0, 0.3)',
    'text-align': 'center',
    margin: '0 auto',
  },
  icon: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    top: '50%',
    left: '54%',
    transform: 'translate(-50%, -50%)',
  },
  '& h1.MuiTypography-h1': {
    color: theme.palette.primary.main,
  },
  title: {
    'font-family': 'Muli',
    'line-height': '130%',
    'margin-bottom': '12px',
    [theme.breakpoints.down('xs')]: {
      'margin-top': '25px',
    },
    [theme.breakpoints.up('sm')]: {
      'margin-top': '37px',
    },
  },
  backgroundGradient: {
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background:
      'linear-gradient(217.94deg, rgba(250, 235, 209, 0.5) 22.17%, rgba(125, 201, 191, 0.5) 46.11%, rgba(81, 93, 137, 0.5) 70.05%);',
    opacity: 0.8,
  },
}));

const HomeFoldSection = ({ className }: Props) => {
  const classes = useStyles({});
  return (
    <StaticQuery
      query={graphql`
        query {
          desktop: file(relativePath: { eq: "image43.jpg" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: contentYaml {
            foldSection {
              tagline
              description
            }
          }
        }
      `}
      render={data => {
        // Set ImageData.
        const imageData = data.desktop.childImageSharp.fluid;
        const content = data.text.foldSection;
        return (
          <BackgroundImage
            Tag="section"
            className={clsx(classes.root, className)}
            fluid={imageData}
            backgroundColor={`#040e18`}
          >
            <div className={classes.backgroundGradient}></div>
            <VideoPopup></VideoPopup>
            <Title align="center" color="primary" variant="h1" className={classes.title}>
              {content.tagline}
            </Title>
            <div className={classes.tag}>
              <Typography variant="body1">{content.description}</Typography>
            </div>
          </BackgroundImage>
        );
      }}
    />
  );
};

export default HomeFoldSection;
