import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field, FormikErrors } from 'formik';
import cx from 'clsx';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { RoleField, FormValues, Option, isIndividual } from 'web-components/lib/components/inputs/RoleField';
import Title from 'web-components/lib/components/title';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import { IndividualFormValues } from 'web-components/lib/components/modal/IndividualModal';
import { OrganizationFormValues } from 'web-components/lib/components/modal/OrganizationModal';

import { validate, getProjectPageBaseData } from '../../lib/rdf';
import {
  useReallyCreateUserMutation,
  useReallyCreateOrganizationMutation,
  useUpdateUserByIdMutation,
  useUpdatePartyByIdMutation,
  useUpdateOrganizationByIdMutation,
  useUpdateAddressByIdMutation,
  useShaclGraphByUriQuery,
} from '../../generated/graphql';

interface RolesFormProps {
  submit: (values: RolesValues) => Promise<void>;
  initialValues?: RolesValues;
}

export interface RolesValues {
  'http://regen.network/landOwner': string;
  'http://regen.network/landSteward': string;
  'http://regen.network/projectDeveloper': string;
  'http://regen.network/projectOriginator': string;
}

export interface RolesValuesErrors {
  'http://regen.network/landOwner': string;
  'http://regen.network/landSteward': string;
  'http://regen.network/projectDeveloper': string;
  'http://regen.network/projectOriginator': string;
}

const useStyles = makeStyles((theme: Theme) => ({
  storyCard: {
    paddingBottom: 0,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
  error: {
    marginTop: 0,
  },
}));

const RolesForm: React.FC<RolesFormProps> = ({ submit, initialValues }) => {
  const [entities, setEntities] = useState<Array<FormValues>>([]);
  const [options, setOptions] = useState<Array<Option>>([]);
  const styles = useStyles();

  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });
  const [createUser] = useReallyCreateUserMutation();
  const [createOrganization] = useReallyCreateOrganizationMutation();
  const [updateUserById] = useUpdateUserByIdMutation();
  const [updatePartyById] = useUpdatePartyByIdMutation();
  const [updateOrganizationById] = useUpdateOrganizationByIdMutation();
  const [updateAddressById] = useUpdateAddressByIdMutation();

  // TODO: getEntities - delete the mocked out logic below. Issue #494

  useEffect(() => {
    const entityOptions = entities.map((e: FormValues) => {
      return {
        ...e,
        label: isIndividual(e) ? e['http://schema.org/name'] : e['http://schema.org/legalName'],
      };
    });
    setOptions(entityOptions);
  }, [entities]);

  const updateUser = async (
    id: string,
    partyId: string,
    email?: string,
    name?: string,
    phoneNumber?: string,
  ): Promise<void> => {
    await updateUserById({
      variables: {
        input: {
          id,
          userPatch: {
            email,
            phoneNumber,
          },
        },
      },
    });
    await updatePartyById({
      variables: {
        input: {
          id: partyId,
          partyPatch: {
            name,
          },
        },
      },
    });
  };

  const validateEntity = async (e: FormValues): Promise<FormikErrors<FormValues>> => {
    const errors: FormikErrors<FormValues> = {};
    if (graphData?.shaclGraphByUri?.graph) {
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        e,
        'http://regen.network/ProjectPageRolesGroup',
      );
      for (const result of report.results) {
        const path: keyof FormValues = result.path.value;
        errors[path] = requiredMessage;
      }
    }
    console.log(errors)
    return errors;
  };

  const saveIndividual = async (updatedEntity: IndividualFormValues): Promise<FormValues> => {
    if (!updatedEntity.id) {
      // Create
      try {
        const userRes = await createUser({
          variables: {
            input: {
              email: updatedEntity['http://schema.org/email'],
              name: updatedEntity['http://schema.org/name'],
              phoneNumber: updatedEntity['http://schema.org/telephone'],
            },
          },
        });
        if (userRes?.data?.reallyCreateUser?.user?.id) {
          updatedEntity.id = userRes?.data?.reallyCreateUser?.user?.id;
          updatedEntity.partyId = userRes?.data?.reallyCreateUser?.user?.partyId;
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/555
        console.log(e);
      }
      const newEntities = [...entities, { ...updatedEntity, id: updatedEntity.id }];
      setEntities(newEntities);
    } else {
      // Update
      try {
        if (updatedEntity.partyId) {
          await updateUser(
            updatedEntity.id,
            updatedEntity.partyId,
            updatedEntity['http://schema.org/email'],
            updatedEntity['http://schema.org/name'],
            updatedEntity['http://schema.org/telephone'],
          );
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/555
        console.log(e);
      }
      const updatedEntities = entities.map((existingEntity: FormValues) =>
        existingEntity.id === updatedEntity.id ? { ...updatedEntity } : existingEntity,
      );
      setEntities(updatedEntities);
    }
    return Promise.resolve(updatedEntity);
  };

  const saveOrganization = async (updatedEntity: OrganizationFormValues): Promise<FormValues> => {
    if (!updatedEntity.id) {
      // Create
      try {
        const ownerRes = await createUser({
          variables: {
            input: {
              email: updatedEntity['http://schema.org/email'],
              name: updatedEntity['http://regen.network/responsiblePerson'],
              phoneNumber: updatedEntity['http://schema.org/telephone'],
            },
          },
        });
        if (ownerRes?.data?.reallyCreateUser?.user?.id) {
          const orgRes = await createOrganization({
            variables: {
              input: {
                ownerId: ownerRes?.data?.reallyCreateUser?.user?.id,
                legalName: updatedEntity['http://schema.org/legalName'],
                orgAddress: updatedEntity['http://schema.org/location'],
                displayName: '', // temp values for now until EntityDisplay values are provided
                image: '',
                walletAddr: '',
              },
            },
          });
          if (orgRes?.data?.reallyCreateOrganization?.organization?.id) {
            updatedEntity.id = orgRes?.data?.reallyCreateOrganization?.organization?.id;
            updatedEntity.addressId =
              orgRes?.data?.reallyCreateOrganization?.organization?.partyByPartyId?.addressId;
            updatedEntity.ownerId = ownerRes?.data?.reallyCreateUser?.user?.id;
            updatedEntity.ownerPartyId = ownerRes?.data?.reallyCreateUser?.user?.partyId;
          }
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/555
        console.log(e);
      }
      const newEntities = [...entities, { ...updatedEntity, id: updatedEntity.id }];
      setEntities(newEntities);
    } else {
      // Update
      try {
        await updateOrganizationById({
          variables: {
            input: {
              id: updatedEntity.id,
              organizationPatch: {
                legalName: updatedEntity['http://schema.org/legalName'],
              },
            },
          },
        });
        await updateAddressById({
          variables: {
            input: {
              id: updatedEntity.addressId,
              addressPatch: {
                feature: updatedEntity['http://schema.org/location'],
              },
            },
          },
        });
        if (updatedEntity.ownerId && updatedEntity.ownerPartyId) {
          await updateUser(
            updatedEntity.id,
            updatedEntity.ownerPartyId,
            updatedEntity['http://schema.org/email'],
            updatedEntity['http://regen.network/responsiblePerson'],
            updatedEntity['http://schema.org/telephone'],
          );
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/555
        console.log(e);
      }
      const updatedEntities = entities.map((existingEntity: FormValues) =>
        existingEntity.id === updatedEntity.id ? { ...updatedEntity } : existingEntity,
      );
      setEntities(updatedEntities);
    }
    return Promise.resolve(updatedEntity);
  };

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'http://regen.network/landOwner': initialValues?.['http://regen.network/landOwner'] || '',
            'http://regen.network/landSteward': initialValues?.['http://regen.network/landSteward'] || '',
            'http://regen.network/projectDeveloper':
              initialValues?.['http://regen.network/projectDeveloper'] || '',
            'http://regen.network/projectOriginator':
              initialValues?.['http://regen.network/projectOriginator'] || '',
          }
        }
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await submit(values);
            setSubmitting(false);
          } catch (e) {
            setSubmitting(false);
          }
        }}
      >
        {({ values, submitForm, isValid, isSubmitting }) => {
          console.log(values);
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Title className={cx(styles.title, styles.field)}>
                  You must add one of the following roles.
                </Title>
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Land Owner"
                  optional
                  description="The individual or organization that owns this land."
                  name="['http://regen.network/landOwner']"
                  options={options}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  validateEntity={validateEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Land Steward"
                  optional
                  description="The individual or organization that is performing the work on the ground. This can be a farmer, rancher, conservationist, forester, fisherman, etc."
                  name="['http://regen.network/landSteward']"
                  options={options}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  validateEntity={validateEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Project Developer"
                  optional
                  description="The individual or organization that is in charge of managing the project and is the main point of contact with Regen Registry. "
                  name="['http://regen.network/projectDeveloper']"
                  options={options}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  validateEntity={validateEntity}
                />
                <Field
                  classes={{ root: styles.field }}
                  component={RoleField}
                  label="Project Originator"
                  optional
                  description="The individual or organization that helps initiate the project."
                  name="['http://regen.network/projectOriginator']"
                  options={options}
                  mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  onSaveOrganization={saveOrganization}
                  onSaveIndividual={saveIndividual}
                  validateEntity={validateEntity}
                />
              </OnBoardingCard>

              <OnboardingFooter
                onSave={submitForm}
                saveText={'Save and Next'}
                onPrev={() => null} // TODO
                onNext={() => null} // TODO
                hideProgress={false} // TODO
                saveDisabled={!isValid || isSubmitting}
                percentComplete={0} // TODO
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { RolesForm };
