import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import Title from '../title';
import TextField from '../inputs/TextField';
import { requiredMessage, validateEmail, invalidEmailMessage } from '../inputs/validation';
import NumberTextField from '../inputs/NumberTextField';
import CheckboxGroup from '../inputs/CheckboxGroup';
import SelectTextField, { Option } from '../inputs/SelectTextField';
import Submit from './Submit';

interface MoreInfoFormProps {
  onClose: () => void;
  onSubmit?: () => void;
  apiUrl: string;
}

interface Values {
  budget: number | undefined;
  email: string;
  name: string;
  orgName: string;
  projectTypes: string[];
  onBehalfOf: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4.75),
    },
  },
  form: {
    paddingTop: theme.spacing(7.5),
    paddingBottom: theme.spacing(10),
  },
  usd: {
    fontSize: theme.spacing(4),
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4.875),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2.75),
    },
  },
  textField: {
    marginTop: theme.spacing(8.25),
  },
}));

export default function MoreInfoForm({ onClose, onSubmit, apiUrl }: MoreInfoFormProps): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Title align="center" variant="h4" className={classes.title}>
        Yes, I’m interested in buying credits for myself or my organization!
      </Title>
      {/* <Description align="center">
        Fill out the form below, and someone from our team will get back to you soon.
      </Description> */}
      <Formik
        initialValues={{
          budget: undefined,
          name: '',
          orgName: '',
          email: '',
          projectTypes: [],
          onBehalfOf: [],
        }}
        validate={(values: Values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = requiredMessage;
          } else if (!validateEmail(values.email)) {
            errors.email = invalidEmailMessage;
          }
          if (!values.name) {
            errors.name = requiredMessage;
          }
          return errors;
        }}
        onSubmit={(
          { budget, email, name, orgName, onBehalfOf, projectTypes },
          { setSubmitting, setStatus },
        ) => {
          setSubmitting(true);
          const apiUri: string = apiUrl;
          axios
            .post(`${apiUri}/buyers-info`, {
              budget,
              email,
              name,
              projectTypes,
              onBehalfOf,
            })
            .then(resp => {
              setSubmitting(false);
              if (onSubmit) {
                onSubmit();
              }
            })
            .catch(e => {
              /* eslint-disable no-console */
              console.log(e);
              setSubmitting(false);
            });
        }}
      >
        {({ values, errors, submitForm, isSubmitting, isValid, submitCount, status }) => {
          console.log(values);
          return (
            <div>
              <Form className={classes.form} translate="yes">
                <div>
                  <Field component={TextField} label="Your full name" name="name" />
                  <Field
                    component={TextField}
                    className={classes.textField}
                    type="email"
                    label="Your email address"
                    name="email"
                  />
                </div>
                <div>
                  <Field
                    component={TextField}
                    name="orgName"
                    className={classes.textField}
                    label="Organization name"
                    optional
                  />
                </div>
                <Grid container alignItems="center" className={classes.textField}>
                  <Grid item xs={6}>
                    <Field
                      options={[
                        { value: '<$500', label: '<$500' },
                        { value: '$501 - $1,000', label: '$501 - $1,000' },
                        { value: '$1,001 - $5,000', label: '$1,001 - $5,000' },
                        { value: '$5,001 - $10,000', label: '$5,001 - $10,000' },
                        { value: '$10,001 - $50,000', label: '$10,001 - $50,000' },
                        { value: '$50,001 - $100,000', label: '$50,001 - $100,000' },
                        { value: '$100,001 - $500,000', label: '$100,001 - $500,000' },
                        { value: '$500,001+', label: '$500,001+' },
                      ]}
                      component={SelectTextField}
                      label="Budget"
                      name="budget"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.usd}>USD</Typography>
                  </Grid>
                </Grid>
                <div>
                  <Field
                    component={CheckboxGroup}
                    name="projectTypes"
                    className={classes.textField}
                    label="Which types of carbon credits projects are you interested in?"
                    options={[
                      {
                        label: 'I am interested in all nature based carbon credits.',
                        value: 'I am interested in all nature based carbon credits.',
                      },
                      {
                        label: 'I am only interested in forestry-based credits.',
                        value: 'I am only interested in forestry-based credits.',
                      },
                      {
                        label: 'I am only interested in grasslands-based credits.',
                        value: 'I am only interested in grasslands-based credits.',
                      },
                      {
                        label: 'I am only interested in cropland-based credits.',
                        value: 'I am only interested in cropland-based credits.',
                      },
                      {
                        label: 'I do not have a preference.',
                        value: 'I do not have a preference.',
                      },
                    ]}
                  />
                </div>
                <div>
                  <Field
                    component={CheckboxGroup}
                    name="onBehalfOf"
                    className={classes.textField}
                    label="I am interested in buying carbon credits on behalf of:"
                    options={[
                      {
                        label: 'Consumer/Individual/myself',
                        value: 'Consumer/Individual/myself',
                      },
                      {
                        label: 'Small or Medium Sized Business',
                        value: 'Small or Medium Sized Business',
                      },
                      {
                        label: 'Nonprofit',
                        value: 'Nonprofit',
                      },
                      {
                        label: 'Large Corporation',
                        value: 'Large Corporation',
                      },
                      {
                        label: 'Crypto Organization',
                        value: 'Crypto Organization',
                      },
                    ]}
                  />
                </div>
              </Form>
              <Submit
                isSubmitting={isSubmitting}
                onClose={onClose}
                status={status}
                isValid={isValid}
                submitCount={submitCount}
                submitForm={submitForm}
              />
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
