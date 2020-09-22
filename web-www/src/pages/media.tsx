import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useStaticQuery, graphql } from 'gatsby';
import { Formik, Form, Field } from 'formik';

import SEO from '../components/seo';
import ArticleCard from 'web-components/lib/components/cards/ArticleCard';
import Section from 'web-components/lib/components/section';
import SelectTextField, { Option } from 'web-components/lib/components/inputs/SelectTextField';

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.grey[50],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
      paddingBottom: theme.spacing(40.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(22.5),
    },
  },
  card: {
    height: '100%',
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(13.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7.25),
    },
  },
}));

interface Item {
  title: string;
  date: string;
  author: string;
  url: string;
  image: {
    publicURL: string;
  };
}
interface Category {
  name: string;
  items: Item[];
}

const MediaPage = (): JSX.Element => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query {
      text: mediaYaml {
        header
        categories {
          name
          items {
            title
            date
            author
            url
            image {
              publicURL
            }
          }
        }
      }
    }
  `);
  const content = data.text;
  const categories: Option[] = content.categories.map((c: Category) => ({
    value: c.name,
    label: c.name.charAt(0).toUpperCase() + c.name.slice(1),
  }));
  categories.unshift({
    value: 'all',
    label: 'All',
  });

  return (
    <>
      <SEO title="Media" />
      <div className={classes.background}>
        <Section title={content.header} className={classes.section} titleClassName={classes.title}>
          <Formik
            initialValues={{
              category: 'all',
            }}
            onSubmit={() => {}}
          >
            {({ values }) => {
              return (
                <>
                  <Form>
                    <Field options={categories} component={SelectTextField} name="category" />
                  </Form>
                  <Grid container spacing={6}>
                    {values.category !== 'all'
                      ? content.categories
                          .find((c: Category) => c.name === values.category)
                          .items.map((item: Item, index: number) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <ArticleCard
                                className={classes.card}
                                name={item.title}
                                author={item.author}
                                date={item.date}
                                url={item.url}
                                imgSrc={item.image.publicURL}
                              />
                            </Grid>
                          ))
                      : content.categories
                          .map((c: Category) => c.items)
                          .flat()
                          .sort((a: Item, b: Item) => new Date(b.date) - new Date(a.date))
                          .map((item: Item, index: number) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <ArticleCard
                                className={classes.card}
                                name={item.title}
                                author={item.author}
                                date={item.date}
                                url={item.url}
                                imgSrc={item.image.publicURL}
                              />
                            </Grid>
                          ))}
                  </Grid>
                </>
              );
            }}
          </Formik>
        </Section>
      </div>
    </>
  );
};

export default MediaPage;
