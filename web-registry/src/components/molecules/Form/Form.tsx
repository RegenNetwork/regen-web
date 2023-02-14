import { ComponentProps } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Box } from '@mui/material';

import { IS_DEV } from 'lib/env';

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: Props<T>): JSX.Element => (
  <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      {/* <fieldset> passes the form's 'disabled' state to all of its elements,
          allowing us to handle disabled style variants with just css */}
      <Box
        component="fieldset"
        disabled={form.formState.isSubmitting}
        sx={{ borderWidth: 0, padding: 0, margin: 0 }}
      >
        {children}
      </Box>
    </form>
    {IS_DEV && <DevTool control={form.control} />}
  </FormProvider>
);

export default Form;