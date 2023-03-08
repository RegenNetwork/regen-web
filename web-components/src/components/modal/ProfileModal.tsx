import React from 'react';
import { Box, useTheme } from '@mui/material';
import { DefaultTheme as Theme } from '@mui/styles';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { makeStyles } from 'tss-react/mui';

import { Button } from '../buttons/Button';
import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import OrganizationIcon from '../icons/OrganizationIcon';
import ControlledTextField from '../inputs/ControlledTextField';
import { ImageUpload } from '../inputs/ImageUpload';
import { CancelButtonFooter } from '../organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from '../typography';
import Modal from '.';

export type ProfileType = 'regen:Individual' | 'regen:Organization';

interface ProfileModalProps {
  profile: ProfileFormValues;
  onClose: () => void;
  onSubmit: (profile: ProfileFormValues) => void;
  validationSchema: any;
  apiServerUrl: string;
  projectId: string;
}

export interface ProfileFormValues {
  id?: string;
  '@type': ProfileType;
  'schema:name'?: string;
  'schema:image'?: string | null;
  'schema:description'?: string;
  'regen:address'?: string;
  // 'regen:sharePermission'?: boolean;
  'regen:showOnProjectPage': boolean;
}

function ProfileModal({
  profile,
  onClose,
  onSubmit,
  validationSchema,
  apiServerUrl,
  projectId,
}: ProfileModalProps): JSX.Element {
  const theme = useTheme();
  const organization = profile['@type'] === 'regen:Organization';

  return (
    <Modal open={!!profile} onClose={onClose}>
      <div>
        <Title
          variant="h4"
          align="center"
          sx={{ px: [0, 7.5], pt: [8, 0], pb: [6, 7.5] }}
        >
          {`${profile?.id ? 'Edit' : 'Add'} ${
            organization ? 'Organization' : 'Individual'
          }`}
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={{
            ...profile,
            // 'regen:sharePermission':
            // profile && !!profile['regen:sharePermission'],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              onSubmit(values);
              setSubmitting(false);
            } catch (e) {
              setSubmitting(false);
            }
          }}
          validationSchema={validationSchema}
        >
          {({ submitForm }) => {
            return (
              <Form>
                <ProfileOnBoardingCard>
                  <Field
                    component={ControlledTextField}
                    label="Name"
                    name="schema:name"
                  />
                  <Field
                    component={ImageUpload}
                    label="Profile image"
                    name="schema:image"
                    fallbackAvatar={
                      organization && (
                        <OrganizationIcon
                          sx={{
                            height: theme => theme.spacing(11),
                            width: '100%',
                          }}
                          color={theme.palette.info.main}
                        />
                      )
                    }
                    apiServerUrl={apiServerUrl}
                    projectId={projectId}
                    optional
                  />
                  <Field
                    charLimit={160}
                    component={ControlledTextField}
                    label="Description"
                    name="schema:description"
                    rows={4}
                    multiline
                    optional
                  />
                  <Field
                    component={ControlledTextField}
                    name="regen:address"
                    label="REGEN wallet address"
                    description="Make sure this is a valid wallet address. Can be added at a later date."
                    optional
                  />
                </ProfileOnBoardingCard>
                <ProfileSubmitFooter
                  submitForm={submitForm}
                  onClose={onClose}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}

const useStyles = makeStyles()((theme: Theme) => ({
  card: {
    marginTop: 0,
  },
}));

const ProfileOnBoardingCard = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { classes: styles } = useStyles();

  return <OnBoardingCard className={styles.card}>{children}</OnBoardingCard>;
};

const ProfileSubmitFooter = ({
  submitForm,
  onClose,
}: {
  submitForm: (() => Promise<void>) & (() => Promise<any>);
  onClose: () => void;
}): JSX.Element => {
  const { isValid, isSubmitting, touched } = useFormikContext();
  return (
    <CancelButtonFooter
      onCancel={onClose}
      label="save"
      onClick={submitForm}
      sx={{ px: [10.75] }}
      disabled={!isValid || isSubmitting || !Object.keys(touched).length}
    />
  );
};

export { ProfileModal, ProfileOnBoardingCard, ProfileSubmitFooter };
