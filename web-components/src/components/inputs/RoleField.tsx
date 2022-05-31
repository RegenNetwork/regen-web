import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { SxProps, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { FieldProps, FormikErrors } from 'formik';
import cx from 'clsx';

import FieldFormControl from './FieldFormControl';
import { Label } from '../typography';
import OrganizationIcon from '../icons/OrganizationIcon';
import UserIcon from '../icons/UserIcon';
import OutlinedButton from '../buttons/OutlinedButton';
import {
  OrganizationModal,
  OrganizationFormValues,
} from '../modal/OrganizationModal';
import {
  IndividualModal,
  IndividualFormValues,
} from '../modal/IndividualModal';
import { ProfileModal, ProfileFormValues } from '../modal/ProfileModal';

const filter = createFilterOptions<RoleOptionType>();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.typography.pxToRem(40),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.typography.pxToRem(33),
    },
    '&:first-of-type': {
      marginTop: 0,
    },
  },
  add: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    borderRadius: 2,
    '&.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input':
      {
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(4.5),
        },
        [theme.breakpoints.down('sm')]: {
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(3.25),
          paddingTop: theme.spacing(1.625),
          fontSize: theme.spacing(4),
        },
      },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[100],
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[100],
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.grey[100]}`,
    },
  },
  paper: {
    borderRadius: 2,
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  popupIndicator: {
    color: theme.palette.secondary.main,
  },
  edit: {
    alignSelf: 'flex-end',
    border: 'none',
    fontSize: theme.typography.pxToRem(12),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
}));

interface Props extends FieldProps {
  className?: string;
  classes?: {
    root?: string;
  };
  description?: string;
  label?: string;
  optional?: boolean;
  placeholder?: string;
  options?: FormValues[];
  onSaveOrganization: (
    v: OrganizationFormValues,
  ) => Promise<OrganizationFormValues>;
  onSaveIndividual: (v: IndividualFormValues) => Promise<IndividualFormValues>;
  onSaveProfile: (v: ProfileFormValues) => Promise<ProfileFormValues>;
  validateEntity: (values: FormValues) => Promise<FormikErrors<FormValues>>;
  mapboxToken: string;
  profile?: boolean;
}

interface RoleOptionType {
  inputValue?: string;
  id?: number;
}

interface OptionLabel {
  label?: string;
}

interface IndividualOption extends IndividualFormValues, OptionLabel {}
interface OrganizationOption extends OrganizationFormValues, OptionLabel {}

export type FormValues = IndividualFormValues | OrganizationFormValues;
export type Option = IndividualOption | OrganizationOption;

export function isIndividual(e: FormValues): e is IndividualFormValues {
  if (e['@type'] && e['@type'].includes('regen:Individual')) {
    return true;
  }
  return false;
}

function getLabel(o: any): string | undefined {
  return o.id
    ? isIndividual(o)
      ? o['schema:name']
      : o['schema:legalName']
    : undefined;
}

const sxs = {
  formLabel: { color: 'primary.contrastText', ml: 1 } as SxProps,
};

const RoleField: React.FC<Props> = ({
  className,
  classes,
  label,
  options,
  optional,
  placeholder,
  mapboxToken,
  onSaveOrganization,
  onSaveIndividual,
  onSaveProfile,
  validateEntity,
  profile,
  ...fieldProps
}) => {
  const styles = useStyles();
  const [organizationEdit, setOrganizationEdit] =
    useState<OrganizationFormValues | null>();
  const [individualEdit, setIndividualEdit] =
    useState<IndividualFormValues | null>(null);
  const [profileEdit, setProfileEdit] = useState<ProfileFormValues | null>(
    null,
  );
  const [value, setValue] = useState<any | null>({});

  const { form, field } = fieldProps;
  useEffect(() => {
    const selectedValue =
      options && field.value && options.find(o => o.id === field.value.id);
    setValue(selectedValue);
  }, [field.value, options]);

  const saveOrganization = async (
    org: OrganizationFormValues,
  ): Promise<void> => {
    var savedOrg = await onSaveOrganization(org);
    closeOrganizationModal();
    form.setFieldValue(field.name, savedOrg);
    for (const fieldName in form.values) {
      if (
        form.values[fieldName].id === savedOrg.id &&
        `['${fieldName}']` !== field.name
      ) {
        form.setFieldValue(`['${fieldName}']`, savedOrg);
      }
    }
  };

  const saveIndividual = async (user: IndividualFormValues): Promise<void> => {
    var savedUser = await onSaveIndividual(user);
    closeIndividualModal();
    form.setFieldValue(field.name, savedUser);
    for (const fieldName in form.values) {
      if (
        form.values[fieldName].id === savedUser.id &&
        `['${fieldName}']` !== field.name
      ) {
        form.setFieldValue(`['${fieldName}']`, savedUser);
      }
    }
  };

  const saveProfile = async (profile: ProfileFormValues): Promise<void> => {
    var savedProfile = await onSaveProfile(profile);
    closeProfileModal();
    form.setFieldValue(field.name, savedProfile);
    for (const fieldName in form.values) {
      if (
        form.values[fieldName].id === savedProfile.id &&
        `['${fieldName}']` !== field.name
      ) {
        form.setFieldValue(`['${fieldName}']`, savedProfile);
      }
    }
  };

  const closeOrganizationModal = (): void => {
    setOrganizationEdit(null);
  };

  const closeIndividualModal = (): void => {
    setIndividualEdit(null);
  };

  const closeProfileModal = (): void => {
    setProfileEdit(null);
  };

  const editEntity = (entity: FormValues): void => {
    if (isIndividual(entity)) {
      setIndividualEdit(entity);
    } else {
      setOrganizationEdit(entity);
    }
  };

  return (
    <div className={cx(styles.root, classes && classes.root)}>
      <FieldFormControl
        className={className}
        label={label}
        disabled={form.isSubmitting}
        optional={optional}
        {...fieldProps}
      >
        {({ handleChange, handleBlur }) => (
          <Autocomplete
            id="role-combo-box"
            classes={{
              inputRoot: styles.input,
              paper: styles.paper,
              popupIndicator: styles.popupIndicator,
            }}
            disableClearable
            options={[
              ...(options || []),
              (
                <div
                  className={styles.add}
                  onClick={e => {
                    e.stopPropagation();
                    if (profile) {
                      setProfileEdit({
                        '@type': 'regen:Organization',
                        'regen:showOnProjectPage': true,
                      });
                    } else {
                      setOrganizationEdit({
                        '@type': 'regen:Organization',
                      });
                    }
                  }}
                >
                  <OrganizationIcon />
                  <Label size="xs" sx={sxs.formLabel}>
                    + Add New Organization
                  </Label>
                </div>
              ) as unknown as RoleOptionType,
              (
                <div
                  className={styles.add}
                  onClick={e => {
                    e.stopPropagation();
                    if (profile) {
                      setProfileEdit({
                        '@type': 'regen:Individual',
                        'regen:showOnProjectPage': true,
                      });
                    } else {
                      setIndividualEdit({
                        '@type': 'regen:Individual',
                      });
                    }
                  }}
                >
                  <UserIcon />
                  <Label size="xs" sx={sxs.formLabel}>
                    + Add New Individual
                  </Label>
                </div>
              ) as unknown as RoleOptionType,
            ]}
            forcePopupIcon
            value={value}
            getOptionLabel={o => getLabel(o) || ''}
            isOptionEqualToValue={o => o.id === field.value}
            renderOption={(props, option) => {
              const label = getLabel(option);
              return <li {...props}>{label || option}</li>;
            }}
            freeSolo
            onChange={(event, newValue, reason) => {
              if (reason === 'selectOption' && !newValue.inputValue) {
                handleChange(newValue);
              } else if (typeof newValue === 'string') {
                setValue({
                  label: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  label: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            onBlur={handleBlur}
            renderInput={props => (
              <TextField
                {...props}
                placeholder="Start typing or choose entity"
                variant="outlined"
              />
            )}
          />
        )}
      </FieldFormControl>
      {value && value.id && !value.projectCreator && (
        <OutlinedButton
          className={styles.edit}
          onClick={() => editEntity(value)}
        >
          edit entity
        </OutlinedButton>
      )}
      {organizationEdit && (
        <OrganizationModal
          organization={organizationEdit}
          onClose={closeOrganizationModal}
          onSubmit={saveOrganization}
          validate={validateEntity}
          mapboxToken={mapboxToken}
        />
      )}
      {individualEdit && (
        <IndividualModal
          individual={individualEdit}
          onClose={closeIndividualModal}
          onSubmit={saveIndividual}
          validate={validateEntity}
        />
      )}
      {profileEdit && (
        <ProfileModal
          profile={profileEdit}
          onClose={closeProfileModal}
          onSubmit={saveProfile}
          validate={validateEntity}
        />
      )}
    </div>
  );
};

export { RoleField };
