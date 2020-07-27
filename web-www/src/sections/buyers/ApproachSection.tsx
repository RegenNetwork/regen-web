import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import Section from '../../components/Section';

// Component not used anymore
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
}));

const ApproachSection = () => {
  const data = useStaticQuery(graphql`
    query {
      text: buyersYaml {
        approachSection {
          header
          imageItems {
            image {
              extension
              publicURL
            }
            header
            description
          }
        }
      }
    }
  `);
  const content = data.text.approachSection;
  const classes = useStyles({});
  const imageItems: ImageItemProps[] = content.imageItems.map(({ image, header: title, description }) => ({
    img:  <img src={image.publicURL} alt={image.publicURL} />,
    title,
    description,
  }));

  return (
    <Section withSlider className={classes.root} title={content.header}>
      <ImageItems items={imageItems} />
    </Section>
  );
};

export default ApproachSection;
