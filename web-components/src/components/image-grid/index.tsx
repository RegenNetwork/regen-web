import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Title from '../title';
import Description from '../description';
import { getFontSize } from '../../theme/sizing';

export interface ImageGridProps {
  img: JSX.Element; // using pure img tag or gatsby-image
  title: string;
  description: string;
  even: boolean;
}

export interface StyleProps {
  even: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    [theme.breakpoints.up('sm')]: {
      flexDirection: props.even ? 'row-reverse' : 'row',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  }),
  text: props => ({
    [theme.breakpoints.up('sm')]: {
      paddingLeft: props.even ? theme.spacing(37.5) : theme.spacing(10),
      paddingRight: props.even ? theme.spacing(10) : theme.spacing(37.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(3.75),
      paddingLeft: theme.spacing(3.75),
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(18.25),
    },
  }),
  title: {
    [theme.breakpoints.up('sm')]: {
      lineHeight: '130%',
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      lineHeight: '145%',
      marginBottom: theme.spacing(3.5),
    },
  },
  image: {
    height: '100%',
    width: '100%',
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
  },
}));

export default function ImageGrid({ img, title, description, even }: ImageGridProps): JSX.Element {
  const classes = useStyles({ even });

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={12} sm={6} className={classes.image}>
        {img}
      </Grid>
      <Grid item xs={12} sm={6} className={classes.text}>
        <Title variant="h2" className={classes.title}>
          {title}
        </Title>
        <Description className={classes.description} fontSize={getFontSize('xl')}>
          {description}
        </Description>
      </Grid>
    </Grid>
  );
}
