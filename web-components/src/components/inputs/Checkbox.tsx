import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { fieldToCheckbox, CheckboxProps } from 'formik-material-ui';

import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';

const useStyles = makeStyles((theme: Theme) => ({
  check: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));

/** Custom styles on top of MUI's `Checkbox` component */
const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const classes = useStyles();
  return (
    <MuiCheckbox
      {...fieldToCheckbox(props)}
      onChange={props.onChange}
      color="secondary"
      icon={<UncheckedIcon className={classes.check} />}
      checkedIcon={<CheckedIcon className={classes.check} />}
    />
  );
};

export default Checkbox;
